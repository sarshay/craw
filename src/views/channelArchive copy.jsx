import { Button, Card, Chip, Grid, Typography } from '@mui/material';
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
import { Loading } from './components/stateReport';
import PostThumbnail from './components/postThumbnail';
import { myConfig, useQuery } from '../services';
import { useWindowSize } from '../services/document';
import useCacheOrFatch from '../services/cache';
import FullPost from './components/fullpost';
// import BolgPost from './components/fullpost';

export default function ChannelArchive(props) {
    const [oldData, setOldData] = useState([]);
    const [page, setPage] = useState(1);
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


    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight

        if (scrollTop + clientHeight >= scrollHeight) {
            if (hasMore && !loading) {
                if (!error) {
                    if (Array.isArray(data)) {
                        setOldData([...oldData, ...data]);
                        setPage(page + 1);
                        setMessage("")
                    }
                }
                else {
                    setHasMore(false);
                    setMessage("မရှိပါဗျလ်")
                }
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [oldData])


    const [width, height] = useWindowSize();
    const limitWidth = width > 760;
    const isMobile = width < 900;

    // const scrollPosition = useScrollPosition();
    // console.log(useScrollPosition);
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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} sx={{ p: 1 }}>
                {oldData &&
                    oldData.map((d, i) => (
                        <Grid item xs={1}>
                            <PostThumbnail {...d} cats={findCat(props.cats, d.categories)} link={`/${channelId}/${d.id}/?${currentQuery}`} />
                        </Grid>
                    ))
                }
                {data && !loading && Array.isArray(data) &&
                    data.map((d, i) => (
                        <Grid item xs={1} >
                            <PostThumbnail {...d} cats={findCat(props.cats, d.categories)} link={`/${channelId}/${d.id}/?${currentQuery}`} />
                        </Grid>
                    ))
                }
            </Grid>
            {loading && <Loading />}
            {/* {error && <Error {...error} />} */}
            <Box sx={{ m: 1, textAlign: 'center' }} >
                {message && message}
            </Box>
            {!loading && hasMore && <Button id='loadmore' style={{ width: '100%' }} onClick={loadMore}>More</Button>}
            {/* </Route> */}
            {/* {!limitWidth && <BlogCategories mobile={true} />} */}
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