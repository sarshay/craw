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
    const currentCat = searchParams.get("c")

    const [oldData, setOldData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoadig] = useState(true);
    const [message, setMessage] = useState(false);

    const [category, setCategory] = useState([])
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
        wp.getPost({ categories: currentCat, page: page }).then((data) => {
            setPosts(old => [...old, ...data]);
        }).catch((error) => {
            messageAPi.error(error?.message);
            // setWpError(error?.message)
        }).finally(() => {
            setLoadig(false)
        });
    };
    useEffect(() => {
        setPosts([])
        setPage(1)
        fetchPost()
    }, [theWp, currentCat])

    const loadMore = () => {
        if (hasMore && !loading) {
            setMessage("")
            setPage((pre) => pre + 1);
            console.log("loading page:" + page)
            console.log("has more", hasMore)
        }
    }
    useEffect(() => {
        fetchPost()
    }, [page])
    return (
        <div key={channelId}>
            {categoryLoading ? <Spin /> : <Menu
                selectedKeys={[currentCat]} mode="horizontal" items={category.map(c => {
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

            {loading && <Spin />}
            <InfiniteScroll
                loadMore={loadMore}
                loading={loading}
                hasMore={hasMore}
            />
        </div>
    );
}

export default ChannelPage;