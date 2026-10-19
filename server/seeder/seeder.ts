import mongoose from "mongoose";
import { Room } from "../models/room";
import { rooms } from "./data";

const seedRooms = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/");

    await Room.deleteMany();
    console.log("Room are destroy!");

    await Room.insertMany(rooms);
    console.log("Room are added!");
  } catch (error) {
    console.log(error);
  } finally {
    process.exit();
  }
};

seedRooms();
