import React from "react";
import "./App.css";
import TripsPage from "./components/TripsPage/TripsPage";
import { Switch, Route } from "react-router-dom";
import CreateTripsContainer from "./components/CreateTrip/CreateTripContainer";
import DetailedTripPage from "./components/DetaliedTripPage/DetailedTripPage";
import LandingPage from "./components/LandingPage/LandingPage";
// import LandingPageNav from "./components/LandingPage/LandingPageNav";
import CreateSignUpContainer from "./components/Login/SignUpContainer";
import LocationPage from "./components/Location/LocationPage"
import Login	from "./components/Login/Login"
import UserPage from "./components/User/UserPage";
import NavBar from "./components/General/NavBar";
import { AuthRoute, ProtectedRoute } from "./util/routesUtil";
import LandingPageNav from "./components/LandingPage/LandingPageNav";


function App() {
	const displayMainNav = () => {
		if(window.location.pathname.includes("/trips" ) || window.location.pathname === "/user") {
			return (
				<NavBar />
			)
		} else {
			return (
				<LandingPageNav />
			)
		}
	}
	
	return (
		<div className="App">
			{displayMainNav()}
			<Switch>
				<AuthRoute exact path="/">
					<LandingPage />
				</AuthRoute>

				<AuthRoute path="/signUp" >
					<CreateSignUpContainer />
				</AuthRoute>

				<AuthRoute path="/signIn" >
					<Login />
				</AuthRoute>
				
				<ProtectedRoute path="/user" >
					<UserPage />
				</ProtectedRoute>
				
				<ProtectedRoute exact path="/trips">
					<TripsPage />
				</ProtectedRoute>

				<ProtectedRoute path="/trips/create">
					<CreateTripsContainer />
				</ProtectedRoute>

				<ProtectedRoute path="/trips/:id">
					<DetailedTripPage />
				</ProtectedRoute>
				
				<ProtectedRoute path="/location/:locationId">
				<LocationPage/>
				</ProtectedRoute>
			</Switch>
		</div>
	);
}

export default App;
