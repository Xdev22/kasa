const mongoose = require("../db/db");

const productSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },

    title: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 30,
      trimp: true,
      Number: 0,
    },
    location: {
      city: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        trimp: true,
      },
      district: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
        trimp: true,
      },
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
      trim: true,
    },
    equipements: {
      type: [
        {
          equipement: {
            type: String,
            maxlength: 30,
            trim: true,
          },
        },
      ],
      required: true,
    },

    images: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      require: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
