import { Button, Card, Col, Divider, Image, Input, List, Row, Spin } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { APP_ROUTES } from '../../routes';
import { useApi } from '../../hooks/api';
import { WPForm } from './website';
import { useLayout, useMyList } from '../../providers/context';
import { makeFresh } from '../../utils/function';
import wpScan from '../../utils/wpScan';
import { Meta } from 'antd/es/list/Item';
import { useAdminLayout } from './layout.office';

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

    const { messageAPi } = useAdminLayout();
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
    // const { data, loading, error } = useApi(`${wpUrl}/?rest_route=/`, { _fields: `${infoKeyList.join(',')}` })

    const wp = wpScan({ wpUrl });
    const [wpInfo, setWpInfo] = useState(null);
    const [wpError, setWpError] = useState(null);
    const [wpCategory, setWpCategory] = useState(null);
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(false)
    const [loadingCat, setLoadingCat] = useState(false)
    useEffect(() => {
        const fetchData = () => {
            setLoading(true)
            setWpInfo(null)
            setWpError(null)
            wp.getInfo().then((data) => {
                setWpInfo(data);
                messageAPi.success(`${data.url} - ${data.name} is loaded.`);
            }).catch((error) => {
                messageAPi.error(error?.message);
                setWpError(error?.message)
            }).finally(() => {
                setLoading(false)
            });
        };
        fetchData()
    }, [wpUrl]);

    const getCategory = () => {
        setLoadingCat(true)
        setWpCategory(null)
        wp.getCategory()
            .then((data) => {
                setWpCategory(data);
                messageAPi.success(`${wpUrl} - Categories are loaded.`);
            }).catch((error) => {
                messageAPi.error(error?.message);
            }).finally(() => {
                setLoadingCat(false)
            });
    };
    const old = (website || []).find(x => x.url == wpInfo?.url)
    const openForm = (data) => {
        if (old) {
            data.id = old.id
        }
        const merged = { ...old };
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                if (data[key] !== null && data[key] !== undefined) {
                    merged[key] = data[key];
                }
            }
        }
        setSelected(merged)
    }
    return (
        <>
            <WPForm selected={selected} setSelected={setSelected} websites={website} setData={setWebsite} />
            {wpError && <Card>
                {wpError}
            </Card>}
            {wpInfo && <Row gutter={[16, 16]}>
                <Col span={6}>
                    {loading && <Spin />}
                    <Card
                        hoverable
                        cover={<Image alt="example" src={wpInfo.site_icon_url} height={200} />}
                        actions={[
                            <Button onClick={() => openForm(wpInfo)}>{old ? "Update" : "Add"} This WP</Button>
                        ]}
                    >
                        <Meta title={wpInfo.name} description={wpInfo.url} />
                    </Card>
                </Col>
                {/* {wpInfo && <List>
                {infoKeyList.map(l => (
                    <List.Item key={l}>
                        {l == 'site_icon_url' ? <Image src={wpInfo[l]} height={100} /> :
                            wpInfo[l]}
                    </List.Item>
                ))}
                <List.Item>
                    <Button onClick={() => openForm(wpInfo)}>{old ? "Update" : "Add"} This WP</Button>
                </List.Item>
            </List>} */}
                <Col span={6}>
                    <Card hoverable>
                        {loadingCat && <Spin />}
                        {wpCategory
                            ?
                            <List>
                                {(wpCategory || []).map(cat => (
                                    <List.Item key={cat.id}>
                                        {cat.name} ({cat.count} post)
                                    </List.Item>
                                ))}
                            </List>
                            :
                            <div onClick={getCategory}>load Category</div>
                        }
                    </Card>
                </Col>
            </Row>}
        </>)
}