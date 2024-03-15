import { CloseCircleFilled, CloseCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';

function MyPlayer({ medias, title }) {
    const [selected, setSelected] = useState(null)
    const [isFull, setIsFull] = useState(false)
    useEffect(() => {
        if (!selected && medias?.length > 0) {
            if (medias[0]?.attributes?.src) {
                setSelected(medias[0].attributes)
            } else {
                setSelected(medias[0].sources[0])
            }

        }
        // console.log({ medias })
    }, [medias])
    return (selected && <div className={` bg-black/80 backdrop-blur-lg text-white fixed top-12 right-0 ${isFull ? `py-2 w-full h-auto` : `w-32 h-16`} z-[1010]`} onClick={() => { !isFull && setIsFull(true) }}>
        {isFull && <Flex justify='flex-end' align='center' gap={16} className='px-2'>
            <MinusCircleOutlined onClick={() => setIsFull(false)} />
            <CloseCircleOutlined onClick={() => setSelected(null)} />
        </Flex>}
        <ReactPlayer autoplay width='100%' height={isFull ? '60vmin' : 'auto'} controls={isFull} url={selected.src} />
        {isFull && <div className='text-center'>{title}</div>}
    </div>
    );
}

export default MyPlayer;