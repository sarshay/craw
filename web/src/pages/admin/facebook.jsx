import { Button, Card, Col, Divider, Image, Input, List, Row, Select, Spin, Typography } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { API_ROUTES, APP_ROUTES } from '../../routes';
import { useApi } from '../../hooks/api';
import { WPForm } from './website';
import { useLayout, useMyList } from '../../providers/context';
import { makeFresh } from '../../utils/function';
import wpScan from '../../utils/wpScan';
import { Meta } from 'antd/es/list/Item';
import { useAdminLayout } from './layout.office';


import axios from "axios";
import { TheHtml } from '../../utils/html';
import { PostThumbnail } from '../../components/post';
function FacebookPage(props) {
    const [selectedPage, setSelectedPage] = useState(null);
    const [selectedChannelId, setSelectedChannelId] = useState(null);
    const [feeds, setFeeds] = useState([])
    const { loading: pageLoading, error: pageError, data: pages } = useApi(API_ROUTES.FB_PAGE)
    const { website } = useMyList()
    let headersList = {
        "Accept": "*/*"
    }
    useEffect(() => {
        if (selectedPage) {
            axios.request({
                // url: "https://graph.facebook.com/v19.0/101199821743033/feed",
                url: "https://graph.facebook.com/v19.0/me/feed",
                method: "GET",
                headers: headersList,
                params: {
                    fields: 'full_picture,message',
                    access_token: selectedPage?.access_token
                }
            }).then((res) => {
                setFeeds(res.data.data)
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
                <h2>WP</h2>
                <List className='max-w-sm'>
                    {website?.map(w => (
                        <List.Item key={w.id} onClick={() => setSelectedChannelId(w.id)}>
                            <div className='flex gap-4'>
                                {w.site_icon_url && <Image src={w.site_icon_url} height={60} width={60} style={{ objectFit: 'cover' }} />}
                                <Typography.Paragraph className='flex-1' ellipsis={{ rows: 3 }}>{w.name}</Typography.Paragraph>
                                {/* {f.link} */}
                            </div>
                        </List.Item>
                    ))}
                </List>
            </Col>

            <Col span={12} >
                <PostByWebIid id={selectedChannelId} access_token={selectedPage?.access_token} />
            </Col>
            <Col span={6} className='h-screen overflow-y-auto'>
                <Select showSearch
                    loading={pageLoading}
                    placeholder="Select a Page"
                    optionFilterProp="children"
                    onChange={(v) => setSelectedPage(pages.find(p => p.id == v))}
                    value={selectedPage?.id}
                    filterOption={filterOption}
                    options={pages?.map(p => { return { value: p.id, label: p.name } })} />
                <List className='max-w-sm'>
                    {feeds.map(f => (
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

function PostByWebIid({ id, access_token }) {
    const { website } = useMyList();
    const theWp = website.find(x => x.id == id);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(null);
    const [selectedPost, setSelectedPost] = useState([])
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


    const [postedId, setPostedId] = useState([]);
    let headersList = {
        "Accept": "*/*"
    }
    const postThese = ({ channelId, postId }) => {
        axios.request({
            // url: "https://graph.facebook.com/v19.0/101199821743033/feed",
            url: "https://graph.facebook.com/v19.0/me/feed",
            method: "POST",
            headers: headersList,
            data: {
                link: `https://himyanmar.online/${channelId}/${postId}/`,
                access_token: access_token
            }
        }).then((res) => {
            setPostedId((ids) => [...ids, postId])
            setSelectedPost(old => old.filter(o => o.id !== postId))
        }).catch(() => {

        })
    }
    const postLoop = () => {
        if (selectedPost.length > 0) {
            selectedPost.map((p) => {
                postThese({ channelId: id, postId: p.id })
            })
        }
    }
    return (
        <Row>
            <Col span={12} className='h-screen overflow-y-auto'>
                <List loading={loading}>
                    {posts.map((p) => (
                        <List.Item onClick={() => selectedToggle(p)}>
                            <PostThumbnail data={p} wpInfo={theWp} />
                        </List.Item>
                    ))}
                </List>
            </Col>
            <Col span={12} className='h-screen overflow-y-auto'>
                {
                    selectedPost.map((p) => (
                        <List.Item onClick={() => selectedToggle(p)}>
                            <PostThumbnail data={p} wpInfo={theWp} type={"list"} />
                        </List.Item>
                    ))
                }
                <Button onClick={postLoop} type='primary' className='sticky bottom-0'>Post On Facebook</Button>
            </Col>
        </Row>
    )
}