const app = require("express")();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const { checkFirebaseToken } = require("./midleware/auth");

const PORT = process.env.PORT;

const usersRouter = require("./routes/users/users");
const postsRouter = require("./routes/posts/posts");
const tripsRouter = require("./routes/trips/trips");
const locationsRouter = require("./routes/locations/location");
const mapsRouter = require("./routes/apiCalls/maps");

app.use("/api/maps", mapsRouter);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);
app.use("/api/trips", tripsRouter);
app.use("/api/locations", locationsRouter);

app.use((error, req, res, next) => {
    console.log(error);
    if(error.status) {
        res.status(error.status).json(error);
    } else {
        res.status(500).json(error);
    }
});

app.get("*", (req, res, next) => {
    res.status(404).json({
        status: 404,
        error: "No route found."
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on Port: ${PORT}`)
})