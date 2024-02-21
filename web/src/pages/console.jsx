import { Button, Divider, Image, Input, List, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import { useApi } from '../hooks/api';
import { WPForm } from './website';
import { useMyList } from '../providers/context';
import { makeFresh } from '../utils/function';

function ConsolePage(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const wpUrl = searchParams.get("wpUrl")
    const [url, setUrl] = useState(wpUrl);
    useEffect(() => {
        if (wpUrl) { setUrl(wpUrl) }
    }, [wpUrl])
    const navigate = useNavigate();
    return (
        <div>
            <Search value={url} onSearch={() => navigate(APP_ROUTES.SCAN_WP(url))} onChange={(e) => setUrl(e.target.value)} placeholder="Wp Url" loading={false} enterButton />
            <Divider />
            {wpUrl && <WpScanPage wpUrl={wpUrl} />}
        </div>
    );
}

export default ConsolePage;
export function WpScanPage({ wpUrl }) {
    const { website, setWebsite } = useMyList()
    const infoKeyList = [
        "site_icon_url",
        "name",
        "description",
        "url",
        "home",
        "site_logo",
    ]
    // const { data, loading, error } = useApi(`${wpUrl}/wp-json`, { _fields: `${infoKeyList.join(',')}` })
    const { data, loading, error } = useApi(`${wpUrl}/?rest_route=/`, { _fields: `${infoKeyList.join(',')}` })
    const [selected, setSelected] = useState(null)

    const old = website.find(x => x.url == data?.url)
    const openForm = (data) => {
        if (old) {
            data.id = old.id
        }
        setSelected({ ...old, ...data })
    }
    return (
        <>

            <WPForm selected={selected} setSelected={setSelected} websites={website} setData={setWebsite} />
            {error?.message}
            {loading && <Spin />}
            {data && <List>
                {infoKeyList.map(l => (
                    <List.Item key={l}>
                        {l == 'site_icon_url' ? <Image src={data[l]} height={100} /> :
                            data[l]}
                    </List.Item>
                ))}
                <List.Item>
                    <Button onClick={() => openForm(data)}>{old ? "Update" : "Add"} This WP</Button>
                </List.Item>
            </List>}
        </>)
}