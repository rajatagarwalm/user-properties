const Property = require("../models/properties");
const { getPropertiesByUserId, getPropertyByNumber, addProperty, updatePropertyById, deletePropertyById } = require("../service/propertyService")

const getPropertiesByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const properties = await getPropertiesByUserId(userId)
        res.status(200);
        res.json({
            properties: properties
        })
    } catch (error) {
        res.status(400);
        res.json({
            error: error.message
        })
    }
}

const getPropertyByPropertyNumber = async (req, res) => {
    const userId = req.params.userId;
    const propertyNumber = req.params.propertyNumber;
    const requireProperty = await getPropertyByNumber(userId, propertyNumber);
    res.status(200);
    res.json({
        property: requireProperty ? requireProperty : []
    })
}

const addNewProperty = async (req, res) => {
    const userId = req.params.userId;
    const propertyName = req.body.propertyName;
    const propertyNumber = req.body.propertyNumber;

    addProperty(userId, propertyName, propertyNumber)
        .then(() => {
            res.status(200);
            res.json({
                message: "added successfully"
            });
        })
        .catch((error) => {
            res.status(400);
            res.json({
                message: "failed",
                error: error.message
            });
        });

}

const updateProperty = async (req, res) => {
    const propertyId = req.params.propertyId;
    const updatedBody = req.body;

    const updateResponse = await updatePropertyById(propertyId, updatedBody);
    res.status(200);
    res.json({
        message: "Successfully updated"
    })
}

const deleteProperty = async (req, res) => {
    const propertyId = req.params.propertyId;
    Property.findByIdAndDelete({ _id: propertyId }).then(() => {
        res.status(200);
        res.json({
            message: "deleted successfully",
        });
    }).catch((error) => {
        res.status(400);
        res.json({
            message: error.message,
        });
    });
};

module.exports = {
    getPropertiesByUser, getPropertyByPropertyNumber, addNewProperty, updateProperty, deleteProperty
}