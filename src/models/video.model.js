const mongoose = require("mongoose");
const mongooseAggrigrate = require("mongoose-aggregate-paginate-v2");

const videoModel = new mongoose.Schema(
  {
    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timeStamps: true }
);

const Video = module.Schema("Video", videoModel);

module.exports = Video;
