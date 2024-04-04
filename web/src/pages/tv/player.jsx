import React, { useEffect, useRef, useState } from 'react';
import { useMyList } from '../../providers/context';
import { useParams } from 'react-router-dom';
import { JSONTree } from 'react-json-tree';

const TVPlayer = () => {

    const { tv, tv_loading } = useMyList();
    let { tvIndex } = useParams();
    const theTV = tv[tvIndex];
    const videoRef = useRef(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const handleVideoClick = () => {
        handleFullScreenToggle();
    };

    const handleFullScreenToggle = () => {
        const video = videoRef.current;
        if (video) {
            if (!isFullScreen) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) { /* Safari */
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) { /* IE11 */
                    video.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) { /* Safari */
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) { /* IE11 */
                    document.msExitFullscreen();
                }
            }
            setIsFullScreen(!isFullScreen);
        }
    };
    useEffect(() => {
        const video = videoRef.current;
        let hls;

        const loadVideo = async () => {
            if (await window.Hls?.isSupported()) {
                hls = new window.Hls();
                hls.loadSource(theTV.url);
                hls.attachMedia(video);
            } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                console.warn("not subbort")
                video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
            }

            // Autoplay the video
            video.muted = false; // Mute to satisfy autoplay restrictions
            video.play().catch(error => {
                console.error('Play failed:', error);
            });
        };

        if (theTV) {
            loadVideo();
        } else {
            console.log('close')
        }

        return () => {
            if (video) {
                // Pause the video playback
                video.pause();

                // Remove the video source
                video.removeAttribute('src');

                // Destroy the HLS instance
                if (hls) {
                    hls.destroy();
                }
            }
        };
    }, [theTV]);

    return (
        <div>
            <video
                ref={videoRef}
                width="100%"
                height="auto"
                onDoubleClick={handleVideoClick}
                controls={false}
            ></video>
            <JSONTree data={theTV} />
        </div>
    );
};

export default TVPlayer;
