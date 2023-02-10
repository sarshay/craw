import { Button, Card, Chip, Grid, ImageList, ImageListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";
import { Error, Loading } from './components/stateReport';
import PostThumbnail from './components/postThumbnail';
import { myConfig, useQuery } from '../services';
import { useScrollPosition, useWindowSize } from '../services/document';
import useCacheOrFatch from '../services/cache';
import FullPost from './components/fullpost';
import { Masonry } from '@mui/lab';
// import BolgPost from './components/fullpost';

export default function ChannelArchive(props) {
    const [oldData, setOldData] = useState([]);
    const [page, setPage] = useState(1);
    const [prePage, setPrePage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState(false);
    let match = useRouteMatch();
    let query = useQuery();
    let { channelId } = useParams();

    let _category = query.get("categories") ? `&categories=${query.get("categories")}` : ``;
    let _search = query.get("search") ? `&search=${query.get("search")}` : ``;

    let currentQuery = _category + _search;


    useEffect(() => {
        setPage(1);
        setOldData([]);
        setHasMore(true);
        setMessage(false);
    }, [currentQuery])


    const end_point = props.channelData.channel_link && `${props.channelData.channel_link}/?rest_route=/wp/v2/posts&page=${page}${currentQuery}&_fields=id,title,date,_links,excerpt,categories&_embed=wp:featuredmedia` //content
    const { loading, error, data } = useCacheOrFatch('basic', end_point, 60);

    const loadMore = () => {
        if (hasMore && !loading) {
            setMessage("")
            setPage(prePage + 1);
            console.log("loading page:" + page)
            console.log("has more", hasMore)
        }
    }
    useEffect(() => {
        if (!loading && data) {
            if (Array.isArray(data)) {
                setOldData([...oldData, ...data]);
                setPrePage(page);
            }
        } else {
            if (error.response && error.response.status >= 400) {
                setHasMore(false);
                setMessage("မရှိပါဗျလ်")
            }
        }
    }, [data, error])

    useEffect(() => {
        const handleScroll = (e) => {
            const fromBottom = document.body.getBoundingClientRect().bottom - window.innerHeight;
            if (fromBottom < 1000 && !loading && hasMore) {
                document.getElementById('loadmore') && document.getElementById('loadmore').click();
            }
        }
        window.addEventListener("scroll", handleScroll);
    }, [])


    const [width, height] = useWindowSize();
    const limitWidth = width > 760;
    const isMobile = width < 900;

    const itemParRow = Math.floor(width / 200);
    // const numOfLoadCard = Math.floor(itemParRow - (oldData.length % itemParRow));

    //first load
    // useEffect(() => {
    //     loadMore();
    // }, [])

    return (
        <React.Fragment>
            {/* {headTagMaker({
                title: props.name + "'s Blog",
                description: "နည်းပညာအကြောင်းအရာများ",
                color: props.materialTheme.palette.background.paper
            })} */}
            <Switch>
                <Route path={`${match.path}/:postId`}>
                    <FullPost backUrl={`${match.url}?${currentQuery}`} popUp={isMobile} channelData={props.channelData} />
                </Route>

            </Switch>
            {/* <Route path={`${match.path}`}> */}
            {
                query.get("search") &&
                <Typography component={"h2"} variant={"h4"}>Search Result for {query.get("search")}</Typography>
            }
            <div style={{ transition: "all 0.4s", padding: "0px 10px" }}>
                <Grid container spacing={2} rowSpacing={1} columns={itemParRow}>
                    {oldData &&
                        oldData.map((d, i) => (
                            <Grid item key={i} xs={1}>
                                <PostThumbnail {...d} cats={findCat(props.cats, d.categories)} link={`/${channelId}/${d.id}/?${currentQuery}`} />
                            </Grid>
                        ))
                    }
                    {loading &&
                        [...Array(itemParRow - (oldData.length % itemParRow))].map((e, i) => (
                            <Grid item xs={1} key={i}><Loading mode="card" height="200px" /></Grid>
                        ))
                    }
                </Grid>
            </div>
            {/* {error && <Error {...error} />} */}
            <Box sx={{ m: 1, textAlign: 'center' }} >
                {message && message}
            </Box>
            {!loading && hasMore && <Button id='loadmore' style={{ width: '100%' }} onClick={loadMore}>More</Button>}
            {/* </Route> */}
            {/* {!limitWidth && <BlogCategories mobile={true} />} */}
            {error && !error.response && <Error {...error} />}
        </React.Fragment >
    );
}

function findCat(catsList, catsId) {
    var theCatArray = [];
    catsId.map((c, i) => (
        theCatArray.push(catsList.filter(x => x.id === c)[0])
    ))

    return theCatArray
}