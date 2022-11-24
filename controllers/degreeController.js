import { degreeValidator, degreeUpdateValidator } from '../validators';
import { Degree } from '../models';
import { customErrorHandler } from '../services'

const degreeController = {

    async create(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = degreeValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { code, name } = req.body;

        //CHECK DEGREE IS ALREADY IN DATABASE OR NOT
        try {
            const degree = await Degree.findOne({ code });

            //IF DEGREE ALREADY FOUND IN DATABASE RETURN ERROR TO USER
            if (degree) {
                return next(customErrorHandler.alreadyExists());
            }

            //IF DEGREE NOT FOUND IN DATABASE STORE IN DATABASE
            const savedDegree = await Degree.create({
                code,
                name
            });

            //IF DEGREE NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!savedDegree) {
                return next(customErrorHandler.serverError());
            }

            res.json(savedDegree);

        } catch (error) {
            return next(error);
        }
    },

    async index(req, res, next) {

        try {
            const degrees = await Degree.find();
            res.json(degrees);

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
        const { code, name, course } = req.body;

        try {
            //TRY TO UPDATE A DEGREE OBJECT IN DATABASE
            const degree = await Degree.findOneAndUpdate({ _id: id }, {
                code,
                name,
                $addToSet: { courses: course },
            });

            if (!degree) {
                return next(customErrorHandler.serverError());
            }

            res.json(degree)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    },

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const degree = await Degree.findOneAndDelete({ _id: id });
            if (!degree) {
                return next(customErrorHandler.serverError(error.message));
            }

            res.json(degree)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    }
}

export default degreeController;