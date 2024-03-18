import React, { useState } from 'react';
import { useMyList } from '../providers/context';
import { Avatar, Flex, List, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { APP_ROUTES, IMG } from '../routes';
import Search from 'antd/es/input/Search';
import AdComponent from './../components/Ads'

function HomePage(props) {
    const { website: w, category } = useMyList()
    const website = w.map(web => {
        return {
            ...web,
            categories: web.category_ids?.split(',')?.map(c => {
                const cat = category.find(x => x.id == c)
                return cat
            })
        }
    })
    const [search, setSearch] = useState(null)
    function searchArray(array, propertyName, searchValue) {
        return array.filter(item => item[propertyName].toLowerCase().includes(searchValue.toLowerCase()));
    }
    return (
        <>
            <div className='p-4 sticky top-0 z-10'><Search value={search} placeholder='Search' onChange={(e) => setSearch(e.target.value)} /></div>
            <List
                // footer={<div>Footer</div>}
                // bordered
                dataSource={search ? searchArray(website, 'name', search) : website || []}
                renderItem={(w, i) => (
                    <>
                        <List.Item key={w.id} style={{ borderRight: `8px solid hsl(${w.color_hue}deg, 70%, 50%)` }}>
                            <Link to={APP_ROUTES.CHANNEL_ID(w.id)} style={{ display: "block", width: '100%' }}>
                                <Flex justify='space-between' className='p-4'>
                                    <div>
                                        <Typography.Title level={5} style={{ margin: 0 }}>{w.name} {w.is18Plus == 'yes' && <Tag color='#ff0000' bordered={false}>18+</Tag>}</Typography.Title>
                                        <Typography.Text type='secondery'>{w.url}</Typography.Text>
                                        <br />
                                        {
                                            w.categories?.map(c => <Tag>{c.name}</Tag>)
                                        }
                                    </div>
                                    {w.site_icon_url && <Avatar src={<img src={w.site_icon_url} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null; // prevents looping
                                        currentTarget.src = IMG.logo;
                                    }}
                                    />} />}
                                </Flex>
                            </Link>
                        </List.Item>
                    </>
                )}
            />
        </>
    );
}

export default HomePage;