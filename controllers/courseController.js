import { courseValidator, courseUpdateValidator } from '../validators'
import { Course } from '../models';
import { customErrorHandler } from '../services';

const courseController = {
    async create(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = courseValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name, semestercount } = req.body;

        //CHECK COURSE IS ALREADY IN DATABASE OR NOT
        try {
            const course = await Course.findOne({ code });

            //IF COURSE ALREADY FOUND IN DATABASE RETURN ERROR TO USER
            if (course) {
                return next(customErrorHandler.alreadyExists());
            }

            //IF COURSE NOT FOUND IN DATABASE STORE IN DATABASE
            const savedCourse = await Course.create({
                code,
                name,
                semestercount
            });

            //IF COURSE NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!savedCourse) {
                return next(customErrorHandler.serverError());
            }

            res.json(savedCourse);

        } catch (error) {
            return next(error);
        }
    },

    async index(req, res, next) {
        try {
            const courses = await Course.find();
            res.json(courses);

        } catch (error) {
            return next(customErrorHandler.serverError());
        }
    },


    async update(req, res, next) {
        const { id } = req.params;

        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = courseUpdateValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name, subjects: newSubjects, sections: newSections, semestercount } = req.body;

        try {
            //TRY TO UPDATE A COURSE OBJECT IN DATABASE
            const course = await Course.findOneAndUpdate({ _id: id }, {
                code,
                name,
                $addToSet: { sections: { $each: newSections } },
                $addToSet: { subjects: { $each: newSubjects } },
                semestercount
            });

            if (!course) {
                return next(customErrorHandler.serverError());
            }

            res.json(course)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    },

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const course = await Course.findOneAndDelete({ _id: id });
            if (!course) {
                return next(customErrorHandler.serverError(error.message));
            }

            res.json(course)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    }
}

export default courseController;