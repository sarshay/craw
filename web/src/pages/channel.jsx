import React, { useEffect, useState } from 'react';
import { useComponentState, useMyList } from '../providers/context';
import { Col, List, Menu, Row, Spin, Tabs, Typography } from 'antd';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import Search from 'antd/es/input/Search';
import wpScan from '../utils/wpScan';
import InfiniteScroll from '../components/infiniteScroll';
import { TheHtml } from '../utils/html';
import { PostThumbnail } from '../components/post';

function ChannelPage(props) {
    const { website } = useMyList()
    let { channelId } = useParams();
    const theWp = website.find(w => w.id == channelId);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryId = searchParams.get("c")

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoadig] = useState(true);
    const [message, setMessage] = useState(false);

    const [category, setCategory] = useState([])
    const cuttentCat = category?.find(cat => cat.id == categoryId)
    const [posts, setPosts] = useState([])
    const [categoryLoading, setCategoryLoading] = useState([])

    // let _category = query.get("categories") ? `&categories=${query.get("categories")}` : ``;
    const wp = wpScan({ wpUrl: theWp?.url });

    const { messageAPi } = useComponentState();
    useEffect(() => {
        setCategory([]);
        if (theWp) {
            const fetchData = () => {
                setCategoryLoading(true)
                wp.getCategory().then((data) => {
                    setCategory(data);
                }).catch((error) => {
                    messageAPi.error(error?.message);
                    // setWpError(error?.message)
                }).finally(() => {
                    setCategoryLoading(false)
                });
            };
            fetchData()
        }
    }, [theWp]);
    const fetchPost = () => {
        setLoadig(true)
        // setWpError(null)
        wp.getPost({ categories: categoryId, page: page }).then((data) => {
            setPosts(old => [...old, ...data]);
            setMessage(cuttentCat?.count - posts?.length)
        }).catch((error) => {
            setHasMore(false)
            messageAPi.error(error?.message);
            // setWpError(error?.message)
        }).finally(() => {
            setLoadig(false)
        });
    };
    useEffect(() => {
        setHasMore(true)
        setPosts([])
        setPage(1)
    }, [theWp, categoryId])

    const loadMore = () => {
        if (theWp && hasMore && !loading) {
            setPage((pre) => pre + 1);
            // console.log("loading page:" + page)
            // console.log("has more", hasMore)
        } else {
            messageAPi.error("no");
        }
    }
    useEffect(() => {
        fetchPost()
    }, [page, theWp, categoryId])
    return (
        <div key={channelId}>
            {categoryLoading ? <Spin /> : <Menu
                selectedKeys={[categoryId]} mode="horizontal" items={category.map(c => {
                    return {
                        label: <Link to={`${APP_ROUTES.CHANNEL_ID(channelId)}?c=${c.id}`}>{c.name} [${c.count}]</Link>,
                        key: c.id,
                    }
                })} />}
            <Row gutter={[16, 16]}>
                {
                    (posts || []).map((w) => (
                        <Col span={8} key={w.id}>
                            <PostThumbnail data={w} />
                        </Col>
                    ))
                }
            </Row>

            <InfiniteScroll
                loadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
            />
            {loading && <Spin />}
            <div style={{ position: 'sticky', bottom: 0 }}>
                <center>{message}</center>
            </div>
        </div>
    );
}

export default ChannelPage;