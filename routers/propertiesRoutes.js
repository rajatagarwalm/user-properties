const express = require("express");
const { getPropertiesByUser, getPropertyByPropertyNumber, addNewProperty, updateProperty, deleteProperty } = require("../controllers/propertiesController");

const router = express.Router();

router.get("/user/:userId/properties", getPropertiesByUser);
router.get("/user/:userId/properties/:propertyNumber", getPropertyByPropertyNumber);
router.post("/user/:userId/new-property", addNewProperty);
router.put("/user/:userId/update-property/:propertyId", updateProperty);
router.delete("/user/:userId/delete-property/:propertyId", deleteProperty);

module.exports = router;