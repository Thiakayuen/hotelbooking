const express = require("express");
const mysql = require("mysql");
const path = require("path");

const dbConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    port: 3307,
    database: "hotelBooking"
})

const app = express();

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({extended: true }));


app.get("/", (req, res) => {
    dbConnection.query("SELECT * FROM rooms", (roomSelectError, rooms) => {
        if(roomSelectError) {
            console.log(roomSelectError);
            
            res.status(500).send("Server Error: 500")
        } else {
            dbConnection.query("SELECT * FROM spots", (spotsSelectError, spots) => {
                if (spotsSelectError) {
                    res.status(500).send("Server Error: 500");
                } else {
                    console.log(spots)
                    res.render("index.ejs", {rooms, spots});
                }
            })
        }
    })
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
