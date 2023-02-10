import { Box, Card, Grid, Paper, Typography } from '@mui/material';
import { myConfig } from '../services';
import useCacheOrFatch from '../services/cache';
import { Error, Loading } from './components/stateReport';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import { headTagMaker } from '../services/document';
// import "swiper/css";
// import "swiper/css/navigation";


function Channels(props) {
    const end_point = `${myConfig.backend_url}/wp_channel/`
    const { loading, error, data } = useCacheOrFatch('basic', end_point, 10);
    // const demo = [
    //     { id: 1, name: "News", image: "url", description: "description" },
    //     { id: 1, name: "Movies", image: "url", description: "description" },
    //     { id: 1, name: "Books", image: "url", description: "description" },
    // ]
    headTagMaker({
        title: "My Book",
        description: "ရသစုံလွင်",
        color: "#222222"
    })
    return (
        <div style={{ minHeight: "100vh" }} className="channelBrowse">
            {loading &&
                <Box>
                    <Loading height="100vh" />
                </Box>
            }
            {error && <Error />}
            {data && <ChannelBoard category={data} />}
            {/* <ChannelBoard category={demo} /> */}
        </div>
    );
}

export default Channels;

function ChannelBoard(param) {
    {
        headTagMaker({
            title: "All Channels",
            description: "ချန်နယ်ပေါင်းစုံစုပေးထားပါတယ်"
        })
    }
    return (
        <div>
            {param.category.map((p, i) =>

                <Box key={p.term_id}>
                    {Array.isArray(p.channels) ?
                        <Box sx={{ py: 3 }}>
                            <Typography component={"h2"} variant={"h5"} sx={{ color: '#ffffff' }}><center>{p.name}</center></Typography>
                            <ChannelTabs c={p.channels} />
                        </Box>
                        : ""
                    }

                </Box>
            )}
        </div>
    )
}


function ChannelTabs(prop) {
    return (
        <Swiper
            slidesPerView={'auto'}
            spaceBetween={10}
            freeMode={true}
            modules={[FreeMode, Pagination]}
            className="mySwiper">
            {
                prop.c.map((c, i) => (
                    <SwiperSlide key={i}>
                        <Card sx={{ margin: "10px", background: c.images.s ? `url(${c.images.s})` : c.color, backgroundSize: "cover", backgroundPosition: "center" }} >
                            <CardActionArea component={Link} to={`/${c.slug}`}>
                                <CardContent style={{ width: 120, height: "140px", color: "#ffffff", background: "rgba(0,0,0,0.7)" }}>
                                    <Typography variant="b" component="h3">
                                        {c.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ pt: 1 }}>
                                        {c.excerpt}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    );
}
