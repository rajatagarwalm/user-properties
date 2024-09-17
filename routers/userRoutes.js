const express = require("express");
const { addUser, deleteUser, getAllUser, getSingleUser, updateUser } = require("../controllers/userController");

const router = express.Router();

router.post("/add-user", addUser);
router.get("/all-users", getAllUser);
router.get("/users/:userEmail", getSingleUser);
router.put("/update/:userEmail", updateUser);
router.delete("/delete-user/:userEmail", deleteUser);

module.exports = router;