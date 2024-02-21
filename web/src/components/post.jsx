import React from 'react';
import { TheHtml } from '../utils/html';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../routes';

const { Meta } = Card;
export function PostThumbnail({ data }) {
    const p = data;
    const img = p._embedded &&
        p._embedded['wp:featuredmedia'] ?
        p._embedded['wp:featuredmedia'][0].media_details && p._embedded['wp:featuredmedia'][0].media_details.sizes ?
            p._embedded['wp:featuredmedia'][0].media_details.sizes.medium ? p._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url
                :
                p._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large ? p._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url
                    :
                    p._embedded['wp:featuredmedia'][0].media_details.sizes.full ? p._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url
                        : false
            : false
        : false
    return (
        <Link to={APP_ROUTES.CHANNEL_ID(p.id)} style={{ display: "block", width: '100%' }}>

            <Card
                hoverable
                cover={img && <img alt="example" src={img} />}
            >
                {/* <Meta title={TheHtml(p.title.rendered)} description={<Typography.Text>{TheHtml(p.excerpt.rendered)}</Typography.Text>} /> */}
                <Typography.Title level={5} style={{ margin: 0 }}>{p.title.rendered}</Typography.Title>
                <Typography.Paragraph ellipsis={{ rows: img ? 3 : 6 }} type='secondery'>{TheHtml(p.excerpt.rendered)}</Typography.Paragraph>
            </Card>
        </Link>
    );
}
