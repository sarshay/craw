import React, { useEffect, useRef, useState } from 'react';
import { useApi } from '../../hooks/api';
import { Spin } from 'antd';
import { API_ROUTES, APP_ROUTES } from '../../routes';
import { Link } from 'react-router-dom';
import { useMyList } from '../../providers/context';

const TVChannel = () => {
    const { tv, tv_loading } = useMyList();

    return (
        <div>
            {
                tv_loading && <Spin />
            }
            <div className='m-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 min-h-96'>
                {
                    tv?.map((t, i) => (
                        <Link to={APP_ROUTES.TV(i)} style={{ color: t.licenseType == null ? 'auto' : 'red' }}>{i + 1} - {t.title}</Link>
                    ))
                }
            </div>

        </div>
    )
};

export default TVChannel;
