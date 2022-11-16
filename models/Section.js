import mongoose from "mongoose";

const sectionSchema = mongoose.Schema({

    code: {
        type: String,
        require: true,
        unique: true,
    },

    name: {
        type: String,
        require: true,
    },

    students: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]],

    teachers: [[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]]

}, { timestamps: true });

export default mongoose.model('Section', sectionSchema, 'sections');