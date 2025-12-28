const mongoose = require("mongoose");
const initData = require("./data.js");
const listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj, 
        owner:"68a730c0f62e026e36522361",
    }));
    await listing.insertMany(initData.data);
    console.log("data was intialized");
};

initDB();