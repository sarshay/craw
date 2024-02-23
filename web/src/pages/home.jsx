import React, { useState } from 'react';
import { useMyList } from '../providers/context';
import { Avatar, Flex, List, Space, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import Search from 'antd/es/input/Search';

function HomePage(props) {
    const { website } = useMyList()
    const [search, setSearch] = useState(null)
    function searchArray(array, propertyName, searchValue) {
        return array.filter(item => item[propertyName].toLowerCase().includes(searchValue.toLowerCase()));
    }
    return (
        <List
            header={<div className='px-4'><Search value={search} placeholder='Search' onChange={(e) => setSearch(e.target.value)} /></div>}
            // footer={<div>Footer</div>}
            // bordered
            dataSource={search ? searchArray(website, 'name', search) : website || []}
            renderItem={(w) => (
                <List.Item key={w.id} style={{ borderRight: `8px solid hsl(${w.color_hue}deg, 70%, 50%)` }}>
                    <Link to={APP_ROUTES.CHANNEL_ID(w.id)} style={{ display: "block", width: '100%' }}>
                        <Flex justify='space-between' className='p-4'>
                            <div>
                                <Typography.Title level={5} style={{ margin: 0 }}>{w.name}</Typography.Title>
                                <Typography.Text type='secondery'>{w.url}</Typography.Text>
                            </div>
                            {w.site_icon_url && <Avatar src={<img src={w.site_icon_url} />} />}
                        </Flex>
                    </Link>
                </List.Item>
            )}
        />
    );
}

export default HomePage;