import mongoose from "mongoose";

const postSchema = mongoose.Schema({

    title: {
        type: String,
        require: true,
    },

    description: String,

    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        require: true
    },

    attachments: [String]

}, { timestamps: true });

export default mongoose.model('Post', postSchema, 'posts');