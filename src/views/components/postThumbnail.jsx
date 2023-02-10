import { BookmarkAdd, Save, Share } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { TheHtml } from '../../services';
import { DateTime } from './date';
import MyShare, { MySave } from './saveOfhare';

function PostThumbnail(p) {
    // console.log(p.title.rendered)
    // console.log(p.cats)
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
        <Card>
            <CardActionArea to={p.link} component={Link}>
                {
                    img ?
                        <div><CardMedia
                            component="img"
                            height="180"
                            image={img}
                            alt="green iguana"
                        />
                            <div style={{ marginTop: "-40px", padding: "10px", color: "#ffffff" }}>{p.cats && p.cats.map((c) => (
                                c !== undefined && <i> {c.name} </i>
                            ))}</div>
                        </div>
                        : ""

                }
                <CardContent>
                    <Typography component="h3" >
                        <b>{TheHtml(p.title.rendered)}</b>
                    </Typography>
                    {!img &&
                        p.cats && p.cats.map((c) => (
                            c !== undefined && <i> {c.name} </i>
                        ))}
                    <div>{DateTime(Date.parse(p.date))}</div>
                    {!img &&
                        <Typography variant="body2" className='low'
                            sx={{
                                display: '-webkit-box',
                                overflow: 'hidden',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 4,
                            }}>
                            {TheHtml(p.excerpt.rendered)}
                        </Typography>
                    }


                </CardContent>
            </CardActionArea>
            <CardActions sx={{ display: "flex" }}>
                <MySave />
                <div style={{ flex: 1 }} />
                {/* <FbLike href={`${info.home_url}${match.url}`} share /> */}
                <MyShare title={p.title && p.title.rendered} text={p.excerpt && p.excerpt.rendered} url={`${p.link}`} />
            </CardActions>
        </Card>
    );
}

export default PostThumbnail;