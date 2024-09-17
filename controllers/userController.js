const User = require("../models/user");
const { sendEmail } = require("../mailer/sendEmail")

const getSingleUser = async (req, res) => {
    const userEmail = req.params.userEmail;
    const availableUser = await User.find({ email: userEmail });

    if (availableUser.length !== 0) {
        res.json({
            status: 200,
            user: availableUser
        })
    } else {
        res.status(400).json({
            message: `No such user with email: ${userEmail} found.`
        })
    }
}

const getAllUser = async (req, res) => {
    User.find()
        .then((users) => {
            res.json({
                status: 200,
                user: users
            })
        })
        .catch((error) => {
            res.json({
                status: 400,
                message: error.message
            });
        });
}

const addUser = async (req, res) => {
    const userDetails = new User({
        name: req.body.name,
        email: req.body.email,
    });

    const availableUser = await User.find({ email: userDetails.email });

    if (availableUser) {
        User.create(userDetails)
            .then(() => {
                sendEmail(
                    userDetails.email,
                    'Welcome to our family.',
                    `Hello ${userDetails.name}! You are successfully register.`
                );
                res.json({
                    status: 200,
                    message: "Added successfully"
                })
            }).catch((error) => {
                res.status(400).json({
                    message: error.message
                })
            });
    } else {
        res.status(400).json({
            message: "Email id already exists"
        })
    }
}

const updateUser = async (req, res) => {
    const email = req.params.userEmail;
    const user = await User.findOne({ email: email })
    if (user) {
        const updatedUser = await User.findByIdAndUpdate(user._id, req.body, { new: true });
        res.json({
            status: 200,
            message: "Updated user successfully.",
            data: updatedUser
        });
    } else {
        res.status(400).json({
            message: `User with email: ${email} does not exist`
        })
    }
};

const deleteUser = async (req, res) => {
    const email = req.params.userEmail;
    const user = await User.find({ email: email })
    if (user.length !== 0){
        User.findByIdAndDelete({ _id: user[0]._id })
            .then(() => {
                res.json({
                    status: 200,
                    message: "Deleted user successfully."
                })
            })
            .catch((error) => {
                res.json({
                    status: 400,
                    message: error.message
                })
            });
    } else {
        res.status(400).json({
            message: `User with email: ${email} does not existed`
        })
    }
};

module.exports = {
    getSingleUser, getAllUser, addUser, updateUser, deleteUser
}