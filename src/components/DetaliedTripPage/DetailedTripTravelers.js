import React, { useState, useEffect } from 'react';
import { getTripTravelers } from '../../util/apiCalls/getRequests';
import '../../css/detailedTripPage/detailedTripTravelers.css';
import { Link } from 'react-router-dom';

const DetailedTripTravelers = ({ trip = {} }) => {
    const [ travelers, setTravelers ] = useState([]);
    
    const getTravelersCall = async () => {
        try {
            const data = await getTripTravelers(trip.id);
            if(data.travelers) {
                setTravelers(data.travelers);
            } else {
                setTravelers([]);
            }
        } catch ( error ) {
            setTravelers([]);
            console.log(error);
        }
    }

    useEffect(() => {
        getTravelersCall();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayHost = ( user ) => {
        return user.traveler_id === trip.planner_id ? (
            <p>HOST</p>
        ) : null;
    }

    let travelersList = travelers.map((user) => {
        return (
            <article className="travelersCard" key={user.id}>
                <section className="tc-info">
                    <img src={user.profile_picture} alt={user.full_name} />
                    <Link to={`/user/${user.traveler_id}`}>{user.full_name}</Link>
                </section>
                {displayHost(user)}
            </article>
        )
    })

    if(!travelersList.length) {
        travelersList = <p className="error">There are no travelers at this time.</p>
    }

    return (
        <section className="dt-travelers">
            {travelersList}
        </section>
    )
}

export default DetailedTripTravelers;