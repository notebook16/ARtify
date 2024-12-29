import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import dotenv from "dotenv";



dotenv.config();

const app = express();



import router from "./routes/user.js";
import chatRouter from "./routes/chat.js";







// app.use(
//   cors({
//     origin: 'http://localhost:5173', // Your frontend's URL
//     credentials: true, // Allow cookies to be included
//   })
// );

app.use(cors());



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




const MONGO_URI = process.env.MONGO_URI;
//calling main function of db
main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URI);
}







//routes
app.use("/api/v1/users", router);
app.use("/api/v1/users", chatRouter);






app.listen(8080, () => {
    console.log("Server is running on port 8080");
});


