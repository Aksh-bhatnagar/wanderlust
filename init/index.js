const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL ='mongodb://127.0.0.1:27017/wanderlust';

main()
.then(() => {
    console.log("Connected to DB")
}).catch((err) => {
    console.log(err);
});

async function main () {
    await mongoose.connect(process.env.ATLASDB_URL);
}

const initDB = async () => {
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj) => ({...obj, owner: '688ce385ef6dc28942d92152'}));
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
}
 
initDB();
// require("dotenv").config();
// const mongoose = require("mongoose");
// const Listing = require("../models/listing");
// const { cloudinary } = require("../cloudConfig");
// const { data } = require("./data");

// mongoose.connect(process.env.ATLASDB_URL);

// async function seedDB() {
//   await Listing.deleteMany({});

//   for (let item of data) {
//     const upload = await cloudinary.uploader.upload(item.image.url, {
//       folder: "wanderlust_DEV",
//     });

//     await Listing.create({
//       ...item,
//       image: {
//         url: upload.secure_url,
//         filename: upload.public_id,
//       },
//     });
//   }

//   console.log("Database seeded");
//   mongoose.connection.close();
// }

// seedDB();
