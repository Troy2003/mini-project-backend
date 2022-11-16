import Joi from 'joi';

export const registerValidator = Joi.object({
    name: {
        first: Joi.string().required().min(2).max(45),
        middle: Joi.string().required().min(2).max(45),
        last: Joi.string().required().min(2).max(45),
    },
    id: Joi.string(),
    profile: Joi.string(),
    email: Joi.string().email().required(),
    contact: Joi.string().min(10).max(10),
    dob: Joi.date(),
    gender: Joi.string(),
    qulification: Joi.string(),
    experience: Joi.number(),
    role: Joi.string(),
    branch: Joi.string(),
    section: Joi.string(),
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref('password'),
});

export const userUpdateValidator = Joi.object({
    name: {
        first: Joi.string().min(2).max(45),
        middle: Joi.string().min(2).max(45),
        last: Joi.string().min(2).max(45),
    },
    profile: Joi.string(),
    email: Joi.string().email(),
    contact: Joi.string().min(10).max(10),
    dob: Joi.date(),
    gender: Joi.string(),
    qulification: Joi.string(),
    experience: Joi.number(),
});

export const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

export const forgotValidator = Joi.object({
    email: Joi.string().email().required(),
});

export const resetValidator = Joi.object({
    password: Joi.string().min(6).required(),
    repeat_password: Joi.ref('password'),
});
