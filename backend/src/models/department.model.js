import mongoose, {Schema} from "mongoose";

const departmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
    },
    { timestamps: true }
);

export const Department = mongoose.model("Department", departmentSchema);