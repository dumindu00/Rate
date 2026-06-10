// const cloudinary = require("../config/cloudinary")


// const uploadImage = async(req, res) => {

//     try {
//         const { image } = req.body

//         if (!image) {
//             return res.status(400).json({
//                 message: "Image is required"
//             })
//         }

//         const result = await cloudinary.uploader.upload(image, {
//             folder: "brand-voting/logos"
//         })

//         res.json({
//             logoUrl: result.secure_url //changesd
//         })

//     } catch (error) {
//         console.error(error)

//         res.status(500).json({
//             message: "Image upload failed"
//         })
//     }
// }

// module.exports = {
//     uploadImage
// }
