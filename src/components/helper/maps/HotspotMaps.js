import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import HotspotIcon from '../../../images/Fire.png';

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];
const mapContainerStyle = {
    width: "60vw",
    height: "70vh",
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
        if(markers.length === undefined || selected !== null) {
            fetchData({
                coordinates: markers,
                selected: selected
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [markers, selected])

    const Locate = ({ setEpicenter, setZoom, setMarkers }) => {
        return(
            <div className="findMe" onClick={() => {
                navigator.geolocation.getCurrentPosition((position) => { setEpicenter({lat: position.coords.latitude, lng: position.coords.longitude})
                setMarkers({lat: position.coords.latitude, lng: position.coords.longitude})}, setZoom(14), () => null)
            }}>
                <p>Locate Me</p>
            </div>
        )
    }
    
    
    if(loadError) return "Error loading maps";
    if(!isLoaded) return "Loading maps";
    

    return(
        <div className="googleMaps">
            <GoogleMap mapContainerStyle={mapContainerStyle} zoom={zoom} center={epicenter} onClick={(e) => {setMarkers({
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
            })}}>
            <Locate className="findMeButton" setEpicenter={setEpicenter} setZoom={setZoom} setMarkers={setMarkers}/>

                {allMarkers.map((marker) => (
                    <Marker key={marker.id} position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }} icon={{url: `${HotspotIcon}`, scaledSize: new window.google.maps.Size(24, 24), origin: new window.google.maps.Point(0,0), anchor: new window.google.maps.Point(12,12)}} onClick={() => {setSelected(marker); setEpicenter({lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}); setZoom(16)}}/>
                ))}

                <Marker position={{ lat: parseFloat(markers.lat), lng: parseFloat(markers.lng) }}/>
            </GoogleMap>
        </div>
    )
}

export default HotspotMap;