import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
} from "react-router-dom";
import ScrollToTop, { useWindowSize } from '../services/document';
import NavTabs from '../views/components/nav/nav_m';
import Channels from '../views/channels';
import Channel from '../views/channel';
import { Paper } from '@mui/material';



export default function MyRouter(data) {
    const [width] = useWindowSize();
    // document.documentElement.style.setProperty('--height', width > 760 ? '0px' : '50px');
    return (
        <BrowserRouter>
            <ScrollToTop />
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <div className='main_body'>
                <Switch>
                    <Route path="/saved_posts" >
                        saved_posts
                    </Route>
                    <Route path="/:channelId" >
                        <Channel />
                    </Route>
                    <Route path="/" exact={true}>
                        <Channels />
                    </Route>
                </Switch>
            </div>
            {/* {width > 760 ?
                "nav"
                :
                <React.Fragment>
                    <div style={{padding:"50px"}}/>
                    <Paper className='nav_m' elevation={0} square>
                        <NavTabs data={navTabList} />
                    </Paper>
                </React.Fragment>
            } */}
        </BrowserRouter>
    );
}
const navTabList = [
    { to: "/", label: "Channels" },
    { to: "saved_posts", label: "Saved Post" }
];