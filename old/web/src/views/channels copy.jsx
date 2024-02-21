import { Box, Card, Paper, Typography } from '@mui/material';
import { myConfig } from '../services';
import useCacheOrFatch from '../services/cache';
import { Error, Loading } from './components/stateReport';
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useRouteMatch } from 'react-router-dom/cjs/react-router-dom.min';

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { headTagMaker } from '../services/document';
// import "swiper/css";
// import "swiper/css/navigation";


function Channels(props) {
    const end_point = `${myConfig.backend_url}/wp_channel/`
    const { loading, error, data } = useCacheOrFatch('basic', end_point);
    // const demo = [
    //     { id: 1, name: "News", image: "url", description: "description" },
    //     { id: 1, name: "Movies", image: "url", description: "description" },
    //     { id: 1, name: "Books", image: "url", description: "description" },
    // ]
    return (
        <div>
            {loading && <Loading />}
            {error && <Error />}
            {data && <ChannelBoard category={data} />}
            {/* <ChannelBoard category={demo} /> */}
        </div>
    );
}

export default Channels;

function ChannelBoard(param) {
    {headTagMaker({
        title: "All Channels",
        description: "ချန်နယ်ပေါင်းစုံစုပေးထားပါတယ်"
    })}
    return (
        <div>
            {param.category.map((p, i) =>

                <Box key={p.term_id} className="channelBrowse">
                    {Array.isArray(p.channels) ?
                        <Box sx={{py:3}}>
                            <Typography component={"h2"} variant={"h5"} sx={{color:'#ffffff'}}><center>{p.name}</center></Typography>
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
                        <Card sx={{ margin: "10px" }}>
                            <CardActionArea sx={{ width: 200, }} component={Link} to={`/${c.slug}`}>
                                {
                                    c.images.s ?
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={c.images.s}
                                            alt="green iguana"
                                        /> : ""
                                }

                                <CardContent>
                                    <Typography variant="b" component="h3">
                                        {c.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
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
