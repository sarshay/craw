import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory
} from "react-router-dom";
import { Box } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { IconButton, Paper, Typography } from '@mui/material';
import { ArrowBack, BookmarkAdd, Close, Share } from '@mui/icons-material';
import useCacheOrFatch from '../../services/cache';
import { Error, Loading } from './stateReport';
import { headTagMaker } from '../../services/document';
import { clearHtml, TheHtml, unescapeHTML } from '../../services';
import MyShare, { MySave } from './saveOfhare';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullPost(props) {
    let { postId } = useParams();

    const theme = useTheme();
    const { loading, error, data } = useCacheOrFatch(`basic`, `${props.channelData.channel_link}/?rest_route=/wp/v2/posts/${postId}&_fields=id,title,date,_links,content,&_embed=wp:featuredmedia`);

    let match = useRouteMatch();
    
    return (

        <React.Fragment>
            {loading && <Loading fullScreen />}
            {error && <Error />}
            {data &&
                <Paper className="read" style={{ maxWidth: '800px', margin: 'auto' }}>
                    <PopUp data={data} backUrl={props.backUrl} channelData={props.channelData} />
                </Paper>
            }
        </React.Fragment>

    );
}
function PopUp(props) {
    const history = useHistory();
    const [open, setOpen] = React.useState(true);
    const handleClose = () => {
        setOpen(false);
        history.goBack();
    };

    let match = useRouteMatch();
    {props.data.title && headTagMaker({
        title: props.data.title.rendered,
        description: props.data.content && props.data.content.rendered,
    })}
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            // scroll='body'
            fullScreen={true}
        >

            <Paper square sx={{ display: 'flex', alignItems: 'center', position: 'sticky', top: 0,bgcolor:props.channelData.color,color:"#ffffff" }}>
                <IconButton onClick={handleClose} variant="contained"><ArrowBack style={{color:"#ffffff"}} /></IconButton>
                <Box className="_nowrap">{props.data.title && props.data.title.rendered}</Box>
            </Paper>
            <div className='_read'>
                {
                    props.data._embedded && props.data._embedded['wp:featuredmedia'] && props.data._embedded['wp:featuredmedia'][0].media_details.sizes.large ?
                        <img
                            src={props.data._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url}
                            style={{ width: "100%" }} loading="lazy"
                        /> : ""
                }
                <DialogContent sx={{ p: 1 }}>
                    <Typography component="h2" variant='b'>{props.data.title && TheHtml(props.data.title.rendered)}</Typography>
                    {/* <FbLikeShare href={`${info.home_url}${match.url}`} /> */}
                    <div className='_read'>{props.data.content && TheHtml(props.data.content.rendered)}</div>
                </DialogContent>
            </div>
            <Paper sx={{ px: 2, position: 'sticky', bottom: 0, display: "flex" }}>
                <MySave />
                <div style={{ flex: 1 }} />
                {/* <FbLike href={`${info.home_url}${match.url}`} share /> */}
                <MyShare title={props.data.title && props.data.title.rendered} text={props.data.excerpt && props.data.excerpt.rendered} url={`${match.url}`} />
            </Paper>
        </Dialog >
    )
}