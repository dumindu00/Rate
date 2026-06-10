const cloudinary = require("../config/cloudinary")
const Brand = require("../models/Brand")


const getBrands = async (req, res) => {
  
    const brands = await Brand.find();

    const formatted = brands.map(brand => {
        const total = brand.likes + brand.dislikes

        const percentage = total === 0
            ? 0
            : Math.round((brand.likes / total) * 100)
        
            return {
                ...brand.toObject(),
                percentage
            }
        })

        res.json(formatted)
}

const voteBrand = async (req, res) => {
  const { id } = req.params;
  const { userId, vote } = req.body;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(404).json({
      message: "Brand not found"
    });
  }

  const alreadyVoted = brand.voters.find(
    voter => voter.userId === userId
  );

  if (alreadyVoted) {
    return res.status(400).json({
      message: "You already voted"
    });
  }

  if (vote === "like") {
    brand.likes += 1;
  } else {
    brand.dislikes += 1;
  }

  brand.voters.push({
    userId,
    vote
  });

  await brand.save();

  res.json({
    success: true
  });
};



const createBrand = async (req, res) => {
  try {

    console.log("RECEIVED REQ.BODY IN BACKEND:", req.body);
    const { name, logoUrl } = req.body;

    const existingBrand = await Brand.findOne({
      name
    });

    if (existingBrand) {
      return res.status(400).json({
        message: "Brand already exists"
      });
    }

    const brand = await Brand.create({
      name,
      logoUrl
    });

    res.status(201).json(brand);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create brand"
    });
  }
};





const updateBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(
      req.params.id
    );

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found"
      });
    }

    brand.name =
      req.body.name || brand.name;

    brand.logoUrl =
      req.body.logoUrl || brand.logoUrl;

    await brand.save();

    res.json(brand);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update brand"
    });
  }
};





const deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(
      req.params.id
    );

    if (!brand) {
      return res.status(404).json({
        message: "Brand not found"
      });
    }

    await brand.deleteOne();

    res.json({
      message: "Brand deleted"
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete brand"
    });
  }
};


const uploadImage = async (req, res) => {

  try {
    
    const { image } = req.body;
    if (!image) return res.status(400).json({ message: "Image is required!" })

    const result = await cloudinary.uploader.upload(image, {
      folder: "brand-voting/logos"
    })

    res.json({ logoUrl: result.secure_url });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Image upload failed" });
  }
}




module.exports = {
  getBrands,
  voteBrand,
  createBrand,
  deleteBrand,
  updateBrand,
  uploadImage
};