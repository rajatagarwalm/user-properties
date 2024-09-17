const Property = require("../models/properties");
const User = require("../models/user");
const { sendEmail } = require("../mailer/sendEmail");

const getUserByUserId = async (userId) => {
    const userData = await User.find({ _id: userId });
    return userData[0];
}

const getPropertiesByUserId = async (userId) => {
    const userEmail = (await getUserByUserId(userId)).email;
    const response = await User.aggregate([
        { $match: { email: userEmail } },
        {
            $lookup: {
                from: "properties",
                localField: "_id",
                foreignField: "userId",
                as: "properties"
            }
        },
    ]);
    return response.length > 0 ? response[0].properties : [];
}

const getPropertyByNumber = async (userId, propertyNumber) => {
    const allProperties = await getPropertiesByUserId(userId);
    let requiredProperty;
    allProperties.map((property) => {
        if (property.propertyNumber === propertyNumber) {
            requiredProperty = property;
        }
    });
    return requiredProperty;
}

const addProperty = async (userId, propertyName, propertyNumber) => {
    const userDetails = await getUserByUserId(userId);
    const propertyDetails = new Property({
        userId: userId,
        userEmail: userDetails.email,
        propertyName: propertyName,
        propertyNumber: propertyNumber,
    });

    Property.create(propertyDetails)
        .then((response) => {
            sendEmail(
                userDetails.email,
                'Property added successfully',
                `Hello ${userDetails.name}. Property with number ${propertyDetails.propertyNumber} added successfully in your records.`
            );
            return response;
        })
        .catch((error) => {
            return error;
        });
}

const updatePropertyById = async (propertyId, updatedBody) => {
    Property.findByIdAndUpdate(propertyId, updatedBody, { new: true })
        .then((res) => {
            return res;
        }).catch((error) => {
            return error.message;
        });
}

const deletePropertyById = async (propertyId) => {
    Property.findByIdAndDelete({ _id: propertyId })
        .then(() => {
            return "Successfully deleted";
        }).catch((error) => {
            return error.message;
        });
};

module.exports = {
    getPropertiesByUserId, getPropertyByNumber, addProperty, updatePropertyById, deletePropertyById
}
