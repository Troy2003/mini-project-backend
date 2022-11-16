import { loginValidator } from '../../validators/auth';
import { User } from '../../models';
import { customErrorHandler, jwtService } from '../../services';
import bcrypt from 'bcrypt';

const loginController = {
    async login(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = loginValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { email, password } = req.body;

        //CHECK USER PROVIDED EMAIL IS PRESENT IN DATABASE OR NOT
        try {
            const user = await User.findOne({ email });

            //IF USER NOT FOUND IN DATABASE RETURN ERROR TO USER
            if (!user) {
                return next(customErrorHandler.wrongCredentials());
            }

            //EXTRACT A HASH PASSWORD FROM USER FETCHED FROM DATABASE
            const { password: hashPassword } = user;

            //IF USER FOUND IN DATABASE COMPARE A USER PROVIDED PASSWORD WITH HASH PASSWORD
            const match = await bcrypt.compare(password, hashPassword);

            if (!match) {
                return next(customErrorHandler.wrongCredentials());
            }

            const { _id, name, role } = user;

            const token = jwtService.sign({ _id, role });

            res.json({ _id, name, email, role, token });
        } catch (error) {
            return next(error);
        }
    },
};

export default loginController;
