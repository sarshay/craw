import { Button, Drawer, Form, Input, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/api';
import { API_ROUTES } from '../../routes';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useMyList } from '../../providers/context';
import { makeFresh } from '../../utils/function';
import MyInput from '../../components/input';
import { useAdminLayout } from './layout.office';

function CategoryPage(props) {

    const { category, setCategory: setData } = useMyList()
    const [selected, setSelected] = useState(null);
    const [submitLoading, setSubmitLoading] = useState(false);

    const { messageAPi } = useAdminLayout();

    const [form] = useForm();
    // console.log(form)
    useEffect(() => {
        form.resetFields()
        form.setFieldsValue(selected)
    }, [selected])
    const handleSubmit = (values) => {
        setSubmitLoading(true);
        var option = {
            url: API_ROUTES.CATEGORY,
            method: selected.id ? "PUT" : "POST",
            data: { ...values, id: selected.id },
            headers: {
                "Content-type": "application/x-www-form-urlencoded", // Set content type to JSON
            },
            withCredentials: true
        };

        axios(option)
            .then(function (response) {
                setSelected(null)
                setData(makeFresh({ old: category, fresh: response?.data }))
            })
            .catch((err) => {
                err.response
                    ? messageAPi.error(err.response.data.message)
                    : messageAPi.error(err.message);
            })
            .finally(() => {
                setSubmitLoading(false);
            });
    };

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        }
    ]
    const fields = [['name'], ['description']]
    return (
        <div>
            <Drawer
                open={!!selected}
                onClose={() => setSelected(null)}
                extra={<Button type="primary" htmlType="submit" loading={submitLoading} onClick={form.submit}>
                    {selected?.id ? "Update" : "Create"}</Button>}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={(v) => handleSubmit(v)}
                    onFinishFailed={(v) => console.error(v)}
                    autoComplete="off"
                >
                    {
                        fields[0].map((f) => (
                            <Form.Item
                                key={f}
                                label={f}
                                name={f}
                                rules={[{ required: true, message: `Please input ${f}` }]}
                            >
                                <MyInput field={f} />
                            </Form.Item>
                        ))
                    }
                    {
                        fields[1].map((f) => (
                            <Form.Item
                                key={f}
                                label={f}
                                name={f}
                                rules={[{ required: false }]}
                            >
                                <MyInput field={f} />
                            </Form.Item>
                        ))
                    }
                </Form>
            </Drawer>
            {props.label}
            <Table
                title={() => <Space>
                    <Button type="primary" loading={submitLoading} onClick={() => setSelected({})}>
                        New</Button>
                </Space>}
                columns={columns}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => setSelected(category?.[rowIndex]), // click row
                        // onDoubleClick: (event) => { }, // double click row
                        // onContextMenu: (event) => { }, // right button click row
                        // onMouseEnter: (event) => { }, // mouse enter row
                        // onMouseLeave: (event) => { }, // mouse leave row
                    };
                }}
                // loading={loading}
                dataSource={category} />
        </div >
    );
}

export default CategoryPage;