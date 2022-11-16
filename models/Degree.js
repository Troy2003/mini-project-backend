import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true,
        lowercase: true,
    },

    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]

}, { timestamps: true });

export default mongoose.model('Degree', courseSchema, 'degrees');