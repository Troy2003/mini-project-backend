import { Subject } from "../models";
import { customErrorHandler } from "../services";
import { subjectValidator, subjectUpdateValidator } from "../validators";

const subjectController = {
    async create(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = subjectValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name, semester, type, marks } = req.body;

        //CHECK SUBJECT IS ALREADY IN DATABASE OR NOT
        try {
            const subject = await Subject.findOne({ code });

            //IF SUBJECT ALREADY FOUND IN DATABASE RETURN ERROR TO USER
            if (subject) {
                return next(customErrorHandler.alreadyExists());
            }

            //IF SUBJECT NOT FOUND IN DATABASE STORE IN DATABASE
            const savedSubject = await Subject.create({
                code,
                name,
                semester,
                type,
                marks
            });

            //IF SUBJECT NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!savedSubject) {
                return next(customErrorHandler.serverError());
            }

            res.json(savedSubject);

        } catch (error) {
            return next(error);
        }
    },

    async index(req, res, next) {

        try {
            const subjects = await Subject.find();
            res.json(subjects);

        } catch (error) {
            return next(customErrorHandler.serverError());
        }
    },


    async update(req, res, next) {
        const { id } = req.params;

        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = degreeUpdateValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name, semester, type, marks } = req.body;

        try {
            //TRY TO UPDATE A SUBJECT OBJECT IN DATABASE
            const subject = await Subject.findOneAndUpdate({ _id: id }, {
                code,
                name,
                semester, type, marks
            });

            if (!subject) {
                return next(customErrorHandler.serverError());
            }

            res.json(subject)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    },

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const subject = await Subject.findOneAndDelete({ _id: id });
            if (!subject) {
                return next(customErrorHandler.serverError(error.message));
            }

            res.json(subject)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    }
}

export default subjectController;