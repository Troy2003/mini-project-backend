import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
    {
        name: {
            first: {
                type: String,
                require: true,
                lowercase: true,
            },
            middle: {
                type: String,
                require: true,
                lowercase: true,
            },
            last: {
                type: String,
                require: true,
                lowercase: true,
            },
        },

        id: {
            type: String,
            require: true,
            lowercase: true,
        },

        profile: String,

        email: {
            type: String,
            require: true,
            unique: true,
            lowercase: true,
        },

        contact: String,

        branch: mongoose.Schema.Types.ObjectId,

        section: String,

        dob: Date,

        gender: String,

        qulification: String,

        experience: Number,

        password: {
            type: String,
            require: true,
        },

        role: {
            type: String,
            default: 'student',
            lowercase: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model('User', userSchema, 'users');
