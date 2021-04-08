// pages/api/getAllVideos.js
var cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async (req, res) => {
    
  await cloudinary.api
    .resources({ resource_type: "video" }, function (error, result) {
      if (result) {
        res.status(200).json(result);
      }
      if (error) {
        console.error(error);
        res.status(404).json(error);
      }
    })
    .catch((e) => {
      console.error(e);
    });
};
