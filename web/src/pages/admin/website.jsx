import { Button, Drawer, Flex, Form, Input, Space, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/api';
import { API_ROUTES } from '../../routes';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useMyList } from '../../providers/context';
import { makeFresh } from '../../utils/function';
import MyInput from '../../components/input';
import Search from 'antd/es/input/Search';
import wpScan from '../../utils/wpScan';
import { useAdminLayout } from './layout.office';

function WebsitePage(props) {
    const { website: websites, setWebsite: setData } = useMyList()
    const [selected, setSelected] = useState(null);
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Icon',
            dataIndex: 'site_icon_url',
            key: 'site_icon_url',
            render: (value) => <img src={value} height={48} style={{ margin: "-16px 0px -18px 0px" }} />
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
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            render: (text) => <Tag color={text == 'active' ? "green" : "#ff0000"} >{text || '.'}</Tag>
        }
    ]

    return (
        <div>
            <WPForm selected={selected} setSelected={setSelected} websites={websites} setData={setData} />
            {props.label}
            <Table
                title={() => <Space>
                    <Button type="primary" onClick={() => setSelected({ status: 'active' })}>
                        New</Button>
                </Space>}
                columns={columns}
                rowClassName={(record, index) => record.status == 'active' ? '' : 'bg-warn'}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => setSelected(websites?.[rowIndex]), // click row
                        // onDoubleClick: (event) => { }, // double click row
                        // onContextMenu: (event) => { }, // right button click row
                        // onMouseEnter: (event) => { }, // mouse enter row
                        // onMouseLeave: (event) => { }, // mouse leave row
                    };
                }}
                // loading={loading}
                dataSource={websites} />
        </div >
    );
}

export default WebsitePage;

export const WPForm = ({ selected, setSelected = () => { }, websites = [], setData = () => { } }) => {
    const fields = [['url', 'name', 'description'], ['site_icon_url', 'color_hue', 'keywords', 'status', 'categoryIds']]
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
            url: API_ROUTES.WEBSITE,
            method: selected.id ? "PUT" : "POST",
            data: { ...values, id: selected.id },
            headers: {
                "Content-type": "application/x-www-form-urlencoded", // Set content type to JSON
            },
            withCredentials: true
        };

        axios(option)
            .then(function (response) {
                setData(makeFresh({ old: websites, fresh: response?.data }))
                setSelected(null)
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

    const [wpUrl, setWpUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const wp = wpScan({ wpUrl });

    useEffect(() => {
        if (wpUrl) {
            setLoading(true)
            wp.getInfo().then((data) => {
                messageAPi.success("auto loaded")
                form.setFieldsValue(data)
            }).catch((error) => {
                messageAPi.error(error.message)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [wpUrl])
    return (<Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        extra={<Flex gap={6}><Button danger >Delete</Button>, <Button type="primary" htmlType="submit" loading={submitLoading} onClick={form.submit}>
            {selected?.id ? "Update" : "Create"}</Button></Flex>}
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
                    f == 'url' ?
                        <Form.Item
                            key={f}
                            label={f}
                            name={f}
                            rules={[{ required: true, message: `Please input ${f}` }]}
                        >
                            <Search placeholder={f}
                                loading={loading}
                                onBlur={e => setWpUrl(e.target.value)}
                                onSearch={e => setWpUrl(e)}
                            />
                        </Form.Item> :
                        <Form.Item
                            key={f}
                            label={f}
                            name={f}
                            rules={[{ required: true, message: `Please input ${f}` }]}
                        >
                            <Input placeholder={f} />
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
                        <MyInput placeholder={f} field={f} />
                    </Form.Item>
                ))
            }
        </Form>
    </Drawer>)
}