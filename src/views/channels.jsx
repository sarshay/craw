import { Box, Card, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
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
            {data && <ChannelBoard data={data} />}
            {/* <ChannelBoard category={demo} /> */}
        </div>
    );
}

export default Channels;

function ChannelBoard(param) {
    const cats = [];
    const channels = [];
    const [_cats, set_Cats] = React.useState([]);
    const [_channels, set_Channels] = React.useState([]);
    const [selectedChannel, setSelectedChannel] = React.useState(0);
    {
        headTagMaker({
            title: "All Channels",
            description: "ချန်နယ်ပေါင်းစုံစုပေးထားပါတယ်"
        })
    }
    React.useEffect(() => {
        if (Array.isArray(param.data)) {
            param.data.map((cat) => (
                cats.push({
                    term_id: cat.term_id,
                    name: cat.name
                }),
                cat.channels.map((ch) => (
                    channels.findIndex(x => x.id === ch.id) !== -1
                        ?
                        Array.isArray(channels[channels.findIndex(x => x.id === ch.id)].term_ids) &&
                        channels[channels.findIndex(x => x.id === ch.id)].term_ids.push(cat.term_id)
                        :
                        channels.push({
                            term_ids: [cat.term_id],
                            color: ch.color,
                            channel_link: ch.channel_link,
                            id: ch.id,
                            slug: ch.slug,
                            title: ch.title,
                            url: ch.url,
                            excerpt: ch.excerpt,
                            images: ch.images
                        })
                ))

            ))
        }
        set_Cats(cats);
        channels.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            }
            if (a.title > b.title) {
              return 1;
            }
            return 0;
          });
        set_Channels(channels);
    }, [param])

    const handleChange = (event, newValue) => {
        setSelectedChannel(newValue);
    };
    return (
        <div>
            <Paper square sx={{ position: 'sticky', top: 0, zIndex: 99, bgcolor: "#222222", color: "#ffffff" }}>
                <Tabs
                    value={selectedChannel}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    aria-label="Select a category"
                ><Tab label="All Channels"
                    sx={{ color: "#ffffff" }}
                    value={0}
                    />
                    {
                        _cats.map((c, i) => (
                            <Tab label={c.name}
                                key={i}
                                sx={{ color: "#ffffff" }}
                                value={c.term_id}
                            />
                        ))
                    }
                </Tabs>
            </Paper>
            {_channels.map((c, i) => (
                (c.term_ids.find(element => element == selectedChannel) || selectedChannel == 0) &&
                <Card key={i} sx={{ margin: "10px", background: c.images.s ? `url(${c.images.s})` : c.color, backgroundSize: "cover", backgroundPosition: "center" }} >
                    <CardActionArea component={Link} to={`/${c.slug}`}>
                        <CardContent style={{ height: "150px", color: "#ffffff", background: "rgba(0,0,0,0.8)" }}>
                            {c.images.xs && <img src={c.images.xs} alt={c.title} height="40px" style={{ filter: "drop-shadow(0px 0px 14px " + c.color + ")" }} />}
                            <Typography variant="b" component="h3" style={{ filter: "drop-shadow(0px 0px 14px " + c.color + ")" }}>
                                {c.title}
                            </Typography>
                            <Typography variant="body2" sx={{
                                pt: 1,
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                            }} className="low" >
                                {c.excerpt}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </div>
    )
}