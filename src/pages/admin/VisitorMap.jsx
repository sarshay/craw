import React, { useMemo, useState } from 'react';
import { useApi } from '../../hooks/api';
import { API_ROUTES } from '../../routes';
import { JSONTree } from 'react-json-tree';
import { Col, List, Row, Table } from 'antd';
import { FileMarkdownFilled } from '@ant-design/icons';
import MyMap from '../../components/map';
import dayjs from 'dayjs';
import { ago } from '../../utils/time';


function VisitorMap(props) {
    const { loading, error, data } = useApi(API_ROUTES.VISITOR_REPORT)
    const columns = useMemo(() => {
        return data ? Object.entries(data[0]).map(([key, val]) => {
            return { dataIndex: key, title: key };
        }) : []
    }, [data])
    const [selected, setSelected] = useState(null)
    const sourse = data?.map(d => {
        const userLoc = d.lla.split(',');
        return {
            ...d,
            latitude: userLoc[0],
            longitude: userLoc[1]
        }
    })
    // Using map() to loop over the array of key-value pairs

    return (
        <Row>
            <Col span='18' className='h-screen'>
                <MyMap
                    selected={selected}
                    setSelected={setSelected}
                    list={sourse} />
            </Col>
            {/* <JSONTree data={selected}/> */}
            <Col span={6}>
                <List loading={loading} header={<div className='px-4'>Visitor</div>}>
                    {sourse?.map(v => <List.Item
                        className={v.id == selected?.id ? "bg-blue-500/20" : ""}
                        onClick={() => setSelected({ ...v, zoom: 13 })}
                        key={v.id}>
                        <div className='px-4'>
                            {ago(v.create_time)} ago
                            <span className='px-2 opacity-50'>{dayjs(v.create_time).format('YYYY-MM-DD hh:mm:ss')}</span>
                            <div>{v.userId}</div>
                        </div>
                    </List.Item>)}
                </List>
            </Col>
        </Row>
    );
}

export default VisitorMap;