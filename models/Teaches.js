import mongoose from "mongoose";

const teachesSchema = mongoose.Schema({

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        require: true,
    },

    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Section',
        require: true,
    },

}, { timestamps: true });

export default mongoose.model('Teaches', teachesSchema, 'teaches');