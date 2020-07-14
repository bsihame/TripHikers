import React, { useState } from "react";
import axios from "axios";
import { useInput } from "../../util/customHooks";
import HotspotMap from "../helper/maps/HotspotMaps";
import "../../css/locations/LocationHotspots.css";

const LocationHotspots = ({info}) => {
    const [submitCoordinates, setSubmitCoordinates] = useState([]);
    const [selectedHotspot, setSelectedHotspot] = useState(null);
    const [submitted, setSubmitted] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const submitHotspotTitle = useInput("");
    const submitHotspotBody = useInput("");

    const fetchData = (data) => {
        setSubmitCoordinates(data.coordinates);
        setSelectedHotspot(data.selected);
    }

    const getMap = (lat, lng) => {
        if(lat !== undefined){
            let coordinates = {
                lat: parseFloat(lat),
                lng: parseFloat(lng)
            }
            return(
                <HotspotMap location={coordinates} fetchData={fetchData}/>
            )
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3001/api/hotspots`, {
                lat: submitCoordinates.lat,
                lng: submitCoordinates.lng,
                hotspot_title: submitHotspotTitle.value,
                body: submitHotspotBody.value,
                image: imageFile,
                poster_id: 1
            })
            setSubmitCoordinates([]);
            submitHotspotTitle.setValue("");
            submitHotspotBody.setValue("");
            setSubmitted(true);
        } catch (error) {
            console.log(error)
        }
    }

    const handleFileChange = (e) => {
        debugger
        e.preventDefault();
        setImageFile({ selectedFile: e.target.files[0] })
    }

    //coming back to this, may directly upload image without submission button
    // const uploadHandler = async () => {
    //     try {
    //        await 
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <div className="hotSpotContainer">
            <div className="hotSpotMap">
                {getMap(info.lat, info.lng)}
            </div>
            <div className="formWithSelect">
                <form className="hotSpotForm" onSubmit={handleSubmit}>
                    <h1 className="hotSpotTitle">Hotspot Submission</h1>
                    <p className="submitLat"><b>Latitude:</b> {submitCoordinates.lat}</p>
                    <p className="submitLng"><b>Longitude:</b> {submitCoordinates.lng}</p>
                    <input type="text" placeholder="Hotspot Title" {...submitHotspotTitle}/>
                    <input type="text" placeholder="Type a Description" {...submitHotspotBody}/>
                    {/* <input type="file" onChange={handleFileChange}/> */}
                    {/* <button onClick={uploadHandler}>Upload!</button> */}
                    <input type="submit"/>
                    {submitted ? (
                        <p className="success">Submission Complete</p>
                    ): null}
                </form>
                {selectedHotspot ? (
                    <div className="Selected">
                        <h1 className="hotSpotSelectedTitle">Selected Hotspot</h1>
                        <p className="submitLat"><b>Latitude:</b> {selectedHotspot.lat}</p>
                        <p className="submitLat"><b>Longitude:</b> {selectedHotspot.lng}</p>
                        <h2><b>Title:</b> {selectedHotspot.hotspot_title}</h2>
                        <p><b>Description:</b> {selectedHotspot.body}</p>
                        <p><b>Submitted By:</b> {selectedHotspot.poster_id}</p>
                    </div>
                ) : null}
            </div>
        </div>
    )
}

export default LocationHotspots;