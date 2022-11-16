import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    title: {
        type: String,
        require: true,
    },

    description: String,

    links: [String]

}, { timestamps: true });

export default mongoose.model('Notification', notificationSchema, 'notifications');