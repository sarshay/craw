import { Button, Card, Col, Divider, Image, Input, List, Row, Select, Spin, Tag, Typography, message } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { API_ROUTES, APP_ROUTES, FB_ACCESS_TOKEN } from '../../routes';
import { useApi } from '../../hooks/api';
import { WPForm } from './website';
import { useLayout, useMyList } from '../../providers/context';
import { makeFresh } from '../../utils/function';
import wpScan from '../../utils/wpScan';
import { Meta } from 'antd/es/list/Item';
import { useAdminLayout } from './layout.office';


import axios from "axios";
import { TheHtml, removeHTMLTags } from '../../utils/html';
import { PostThumbnail } from '../../components/post';
import { JSONTree } from 'react-json-tree';
import facebook from '../../utils/facebook';
import FacebookLogin from '../../utils/fb';
function FacebookPage(props) {
    const [selectedPage, setSelectedPage] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [feeds, setFeeds] = useState(null)
    const [pages, setPages] = useState(null)

    useEffect(() => {
        setPages(p => { return { ...p, loading: true } })
        facebook(FB_ACCESS_TOKEN).getUserPages().then(({ data }) => {
            setPages(p => { return { ...p, ...data } })
        }).catch(error => {
            setPages(p => { return { ...p, error } })
        }).finally(() => {
            setPages(p => { return { ...p, loading: false } })
        })
    }, [])

    const { website } = useMyList()
    let headersList = {
        "Accept": "*/*"
    }
    useEffect(() => {
        if (selectedPage) {
            setFeeds(p => { return { ...p, loading: true } })
            facebook(selectedPage?.access_token).getFeed().then(({ data }) => {
                setFeeds(p => { return { ...p, ...data } })
            }).catch(error => {
                setFeeds(p => { return { ...p, error } })
            }).finally(() => {
                setFeeds(p => { return { ...p, loading: false } })
            })
        }
    }, [selectedPage])

    // https://channelmyanmar.org/wp-json/wp/v2/posts/?after=2024-02-28T10:00:00

    // const wp = wpScan({wpUrl:})

    const filterOption = (input, option) =>
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

    return (
        <Row>
            <Col span={6} className='h-screen overflow-y-auto'>
                <List className='max-w-sm p-4'>
                    <List.Item className='sticky top-0'>Wordpress</List.Item>
                    {website.filter(w => w.status == 'active')?.map(w => (
                        <List.Item key={w.id} onClick={() => setSelectedChannel(w)} extra={w.site_icon_url && <Image src={w.site_icon_url} height={60} width={60} style={{ objectFit: 'cover' }} />}>
                            <div>
                                <Typography.Title level={5} className='flex-1' ellipsis={{ rows: 3 }}>{w.name} {w.is18Plus == 'yes' && <Tag color='#ff0000' bordered={false}>18+</Tag>}</Typography.Title>
                                <Typography.Text type='secondery'>{w.url}</Typography.Text>
                            </div>
                        </List.Item>
                    ))}
                </List>
            </Col>
            <Col span={12} >
                {selectedChannel ? <PostByWebIid theWp={selectedChannel} access_token={selectedPage?.access_token} /> : "selected one wordpress"}
            </Col>
            <Col span={6} className='h-screen overflow-y-auto'>
                <div className='sticky top-0 p-4 z-10'>
                    <Select
                        className='w-full'
                        showSearch
                        loading={pages?.loading}
                        placeholder="Select a Page"
                        optionFilterProp="children"
                        onChange={(v) => setSelectedPage(pages?.data.find(p => p.id == v))}
                        value={selectedPage?.id}
                        filterOption={filterOption}
                        options={pages?.data?.map(p => { return { value: p.id, label: p.name } })} />
                </div>
                <List className='p-4' loading={feeds?.loading}>
                    {feeds?.data?.map(f => (
                        <List.Item key={f.id}>
                            <div className='flex gap-4'>
                                {f.full_picture && <Image src={f.full_picture} height={100} width={100} style={{ objectFit: 'cover' }} />}
                                <Typography.Paragraph className='flex-1' ellipsis={{ rows: 3 }}>{f.message}</Typography.Paragraph>
                                {f.link}
                            </div>
                        </List.Item>
                    ))}
                </List>
            </Col>
        </Row>
    );
}

export default FacebookPage;

function PostByWebIid({ theWp, access_token }) {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(null);
    const [selectedPost, setSelectedPost] = useState([])

    const [messageAPi, contextHolder] = message.useMessage();
    useEffect(() => {
        if (theWp) {
            setLoading(true);
            setPosts([])
            const wp = wpScan({ wpUrl: theWp?.url, api_base_path: theWp?.api_base_path })
            wp.getPost().then((data) => {
                setPosts(data);
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setLoading(false);
            })
        }
    }, [theWp])
    const selectedToggle = ((p) => {
        const _ = selectedPost.find(x => x.id == p.id)
        if (_) {
            setSelectedPost(old => old.filter(x => x.id !== p.id))
        } else {
            setSelectedPost(old => [...old, p])
        }
    })


    let headersList = {
        "Accept": "*/*"
    }
    const postThese = async ({ link, message, access_token, postId }) => {
        await facebook(access_token).postFeed({
            link,
            message,
            access_token,
        }).then(() => {
            setSelectedPost(old => old.filter(o => o.id !== postId))
        }).catch((e) => {
            messageAPi.error(e.message)
        })
    }
    const postLoop = () => {
        if (!access_token) {
            messageAPi.warning('select page')
            return;
        }
        if (selectedPost.length > 0) {
            selectedPost.map((p) => {
                postThese({
                    link: `https://himyanmar.online/${theWp.id}/${p.id}/`,
                    message: removeHTMLTags(p.title.rendered),
                    access_token: access_token,
                    postId: p.id
                })
            })
            return;
        }
    }
    return (
        <Row>{contextHolder}
            <Col span={12} className='h-screen overflow-y-auto'>
                <div className='sticky top-0 p-4'>{theWp?.name}</div>
                <List loading={loading} className=' p-4'>
                    {posts.map((p) => (
                        <List.Item onClick={() => selectedToggle(p)} className={selectedPost.find(x => x.id == p.id) && 'bg-sky-500/10'}>
                            <PostThumbnail data={p} wpInfo={theWp} type={"list"} />
                        </List.Item>
                    ))}
                </List>
            </Col>
            <Col span={12} className='h-screen overflow-y-auto p-4'>
                <List>
                    {
                        selectedPost.map((p) => (
                            <List.Item onClick={() => selectedToggle(p)}>
                                <PostThumbnail data={p} wpInfo={theWp} type={"list"} />
                            </List.Item>
                        ))
                    }
                    {selectedPost.length > 0 ? <List.Item className='sticky bottom-0'><Button onClick={postLoop} className='sticky bottom-0'>Post On Facebook</Button></List.Item> : 'select min 1 post'}
                </List>
            </Col>
        </Row>
    )
}