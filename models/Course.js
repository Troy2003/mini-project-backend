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

    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],

    sections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Section' }],

    semestercount: {
        type: Number,
        require: true,
    },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema, 'courses');