import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        require: true
    },

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        require: true
    },

    marks: {
        type: Number,
        require: true
    }
});

export default mongoose.model('Result', resultSchema, 'results');

