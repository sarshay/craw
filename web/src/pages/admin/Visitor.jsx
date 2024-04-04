import React, { useMemo, useState } from 'react';
import { useApi } from '../../hooks/api';
import { API_ROUTES } from '../../routes';
import { JSONTree } from 'react-json-tree';
import { Button, Col, Flex, Row, Table } from 'antd';
import { FileMarkdownFilled } from '@ant-design/icons';
import MyMap from '../../components/map';
import { GrRefresh } from 'react-icons/gr';


function Visitor(props) {
    const { loading, error, data, refresh } = useApi(API_ROUTES.VISITOR_REPORT)
    const columns = useMemo(() => {
        return data ? Object.entries(data[0]).map(([key, val]) => {
            return { dataIndex: key, title: key };
        }) : []
    }, [data])
    const [selected, setSelected] = useState(null)
    const sourse = data?.map(d => {
        const userLoc = d.lla?.split(',');
        return {
            ...d,
            latitude: userLoc?.[0] || 0,
            longitude: userLoc?.[1] || 0
        }
    })
    // Using map() to loop over the array of key-value pairs

    return (
        <Table
            title={() => <Flex gap={8}><Button onClick={refresh} icon={<GrRefresh />} /></Flex>}
            loading={loading}
            rowClassName={(record) => {
                if (record.id == selected?.id) { return "bg-blue-500/20" }
            }}
            columns={columns}
            dataSource={sourse}
            onRow={(record, rowIndex) => {
                return {
                    onClick: (event) => setSelected({ ...record, zoom: 13 })
                    //   onDoubleClick: (event) => {}, // double click row
                    //   onContextMenu: (event) => {}, // right button click row
                    //   onMouseEnter: (event) => {}, // mouse enter row
                    //   onMouseLeave: (event) => {}, // mouse leave row
                };
            }}
        />
    );
}

export default Visitor;