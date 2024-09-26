import React, { useEffect, useRef, useState } from 'react';
import { useLayout, useMyList, useTheme } from '../providers/context';
import { Avatar, Col, Drawer, Flex, List, Menu, Row, Space, Spin, Tabs, Typography, theme } from 'antd';
import { Link, Outlet, unstable_HistoryRouter, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import Search from 'antd/es/input/Search';
import wpScan from '../utils/wpScan';
import InfiniteScroll from './infiniteScroll';
import { TheHtml } from '../utils/html';
import { PostThumbnail } from './post';
import { ArrowLeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useScrollDirection } from '../utils/function';
import Is18PlusCover from './18PlusCover';


function WordpressPostPicker({ theWp, onClick, rendered }) {
    let { channelId, postId } = useParams();
    const [category_id, setCategoryId] = useState(null);
    const [searchWord, setSearchWord] = useState(null);

    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoadig] = useState(true);
    const [message, setMessage] = useState(false);

    const [category, setCategory] = useState([])
    const cuttentCat = category?.find(cat => cat.id == category_id)
    const [posts, setPosts] = useState([])
    const [categoryLoading, setCategoryLoading] = useState([])

    // let _category = query.get("categories") ? `&categories=${query.get("categories")}` : ``;
    const wp = wpScan({ wpUrl: theWp?.url, api_base_path: theWp?.api_base_path });

    const postCount = cuttentCat ? cuttentCat.count : category.reduce((acc, c) => acc + c.count, 0);

    useEffect(() => {
        setCategory([]);
        if (theWp) {
            const fetchData = () => {
                setCategoryLoading(true)
                wp.getCategory().then((data) => {
                    setCategory(data);
                }).catch((error) => {
                    console.log(error)
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
        wp.getPost({ categories: category_id, page: page, ...searchWord && { search: searchWord } }).then((data) => {
            setPosts(old => [...old, ...data]);
            setMessage(postCount - posts?.length)
        }).catch((error) => {
            setHasMore(false)
            console.log(error)
            // setWpError(error?.message)
        }).finally(() => {
            setLoadig(false)
        });
    };
    useEffect(() => {
        setPosts([])
        setHasMore(true)
        if (page == 1) {
            fetchPost()
        } else {
            setPage(1)
        }

    }, [theWp, category_id, searchWord])

    const loadMore = () => {
        if (theWp && hasMore && !loading) {
            setPage((pre) => pre + 1);
        } else {

        }
    }
    useEffect(() => {
        fetchPost()
    }, [page])

    const type = 'poster';

    const { direction } = useScrollDirection()



    return (
        <div key={channelId}>
            <div className={`${direction == 'down' ? "-translate-y-16" : ""} bg-white transition duration-150 ease-out px-4 py-2 sticky top-0`}>
                <Search
                    placeholder='Search'
                    defaultValue={searchWord}
                    onSearch={(e) => setSearchWord(e)}
                    width={'100%'} />
            </div>
            <InfiniteScroll
                onEnd={loadMore}
                loading={loading}
                hasMore={hasMore}
                loadingComponent={<center><Spin /></center>}
                offset={300}
            >
                <div>
                    {
                        (posts || []).map((w) => (
                            <div key={`${w.id}`} onClick={() => onClick({ ...w, theWp })}>
                                {rendered ? rendered(w) : (
                                    <div className='m-4' >
                                        <PostThumbnail data={w} wpInfo={theWp} type={"list"} />
                                    </div>
                                )}
                            </div>
                        ))
                    }
                </div>
            </InfiniteScroll>
            <div className='fixed right-0 left-0 bottom-0'>
                <center>{message}</center>
            </div>
            <div className={`${direction == 'down' ? "translate-y-16" : ""} transition duration-150 ease-out sticky bottom-0 w-full`}>
                {category && <Menu
                    selectedKeys={[category_id]} mode="horizontal"
                    items={[{ name: "all" }, ...category].map(c => {
                        return {
                            label: <div onClick={() => setCategoryId(c.id)} >{c.name} [{c?.count}]</div>,
                            key: c.id,
                        }
                    })} />}
            </div>

        </div>
    );
}

export default WordpressPostPicker;