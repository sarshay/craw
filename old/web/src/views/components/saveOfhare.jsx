import { BookmarkAdd, Share } from '@mui/icons-material';
import { Button, IconButton } from '@mui/material';
import React from 'react';

export default function MyShare(props) {
  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: props.title,
          text: props.text,
          url: props.url,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch(error => {
          console.error('Something went wrong sharing the blog', error);
        });
    }
  };
  return (
    <IconButton onClick={handleOnClick} >
      <Share />
    </IconButton>
  );
}


export function MySave(props) {
  const handleOnClick = () => {
    alert("နောက် version တွင်ပါမည်")
  };
  return (
    <Button size="small" startIcon={<BookmarkAdd />} onClick={handleOnClick} >
      Save
    </Button>
  );
}
