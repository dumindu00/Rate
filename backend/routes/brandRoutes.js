const express = require("express")
const router = express.Router()

const protect = require("../middleware/authMiddleware")


const {
    getBrands,
    voteBrand,
    createBrand,
    updateBrand,
    deleteBrand
} = require("../controllers/brandController")
const { create } = require("../models/Brand")

router.get("/brands", getBrands)

router.post("/brands/:id/vote", voteBrand)

router.post(
    "/brands",
    protect,
    createBrand
)

router.put(
    "/brands/:id",
    protect,
    updateBrand
)


router.delete(
    "/brands/:id",
    protect,
    updateBrand
)

router.delete(
    "/brands/:id",
    protect,
    deleteBrand
)


module.exports = router