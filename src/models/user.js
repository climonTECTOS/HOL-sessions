import mongoose from "mongoose";
//Hola mundo
const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    age: Number,
    password: String
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection

