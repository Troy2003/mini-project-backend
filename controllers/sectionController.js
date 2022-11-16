import { Section } from '../models'
import { customErrorHandler } from '../services'
import { sectionValidator, sectionUpdateValidator } from '../validators'

const sectionController = {
    async create(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = sectionValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name } = req.body;

        //CHECK SECTION IS ALREADY IN DATABASE OR NOT
        try {
            const section = await Section.findOne({ code });

            //IF SECTION ALREADY FOUND IN DATABASE RETURN ERROR TO USER
            if (section) {
                return next(customErrorHandler.alreadyExists());
            }

            //IF SECTION NOT FOUND IN DATABASE STORE IN DATABASE
            const savedSection = await Section.create({
                code,
                name
            });

            //IF SECTION NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!savedSection) {
                return next(customErrorHandler.serverError());
            }

            res.json(savedSection);

        } catch (error) {
            return next(error);
        }
    },

    async index(req, res, next) {

        try {
            const sections = await Section.find();
            res.json(sections);

        } catch (error) {
            return next(customErrorHandler.serverError());
        }
    },


    async update(req, res, next) {
        const { id } = req.params;

        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = sectionUpdateValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name, students: newStudents, teachers: newTeachers } = req.body;

        try {
            //TRY TO UPDATE A SECTION OBJECT IN DATABASE
            const section = await Section.findOneAndUpdate({ _id: id }, {
                code,
                name,
                $addToSet: { students: { $each: newStudents } },
                $addToSet: { teachers: { $each: newTeachers } }
            });

            if (!section) {
                return next(customErrorHandler.serverError());
            }

            res.json(section)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    },

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const section = await Section.findOneAndDelete({ _id: id });
            if (!section) {
                return next(customErrorHandler.serverError(error.message));
            }

            res.json(section)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    }
}

export default sectionController;