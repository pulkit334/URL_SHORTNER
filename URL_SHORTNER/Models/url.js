// const mongoose = require("mongoose");

// const UrlSchema = new mongoose.Schema(
//   {
//     shortid: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     redirectUrl: {
//       type: String,
//       required: true
//     },
//     Vist: [  //
//       {
//         Timestamp: { type: Date, default: Date.now }
//       }
//     ]
//   },
//   { timestamps: true } // 
// );

// const url = mongoose.model("url", UrlSchema);
// module.exports = url;
const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortid: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    Vist: [
      {
        Timestamp: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  { timestamps: true }
);


const url = mongoose.model("url", UrlSchema);
module.exports = url;