import React, { useEffect, useMemo, useState } from 'react';
import { useApi } from '../../hooks/api';
import { API_ROUTES } from '../../routes';
import { JSONTree } from 'react-json-tree';
import { Button, Col, Drawer, Flex, Form, Row, Table } from 'antd';
import { FileMarkdownFilled } from '@ant-design/icons';
import MyMap from '../../components/map';
import { makeFresh } from '../../utils/function';
import axios from 'axios';
import { useAdminLayout } from './layout.office';
import { useForm } from 'antd/es/form/Form';
import MyInput from '../../components/input';


function Target(props) {
    const { loading, error, data, setData } = useApi(API_ROUTES.LINK);
    const { loading: l, error: e, data: schema } = useApi(`${API_ROUTES.LINK}/schema`);
    const sourse = data;
    const columns = useMemo(() => {
        return data ? Object.entries(data[0]).map(([key, val]) => {
            return { dataIndex: key, title: key };
        }) : []
    }, [data])
    const [selected, setSelected] = useState(null)
    const [medthod, setMethod] = useState(null)
    useEffect(() => {
        if (selected) { setMethod(selected?.id ? "PUT" : "POST") }
    }, [selected])

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
            url: API_ROUTES.LINK,
            method: medthod,
            data: { ...values, id: selected.id },
            headers: {
                "Content-type": "application/x-www-form-urlencoded", // Set content type to JSON
            },
            withCredentials: true
        };

        axios(option)
            .then(function (response) {
                setSelected(null)
                setData(makeFresh({ old: data, fresh: response?.data }))
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

    return (
        <>
            <Drawer
                open={!!selected}
                onClose={() => setSelected(null)}
                extra={<Button type="primary" htmlType="submit" loading={submitLoading} onClick={form.submit}>
                    {selected?.id ? "Update" : "Create"}</Button>}
            >
                {medthod && <Form
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
                        schema?.[medthod]?.[0].map((f) => (
                            <Form.Item
                                key={f}
                                label={f}
                                name={f}
                                hidden={f == 'id'}
                                rules={[{ required: true, message: `Please input ${f}` }]}
                            >
                                <MyInput disabled={f == 'id'} field={f} />
                            </Form.Item>
                        ))
                    }
                    {
                        schema?.[medthod]?.[1].map((f) => (
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
                </Form>}
            </Drawer>
            <Table
                title={()=><Flex><Button onClick={()=>setSelected({})}>Add New</Button></Flex>}
                loading={loading}
                rowClassName={(record) => {
                    if (record.id == selected?.id) { return "bg-blue-500/20" }
                }}
                columns={columns}
                dataSource={sourse || []}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => setSelected({ ...record, zoom: 13 })
                        //   onDoubleClick: (event) => {}, // double click row
                        //   onContextMenu: (event) => {}, // right button click row
                        //   onMouseEnter: (event) => {}, // mouse enter row
                        //   onMouseLeave: (event) => {}, // mouse leave row
                    };
                }}
            />
        </>
    );
}

export default Target;