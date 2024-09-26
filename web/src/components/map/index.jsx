import { useState, useMemo, useRef, useEffect } from 'react';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';

import Pin from './pin';


const TOKEN = 'pk.eyJ1IjoiaGhlaW5zb2VlIiwiYSI6ImNsMTYwaWN2NTAybncza3BrYWF2Y2F2eXEifQ.f_dSMHMhgOKK4KKXEX--3Q'; // Set your mapbox token here

export default function MyMap({ list = [], selected, setSelected, longitude = 96.17408, latitude = 16.8198144, zoom = 5.5 }) {
    const pins = useMemo(
        () =>
            list.map((l, i) => (
                <Marker
                    key={`marker-${i}`}
                    longitude={l.longitude}
                    latitude={l.latitude}
                    anchor="bottom"
                    onClick={e => {
                        e.originalEvent.stopPropagation();
                        setSelected(l)
                    }}
                >
                    <Pin />
                </Marker >
            )),
        [list]
    );

    const mapRef = useRef();
    useEffect(() => {
        if (selected) { mapRef.current?.flyTo({ center: [selected.longitude, selected.latitude], zoom: 13, duration: 2000 }) };
    }, [selected])
    useEffect(() => {
        mapRef.current?.flyTo({ center: [longitude, latitude], zoom: zoom, duration: 2000 });
    }, [latitude, longitude, zoom]);
    return (
        <>
            <Map
                ref={mapRef}
                initialViewState={{
                    latitude: latitude,
                    longitude: longitude,
                    zoom: zoom,
                    bearing: 0,
                    pitch: 0
                }}
                mapStyle="mapbox://styles/mapbox/dark-v9"
                mapboxAccessToken={TOKEN}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />

                {pins}

                {selected && (
                    <Popup
                        anchor="top"
                        longitude={Number(selected.longitude)}
                        latitude={Number(selected.latitude)}
                        onClose={() => setSelected(null)}
                    >
                        <div className='text-black'>
                            {selected.userId}
                        </div>
                        <img width="100%" src={selected.image} />
                    </Popup>
                )}
            </Map>

        </>
    );
}