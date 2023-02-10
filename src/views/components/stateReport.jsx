import { Box, CircularProgress, Skeleton } from '@mui/material';
import React from 'react';
import { headTagMaker } from '../../services/document';
import SignalWifiStatusbarConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiStatusbarConnectedNoInternet4';

export function Loading(props) {

    {
        switch (props.mode) {
            case "card":
                return (
                    <React.Fragment>
                        <Skeleton variant="rectangular" height={props.height || 118} />
                        <Skeleton />
                        <Skeleton height={40} />
                        <Skeleton />
                    </React.Fragment>
                )
                break;
            default:
                return (
                    <div style={props.fullScreen ? { position: "fixed", top: "0", bottom: '0', left: '0', right: '0', background: "rgba(255,255,255,0.7)", display: 'flex', justifyContent: 'center', alignItems: "center", zIndex: 9999 } : {}}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", height: props.height && props.height }}>
                            <CircularProgress />
                        </Box>
                    </div>)
                break;
        }
    }
}
// <div class="blink">Loading...</div>
{/* */ }
export function Error(error) {
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }} >
                <div>
                    <h3>error code : {error.response.status}</h3>
                    {error.response.data.message}
                </div>
            </Box>
        );
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: "center", my: 4, color: "#ff0000" }} >
                <SignalWifiStatusbarConnectedNoInternet4Icon />
                Network Error..
            </Box>
        );
    } else {
        console.log(error);
        // Something happened in setting up the request that triggered an Error
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4, color: "#ff0000" }} >
                <div >{error.message || 'Error...'} </div>
            </Box>
        );
    }
    console.log(error.config);
}
