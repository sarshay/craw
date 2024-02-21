import * as React from 'react';
import { ArrowBack, Backspace, SearchRounded } from '@mui/icons-material';
import { AppBar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Paper, Slide, SwipeableDrawer, Tabs, Toolbar, Typography, useScrollTrigger } from '@mui/material';
// import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { myConfig, TheHtml } from '../services';
import useCacheOrFatch from '../services/cache';
import ChannelArchive from './channelArchive';
import CatTabs from './components/nav/tab';
import { Error, Loading } from './components/stateReport';

import { headTagMaker } from '../services/document';
import MySearch from './components/search';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Channel(props) {

    let { channelId } = useParams();

    const end_point = `${myConfig.backend_url}/wp_channel/${channelId}/`
    const { loading, error, data } = useCacheOrFatch('basic', end_point);
    return (
        <div>
            {loading && <Loading />}
            {error && <Error />}
            {data && <ChannelBoard channelData={data} />}
        </div>
    );
}
export default Channel;

function ChannelBoard(prop) {
    let { channelId } = useParams();
    {
        headTagMaker({
            title: prop.channelData.title,
            description: prop.channelData.content,
            color: prop.channelData.color
        })
    }
    const history = useHistory();
    const trigger = useScrollTrigger();
    const end_point = prop.channelData.channel_link && `${prop.channelData.channel_link}/?rest_route=/wp/v2/categories`
    const { loading, error, data } = useCacheOrFatch('basic', end_point);
    return (
        <div>
            <Slide appear={false} direction="down" in={!trigger}>
                <AppBar style={{ background: prop.channelData.color }}>
                    <Toolbar>
                        <IconButton onClick={() => history.replace('/')}>
                            <ArrowBack sx={{ color: "#ffffff" }} />
                        </IconButton>
                        <div style={{ flex: '1' }}>
                            <Typography component={'h2'} variant={"h5"}>{prop.channelData.title}</Typography>
                            {TheHtml(prop.channelData.content)}
                        </div>
                        <MySearch {...prop.channelData} />
                    </Toolbar>



                    {data &&
                        <Paper square sx={{ position: 'sticky', top: 0, zIndex: 99 }}>
                            <CatTabs cats={data} />
                        </Paper>
                    }
                </AppBar>
            </Slide>

            <Box sx={{ paddingTop: "120px" }}>
                {loading && <Loading />}
                {error && <Error />}
                {data &&
                    <div style={{ transition: "all 0.4s" }}>
                        <ChannelArchive {...prop} cats={data} />
                    </div>
                }</Box>
        </div>
    )
}