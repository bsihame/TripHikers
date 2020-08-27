import React, { useState, useEffect} from "react";
import PopulateLocationSelect from "../helper/populateLocationSelect";
import axios from "axios";
import "../../css/LocationSearch.css";
import CreateTripCitySearch from "./CreateTripCitySearch";
import { useLoadScript } from "@react-google-maps/api";

const {
    REACT_APP_GOOGLEAPIKEY
} = process.env;
const libraries = ["places"];

const CreateTripDestination = ({ destination }) => {
    const { setDestination } = destination;
    const [allCountries, setAllCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: REACT_APP_GOOGLEAPIKEY,
        libraries,
    });

    useEffect(() => {
        if(destination.destination) debugger;
    }, [destination.destination]);

    const fetchFilters = async () => {
        try {
            let countries = await axios.get(`https://restcountries.eu/rest/v2/all`);
            setAllCountries(countries.data);
        } catch (error) {
            console.log(error);
        }
    }

    const filterCity = (e) => {
        e.preventDefault();
        setSelectedCountry(e.target.value);
    }
    
    useEffect(() => {
        fetchFilters();
    }, []);

    return (
        <section className="ct-destination">
            <label>
                <p>Select a Country: (optional filter) </p>
                <select onChange={filterCity} defaultValue="">
                    <option value="" disabled>Select a Country</option>
                    <PopulateLocationSelect list={allCountries}/>
                </select>
            </label>

            { isLoaded ? 
                <CreateTripCitySearch selectedCountry={selectedCountry} destinatoin={destination.destination} setDestination={setDestination} /> :
                null
            }
        </section>
    )
}

export default CreateTripDestination;