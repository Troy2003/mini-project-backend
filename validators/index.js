import Joi from "joi";


// ********* DEGREE ***********
export const degreeValidator = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required().lowercase(),
});

export const degreeUpdateValidator = Joi.object({
    code: Joi.string(),
    name: Joi.string().lowercase(),
    course: Joi.string(),
});


// ********* COURSE ***********
export const courseValidator = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required().lowercase(),
    semestercount: Joi.number().required()
});

export const courseUpdateValidator = Joi.object({
    code: Joi.string(),
    name: Joi.string().lowercase(),
    section: Joi.string(),
    subject: Joi.string(),
    semestercount: Joi.number()
});

// ********* SECTION ***********
export const sectionValidator = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required(),
});

export const sectionUpdateValidator = Joi.object({
    code: Joi.string(),
    name: Joi.string(),
    student: Joi.string(),
    teacher: Joi.string()
});

// ********* SUBJECT ***********
export const subjectValidator = Joi.object({
    code: Joi.string().required(),
    name: Joi.string().required().lowercase(),
    semester: Joi.number().required(),
    type: Joi.string(),
    marks: Joi.object().required()
});

export const subjectUpdateValidator = Joi.object({
    code: Joi.string(),
    name: Joi.string().lowercase(),
    semester: Joi.number(),
    type: Joi.string(),
    marks: Joi.object(),
});

// ********* TEACHES ***********
export const teachesValidator = Joi.object({
    teacher: Joi.string().required(),
    subject: Joi.string().required(),
    section: Joi.string().required(),
});

export const teachesUpdateValidator = Joi.object({
    teacher: Joi.string(),
    subject: Joi.string(),
    section: Joi.string()
});


// ********* NOTIFICATION ***********
export const notificationValidator = Joi.object({
    creator: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string(),
    links: Joi.array(),
});

export const notificationUpdateFValidator = Joi.object({
    creator: Joi.string(),
    title: Joi.string(),
    description: Joi.string(),
    links: Joi.array(),
});

// ********* POST ***********
export const postValidator = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    subject: Joi.string().required(),
    attachments: Joi.array(),
});

export const postUpdateValidator = Joi.object({
    title: Joi.string(),
    description: Joi.string(),
    subject: Joi.string(),
    attachments: Joi.array(),
});


