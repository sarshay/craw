"use client";
import { createExperience, getExperience, updateExperience } from "@/service";
import { Experience } from "@interface";
import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
} from "antd";
import React, { useEffect, useState } from "react";
import MasterTable from "../../_components/MasterTable";
import { makeFresh } from "@hheinsoee/utility";
import ImageUpload from "../../_components/ImageUpload";
import {
  MarkDownEditor,
  MarkDownView,
  MyDatePicker,
  TagsPicker,
  CategoryPicker,
} from "../../_components/Inputs";
import { JsonView } from "react-json-view-lite";
import dayjs from "dayjs";
import conf from "@config";
import { JSONTree } from "react-json-tree";
import { Prisma } from "@prisma/client";

function Page() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [experience, setExperience] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const [loadingRow, setLoadingRow] = useState<Experience | null>(null);
  const [total, setTotal] = useState(0);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (selected) {
      // setOpen(true);
      form.setFieldsValue({
        ...selected,
        categoryIds: selected.category?.map((t) => t.CategoryId),
        tagIds: selected.tags?.map((t) => t.TagId),
      });
      console.log(selected);
    }
  }, [selected]);

  const handleDelete = async (rec: Experience) => {
    setLoadingRow(rec);
    await updateExperience({
      where: {
        id: rec.id,
      },
      data: {
        isDeleted: true,
      },
    })
      .then((res) => {
        setExperience((pre) => pre.filter((old) => old.id !== rec.id));
      })
      .catch((err) => {
        message.error("not Deleted");
      })
      .finally(() => {
        setLoadingRow(null);
      });
  };
  const fetchData = async (params?: any | null) => {
    setLoading(true);
    await getExperience(params)
      .then(({ data, pagination }) => {
        setTotal(pagination.total);
        setExperience(data);
      })
      .catch((err) => {
        message.error("not loaded");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinish = async (values: any) => {
    // console.log(values);
    // return;
    setLoadingSubmit(true);
    setLoadingRow(selected);
    if (selected?.id) {
      const data: Prisma.ExperienceUpdateInput = {
        position: values.position,
        organization: values.organization,
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,

        tags: {
          deleteMany: {
            ExperienceId: selected.id,
          },
          ...(values.tagIds?.length > 0 && {
            createMany: {
              data: values.tagIds?.map((ids: number) => {
                return { TagId: ids };
              }),
            },
          }),
        },

        category: {
          deleteMany: {
            ExperienceId: selected.id,
          },

          ...(values.categoryIds?.length > 0 && {
            createMany: {
              data: values.categoryIds?.map((ids: number) => {
                return { CategoryId: ids };
              }),
            },
          }),
        },
      };
      await updateExperience({
        where: {
          id: selected?.id,
        },
        data,
      })
        .then(({ data }) => {
          message.success("updated");
          setSelected(null);
          setExperience((old) => makeFresh({ old, fresh: data }));
          form.resetFields();
        })
        .catch((err) => {
          message.error("not Updated");
        })
        .finally(() => {
          setLoadingSubmit(false);
          setLoadingRow(null);
        });
    } else {
      const data: Prisma.ExperienceCreateInput = {
        position: values.position,
        organization: values.organization,
        startDate: values.startDate,
        endDate: values.endDate,
        description: values.description,

        ...(values.tagIds?.length > 0 && {
          tags: {
            createMany: {
              data: values.tagIds?.map((ids: number) => {
                return { TagId: ids };
              }),
            },
          },
        }),

        ...(values.categoryIds?.length > 0 && {
          category: {
            createMany: {
              data: values.categoryIds?.map((ids: number) => {
                return { CategoryId: ids };
              }),
            },
          },
        }),
      };
      await createExperience(data)
        .then(({ data }) => {
          // console.log(fresh);
          message.success("created");
          setOpen(false);
          setExperience((old) => makeFresh({ old, fresh: data }));
          form.resetFields();
        })
        .catch((error) => message.error("not created"))
        .finally(() => {
          setLoadingSubmit(false);
        });
    }
  };
  const [lockSubmit, setLockSubmit] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-8 px-8">
      <div className="">
        <MasterTable
          title="experience"
          dataSource={experience}
          onEdit={setSelected}
          onDelete={handleDelete}
          newLoad={fetchData}
          loading={loading}
          totalCount={total}
          scroll={{ y: "calc(100vh - 200px )" }}
          columns={[
            {
              title: "Start",
              dataIndex: "startDate",
              key: "startDate",
              sorter: true,
              render: (text) => dayjs(text).format(conf.dateTimeFormat),
            },
            {
              title: "End",
              dataIndex: "endDate",
              key: "endDate",
              sorter: true,
              render: (text) =>
                text ? dayjs(text).format(conf.dateTimeFormat) : "current",
            },

            {
              title: "Position",
              dataIndex: "position",
              key: "position",
              sorter: true,
            },
            {
              title: "Organization",
              dataIndex: "organization",
              key: "organization",
              ellipsis: true,
            },
          ]}
        />
      </div>
      <div className="h-screen overflow-y-auto hideScroll">
        {/* <Drawer
        placement="bottom"
        height={"100vh"}
        open={!!selected}
        onClose={() => setSelected(null)}
        extra={
          <Button onClick={form.submit} type="primary">
            {selected?.id ? "Update" : "Create"}
          </Button>
        }
      > */}
        {/* <JSONTree data={selected} /> */}
        <Form
          name="experience"
          key={selected?.id}
          layout="vertical"
          // labelCol={{ span: 8 }}
          // wrapperCol={{ span: 16 }}
          initialValues={{ remember: false }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Space.Compact className="sticky top-8 float-end z-10">
            <Button onClick={() => setSelected(null)}>clear</Button>
            <Button
              onClick={form.submit}
              type="primary"
              loading={loadingSubmit}
              disabled={lockSubmit}
            >
              {selected?.id ? "Update" : "Create"}
            </Button>
          </Space.Compact>

          <Form.Item
            label="position"
            name={"position"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tags" name={"tagIds"}>
            <TagsPicker />
          </Form.Item>

          <Form.Item label="Category" name={"categoryIds"}>
            <CategoryPicker />
          </Form.Item>
          <Form.Item
            label="Start"
            name={"startDate"}
            rules={[{ required: true }]}
          >
            <MyDatePicker />
          </Form.Item>
          <Form.Item label="End" name={"endDate"}>
            <MyDatePicker />
          </Form.Item>

          <Form.Item label="Organization" name={"organization"}>
            <Input />
          </Form.Item>
          <Form.Item
            label="description"
            name={"description"}
            rules={[{ required: true }]}
          >
            <MarkDownEditor />
          </Form.Item>
        </Form>
        {/* </Drawer> */}
      </div>
    </div>
  );
}

export default Page;
