import { registerValidator } from '../../validators/auth';
import { customErrorHandler } from '../../services';
import { User } from '../../models';
import bcrypt from 'bcrypt';

const registerController = {
    async register(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = registerValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const {
            name,
            id,
            profile,
            contact,
            dob,
            gender,
            qulification,
            experience,
            branch,
            section,
            role,
            email,
            password,
        } = req.body;

        //CHECK USER PROVIDED EMAIL IS ALREADY IN DATABASE OR NOT
        try {
            const user = await User.findOne({ email });

            //IF USER ALREADY FOUND IN DATABASE RETURN ERROR TO USER
            if (user) {
                return next(customErrorHandler.alreadyExists());
            }

            //IF USER NOT FOUND IN DATABASE HASH A PASSWORD TO STORE IN DATABASE
            const hashPassword = await bcrypt.hash(password, 10);

            const savedUser = await User.create({
                name,
                id,
                profile,
                contact,
                dob,
                gender,
                qulification,
                experience,
                role,
                email,
                branch,
                section,
                password: hashPassword,
            });

            //IF USER NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!savedUser) {
                return next(customErrorHandler.serverError());
            }

            res.json({ status: 'register' });
        } catch (error) {
            return next(error);
        }
    },
};

export default registerController;
