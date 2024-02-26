import { Button, Col, Drawer, Flex, Form, Input, List, Row, Space, Spin, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { useApi } from '../../hooks/api';
import { API_ROUTES } from '../../routes';
import { useForm } from 'antd/es/form/Form';
import axios from 'axios';
import { useMyList } from '../../providers/context';
import { makeFresh, sortThis } from '../../utils/function';
import MyInput from '../../components/input';
import Search from 'antd/es/input/Search';
import wpScan from '../../utils/wpScan';
import { useAdminLayout } from './layout.office';
import { ago } from '../../utils/time';
import { TheHtml } from '../../utils/html';
import { findImage } from '../../components/post';

function WebsitePage(props) {
    const { website: websites, setWebsite: setData, category } = useMyList()
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
            render: (value) => <img src={value} className="h-16" style={{ margin: "-16px 0px -18px 0px" }} />
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => sortThis(a, b, 'name'),
            render: (value, rec) => <div>{value}<br /><small>{rec.url}</small></div>
        },
        {
            title: 'Category',
            dataIndex: 'category_ids',
            key: 'category_ids',
            filters: [...category.map(c => { return { text: c.name, value: c.id } }), { text: 'blank', value: null }],
            onFilter: (value, record) => value ? record.category_ids?.split(',').includes(value) : !record.category_ids,
            render: (value, rec) => <div>{category.filter(x => value?.split(',').includes(x.id)).map(c => <Tag bordered={false} color="processing">{c.name}</Tag>)}</div>
        },
        {
            title: 'status',
            dataIndex: 'status',
            key: 'status',
            sorter: (a, b) => a.status.length - b.status.length,
            render: (text) => <Tag color={text == 'active' ? "green" : "red"} >{text || '.'}</Tag>
        },
        {
            title: 'is 18+',
            dataIndex: 'is18Plus',
            key: 'is18Plus',
            filters: [
                {
                    text: 'Yes',
                    value: 'yes',
                },
                {
                    text: 'No',
                    value: 'no',
                },
            ],
            sorter: (a, b) => a.is18Plus.length - b.is18Plus.length,
            onFilter: (value, record) => record.is18Plus.indexOf(value) === 0,
            render: (text) => text == 'yes' && <Tag color={"red"} >18+</Tag>
        },
        {
            title: 'error',
            dataIndex: 'error_code',
            key: 'error_code',
            sorter: (a, b) => a.error_code?.length - b.error_code?.length,
            onFilter: (value, record) => record.error_code.indexOf(value) === 0,
            render: (text, rec) => text && <div className='text-red-500 text-sm'>
                {text}
                <div>{rec.scan_by} - {ago(rec.last_scan_time)} ago</div>
            </div>
        }
    ]

    return (
        <div>
            <WPForm key={selected?.id} selected={selected} setSelected={setSelected} websites={websites} setData={setData} />
            {props.label}
            <Table
                rowKey={(record) => record.id}
                title={() => <Space>
                    <Button type="primary" onClick={() => setSelected({ status: 'active' })}>
                        New</Button>
                </Space>}
                columns={columns}
                rowClassName={(record, index) => record.status == 'active' ? '' : 'bg-warn'}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: () => setSelected(record), // click row
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
    const fields = [['url', 'name'], ['description', 'category_ids', 'site_icon_url', 'color_hue', 'keywords', 'status', 'is18Plus', 'api_base_path', 'error_code']]
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
    const [formData, setFormData] = useState(null)
    const [loading, setLoading] = useState(false)
    const wp = wpScan({ wpUrl, api_base_path: formData?.api_base_path });
    useEffect(() => {
        if (wpUrl) {
            setLoading(true)
            wp.getInfo().then((data) => {
                messageAPi.success("auto loaded")
                delete data.url
                form.setFieldsValue(data)
                console.log({ formdataLoaded: data })
            }).catch((error) => {
                messageAPi.error(error.message)
            }).finally(() => {
                setLoading(false)
            })
        }
    }, [wpUrl])

    const [loadingCat, setLoadingCat] = useState(false)
    const [category, setCategory] = useState([])
    const scanCategory = () => {
        setLoadingCat(true)
        wp.getCategory().then((data) => {
            setCategory(data)
            messageAPi.success("loaded category")
        }).catch((error) => {
            messageAPi.error(error.message)
        }).finally(() => {
            setLoadingCat(false)
        })
    }

    const [loadingPost, setLoadingPost] = useState(false)
    const [post, setPost] = useState([])
    const scanPost = () => {
        setLoadingPost(true)
        wp.getPost().then((data) => {
            setPost(data);
            messageAPi.success("loaded Post")
        }).catch((error) => {
            messageAPi.error(error.message)
        }).finally(() => {
            setLoadingPost(false)
        })
    }

    return (<Drawer
        width={800}
        open={!!selected}
        onClose={() => setSelected(null)}
        extra={<Flex gap={6}><Button danger >Delete</Button>, <Button type="primary" htmlType="submit" loading={submitLoading} onClick={form.submit}>
            {selected?.id ? "Update" : "Create"}</Button></Flex>}
    >
        <Row gutter={24}>
            <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={(v) => handleSubmit(v)}
                onValuesChange={(a, b) => setFormData(b)}
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
                                <MyInput placeholder={f} field={f} />
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

            <Col span={12}>
                {loadingCat && <Spin />}
                {category.length > 0 ? <Space wrap>{category.map(c => <Tag bordered={false} color='blue'>{c.name}[${c.count}]</Tag>)}</Space> : <div onClick={scanCategory}>Load Category</div>}


                {loadingPost && <Spin />}
                {post.length > 0 ? <div>
                    {post.map(p => <Flex gap={8} className='my-1'><img src={findImage(p, wpUrl)} className='h-12 w-16 object-cover' /><small>{ago(p.date)} {TheHtml(p.title?.rendered)}</small></Flex>)}
                </div> : <div onClick={scanPost}>Load Post</div>}
            </Col>
        </Row>
    </Drawer>)
}