import React from "react";
import LandingPageIcons from "./LandingPageIcons";
import LandingPageLatest from "./LandingPageLatest";
import LandingPagePopular from "./LandingPagePopular";
import '../../css/landingPage/landingPage.css';
import { useHistory } from "react-router-dom";
import LandingPageCreateAccount from "./LandingPageCreateAccount";
import whyTriphikersImg from '../../images/whyTriphikersImg.jpg';

const LandingPageAbout = () => {
    const history = useHistory();
 
    const redirect = () => {
      history.push("/signUp");
    }
    
    return (
        <>
        <section className="lp-top">

            <h1>FIND YOUR TRAVEL PARTNERS FOR LIFE</h1>
        
            <LandingPageIcons redirect={redirect} />

            <section className="lp-buttons">
                <LandingPageCreateAccount redirect={redirect} />

                <button onClick={() => history.push("/signIn")}>
                    LOGIN
                </button>
            </section>

        </section>

        <section className="lp-middle"> 
            <div className="lp-middleBground"></div>
            <h1>WHY TRIPHIKERS IS THE BEST PLACE TO FIND TRAVEL PARTNERS?</h1>
            <section>
                <img src={whyTriphikersImg} alt="Friends Traveling" />
                <article>
                    <p>
                        Triphikers is the place to go to find like-minded travelers to share lasting memories with. You can find people in a city you are currently in or that you're 
                        planning to travel to. Browse through trips posted by other users so you can find your perfect partner. 
                    </p>

                    <p>
                        We pride ourselves on our safety while not forcing you to pay a premium price to have access to all of our features. Making the search for your travel buddy 
                        that much easier. Allowing you to find your partner as quickly and smoothly as possible is our goal.
                    </p>
                </article>
            </section>
            <LandingPageCreateAccount redirect={redirect} />
        </section>
                
        <section className="lp-bottom">
            <div className="lp-bottomBground"></div>
            <LandingPageLatest />

            <button onClick={redirect}>See More Trips</button>

            <LandingPagePopular />
        </section>
        </>
    )
}

export default LandingPageAbout;