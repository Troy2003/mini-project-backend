import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
    code: {
        type: String,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },

    semester: {
        type: Number,
        require: true,
    },

    type: {
        type: String,
        default: 'core',
        require: true,
        lowercase: true,
    },

    marks: {
        theory: Number,
        practical: Number,
    }

}, { timestamps: true });

export default mongoose.model('Subject', subjectSchema, 'subjects');