import mongoose from "mongoose";

function connentToDb () {
    mongoose.connect(process.env.MONGO).then(() => console.log("connect to mongodb")).catch(err => console.log(err))
};

export default connentToDb;