import { model, Schema } from "mongoose";

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter title."],
    },
    description: {
      type: String,
      required: [true, "Please enter description."],
    },
    roomNumber: {
      type: String,
      required: [true, "Please enter roomNumber."],
    },
    type: {
      type: String,
      required: [true, "Please enter roomType."],
    },
    pricePerNight: {
      type: Number,
      required: [true, "Please enter pricePerNight."],
    },
    capacity: {
      type: Number,
      required: [true, "Please enter roomCapacity."],
    },
    isAvailable: {
      type: Boolean,
      required: [true, "Please enter roomStatus."],
    },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
    reviews: [String],
    location: {
      type: String,
      require: [true, "Please enter location."],
    },
  },
  { timestamps: true },
);

export const Room = model("Room", roomSchema);
