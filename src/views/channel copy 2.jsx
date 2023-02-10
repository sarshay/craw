import { Button, Card, Chip, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react';
import useMyLoader from '../function/axio';
import BlogThumbnail from '../components/blog/blogThumbnail';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";
import BolgPost from '../components/blog/bolgPost';
import info from '../info.json';
import { useQuery, useWindowSize } from '../function';
import { headTagMaker } from '../function'
import useScrollPosition from '../function/scrollPosition'

export default function Channel(props) {
    const [oldData, setOldData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [message, setMessage] = useState(false);
    let match = useRouteMatch();
    let query = useQuery();


    let category = query.get("category") ? `category/${query.get("category")}/` : "";
    // let page = query.get("page") ? `page=${query.get("page")}` : "";
    let fullParameter = `${category}${page > 1 ? "page/" + page + "/" : ""}`;

    useEffect(() => {
        setPage(1);
        setOldData([]);
        setHasMore(true);
        setMessage(false);
        console.log("useEffect")
    }, [category])

    const end_point = `${info.backend_url}/${fullParameter}`
    const { loading, error, data } = useMyLoader(end_point);

    const loadMore = (e) => {
        if (hasMore && !loading) {

            // collect old post
            if (!error) {
                if (Array.isArray(data.data)) {
                    setOldData([...oldData, ...data.data]);
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

    useEffect(() => {
        const handleScroll = (e) => {
            const fromBottom = document.body.getBoundingClientRect().bottom - window.innerHeight;
            if (fromBottom < 800 && !loading && hasMore) {
                document.getElementById('loadmore') && document.getElementById('loadmore').click();
            }
            // console.log("bottom = " + fromBottom)

        }
        window.addEventListener("scroll", handleScroll);


        // console.log("scloll detacted")
    }, [])


    let { blogId } = useParams();
    const [width, height] = useWindowSize();
    const limitWidth = width > 760;
    const mobile = width < 900;


    // const scrollPosition = useScrollPosition();
    // console.log(useScrollPosition);
    return (
        <React.Fragment>
            {headTagMaker({
                title: props.name + "'s Blog",
                description: "နည်းပညာအကြောင်းအရာများ",
                color: props.materialTheme.palette.background.paper
            })}
            <Grid container spacing={1} >
                <Grid item xs={12} sm={limitWidth ? 2 : 12} md={limitWidth ? 2 : 12} lg={limitWidth ? 1 : 12}>
                    <div style={{ position: 'sticky', top: 0 }}>
                        {/* {limitWidth && <BlogCategories />} */}
                    </div>
                </Grid>

                <Grid item xs={12} sm={limitWidth ? 9 : 12} md={limitWidth ? 9 : 12} lg={limitWidth ? 10 : 12}>
                    <Switch>
                        <Route path={`${match.path}/:blogId`}>
                            <BolgPost backUrl={`${match.url}?${fullParameter}`} popUp={mobile} />
                        </Route>
                        <Route path={`${match.path}`}>
                            <div style={{ maxWidth: '500px', margin: 'auto' }}>
                                <Box sx={{ p: 1 }} >
                                    <Typography variant='h2' component={Link} to={`${match.url}`}>
                                        <div className="bigText">
                                            Blog
                                        </div>
                                    </Typography>
                                </Box>
                                {oldData &&
                                    <Box sx={{ my: 5, mx: 1 }}>
                                        {oldData.map((d, i) => (
                                            <Link to={`${match.url}/${d.id}?${fullParameter}`} key={i}>
                                                <BlogThumbnail key={i} data={d} />
                                            </Link>
                                        ))}
                                    </Box>
                                }
                                {data && !loading && Array.isArray(data.data) &&
                                    <Box sx={{ my: 5, mx: 1 }}>
                                        {data.data.map((d, i) => (
                                            <Link to={`${match.url}/${d.id}?${fullParameter}`} key={i}>
                                                <BlogThumbnail key={i} data={d} />
                                            </Link>
                                        ))}
                                    </Box>
                                }
                                {loading && <Loading />}
                                {/* {error && <Error {...error} />} */}
                                <Box sx={{ m: 1, textAlign: 'center' }} >
                                    {message && message}
                                </Box>
                                {hasMore && <Button id='loadmore' style={{ width: '100%' }} onClick={loadMore}>More</Button>}
                            </div>
                        </Route>
                    </Switch>
                </Grid>
            </Grid>
            {/* {!limitWidth && <BlogCategories mobile={true} />} */}
        </React.Fragment >
    );
}
