import mongoose from "mongoose";

const productSpecificationSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        key: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model(
    "ProductSpecification",
    productSpecificationSchema
);
