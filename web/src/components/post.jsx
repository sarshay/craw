import React from 'react';
import { TheHtml } from '../utils/html';
import { Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../routes';
import { ago } from '../utils/time';
import { useTheme } from '../providers/context';

export const findImage = (p, baseUrl) => {

    var img = p?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium?.source_url
        || p?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url
        || p?._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.full?.source_url;
    return img && (img.startsWith('http') ? img : `${baseUrl}${img}`)

}
export function PostThumbnail({ data, wpInfo, type }) {

    const { hue } = useTheme()
    const p = data;
    var img = findImage(p, wpInfo?.url)
    switch (type) {
        case "poster":
            return (
                <div
                    style={{ backgroundColor: `hsl(${hue}deg, 40%, 30%)`, backgroundImage: `url('${img}')` }}
                    className='hover:shadow-xl h-80 border bg-cover bg-center flex flex-col justify-end'
                >
                    <div className={`p-4 ${!img && "pt-16"} text-white`} style={{ background: `linear-gradient(to top, hsl(${hue}deg, 40%, 20%) , transparent)` }}>
                        {ago(p.date)}

                        <Typography.Paragraph ellipsis={{ rows: img ? 4 : 7 }} style={{ color: "#ffffff77" }} type='secondery'>
                            <Typography.Title level={img ? 4 : 3} style={{ margin: 0, color: 'white' }}>{TheHtml(p.title.rendered)}</Typography.Title>
                            {TheHtml(p.excerpt.rendered)}</Typography.Paragraph>
                    </div>
                </div>)

        default:
            return (
                <Card
                    hoverable
                    cover={img && <img alt="example" src={img} height={260} style={{ objectFit: 'cover' }} />}
                >
                    {/* <Meta title={TheHtml(p.title.rendered)} description={<Typography.Text>{TheHtml(p.excerpt.rendered)}</Typography.Text>} /> */}
                    <Typography.Title level={img ? 4 : 1} style={{ margin: 0 }}>{TheHtml(p.title.rendered)}</Typography.Title>
                    {ago(p.date)}
                    <Typography.Paragraph ellipsis={{ rows: img ? 2 : 7 }} type='secondery'>{TheHtml(p.excerpt.rendered)}</Typography.Paragraph>
                </Card>)
    }
}