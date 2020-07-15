import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];
const mapContainerStyle = {
    width: "50vw",
    height: "45vh",
}

const HotspotMap = ({ location, fetchData, allMarkers }) => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [epicenter, setEpicenter] = useState(location);
    const [zoom, setZoom] = useState(11);

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
        libraries,
    });

    useEffect(() => {
        if(markers.length === undefined || selected !== null ) {
            fetchData({
                coordinates: markers,
                selected: selected
            });
        }
    }, [markers, selected])
    
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
            <h1 className="mapTitle">Hotspots <span role="img" aria-label="pin">📍</span></h1>
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={epicenter} onClick={(e) => {setMarkers({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })}}>

                {allMarkers.map((marker) => (
                    <Marker key={marker.id} position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }} onClick={() => {setSelected(marker); setEpicenter({lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}); setZoom(16)}}/>
                ))}

                <Marker position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}/>
            </GoogleMap>
        </div>
    )
}

export default HotspotMap;