import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { JSONTree } from 'react-json-tree';
import { useCookies } from 'react-cookie';
import { checkGeolocationPermission, getUserGeolocation } from './location';

import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { API_ROUTES } from '../../routes';
import { Spin } from 'antd';
function TargetPage(props) {
    const { linkId } = useParams()
    const [searchParams] = useSearchParams();
    const fullUrl = window.location.href;
    const tag = searchParams.get('t')
    const permision = searchParams.get('p')
    const [cookies, setCookie] = useCookies(["user_id"]);
    const userId = cookies?.user_id;
    const [isNewUser, setIsNewUser] = useState(false)
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const screenResolution = `${window.screen.width}x${window.screen.height}`
    const [location, setLocation] = useState('notset')

    const [notFound, setNotFound] = useState(false)
    useEffect(() => {
        if (!userId) {
            setIsNewUser(true)
            setCookie('user_id', uuidv4(), { path: '/' })
        }
    }, [userId])

    useEffect(() => {
        checkGeolocationPermission()
            .then(async (permissionState) => {
                if (permissionState === "granted") {
                    await getUserGeolocation().then((l) => {
                        setLocation(l)
                    })
                } else {
                    if (permision?.split(',').includes('l')) {
                        await getUserGeolocation().then((l) => {
                            setLocation(l)
                        }).catch((e) => {
                            setLocation(null)
                        })
                    } else {
                        setLocation(null)
                    }
                }
            })
            .catch((error) => {
                console.log({ error })
            });
    }, [])

    const navigate = useNavigate();
    var option = {
        url: API_ROUTES.VISITOR_REPORT,
        method: "POST",
        data: {
            linkId,
            fullUrl,
            tag,
            permision,
            userId,
            isNewUser,
            timeZone,
            screenResolution,
            lla: location && `${location?.latitude},${location?.longitude},${location?.accuracy}`,
        },
        headers: {
            "Content-type": "application/x-www-form-urlencoded", // Set content type to JSON
        },
        withCredentials: true,
    };
    useEffect(() => {
        if (location !== 'notset') {
            axios(option)
                .then(function (response) {
                    if (response.data) {
                        if (permision?.split(',').includes('l')) {
                            if (location) { window.location.href = response?.data?.trueUrl; }
                            else {
                                alert('need yo allow permision')
                            }
                        } else {
                            window.location.href = response?.data?.trueUrl;
                        }
                    } else {
                        setNotFound(true)
                    }
                })
                .catch((err) => { });
        }
    }, [location])
    return (
        <div className='h-screen flex items-center justify-center'>
            {notFound ? 'Not Found' : <Spin/>}
        </div>
    );
}

export default TargetPage;