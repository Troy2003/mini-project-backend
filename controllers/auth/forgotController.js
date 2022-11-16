import { forgotValidator, resetValidator } from "../../validators/auth";
import { User } from "../../models";
import { customErrorHandler, jwtService } from "../../services";
import { FORGOT_SECRET } from "../../config";
import bcrypt from 'bcrypt';

const forgotController = {
    async sendLink(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = forgotValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { email } = req.body;

        try {
            //CHECK USER IS PRESENT IN DATABASE OR NOT
            const user = await User.findOne({ email });

            //IF USER NOT PRESENT IN DATABASE RETURN ERROR
            if (!user) {
                return next(customErrorHandler.notFound('user not found'));
            }

            //EXTRACT DATA FROM FETCHED USER OBJECT
            const { _id, password, role } = user;

            //IF USER EXIST IN DATABASE CREATE ONE TIME RESET LINK 
            const newSecret = FORGOT_SECRET + password;

            //GENERATE A FORGOT TOKEN TO SEND IN LINK
            const forgotToken = jwtService.sign({ _id, role }, newSecret, '15m');

            //GENERATE A LINK USING FORGOTTOKEN AND ID 
            const link = `http://127.0.0.1:5000/api/reset/${_id}/${forgotToken}`;

            //SENDING A LINK TO USER THROUGN EMAIL -> PENDING
            res.json(link);
        } catch (error) {
            return next(error);
        }
    },

    async verifyLink(req, res, next) {
        const { id, token } = req.params;

        try {
            //CHECK USER IS PRESENT IN DATABASE OR NOT
            const user = await User.findOne({ _id: id });

            //IF USER NOT PRESENT IN DATABASE RETURN ERROR
            if (!user) {
                return next(customErrorHandler.notFound('user not found'));
            }

            //EXTRACT DATA FROM FETCHED USER OBJECT
            const { email, password } = user;

            //IF USER EXIST IN DATABASE VERIFY A TOKEN GIVEN BY USER
            const newSecret = FORGOT_SECRET + password;
            const { _id, role } = jwtService.verify(token, newSecret);

            res.json(email);
        } catch (error) {
            return next(error);
        }

    },

    async reset(req, res, next) {
        const { id, token } = req.params;

        try {
            //CHECK USER IS PRESENT IN DATABASE OR NOT
            const user = await User.findOne({ _id: id });

            //IF USER NOT PRESENT IN DATABASE RETURN ERROR
            if (!user) {
                return next(customErrorHandler.notFound('user not found'));
            }

            //EXTRACT DATA FROM FETCHED USER OBJECT
            const { password } = user;

            //IF USER EXIST IN DATABASE VERIFY A TOKEN GIVEN BY USER
            const newSecret = FORGOT_SECRET + password;
            const { _id, role } = jwtService.verify(token, newSecret);

            //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
            const { error } = resetValidator.validate(req.body);

            //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
            if (error) {
                return next(error);
            }

            //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
            const { password: newpassword } = req.body;

            //HASH A PASSWORD TO STORE IN DATABASE
            const hashPassword = await bcrypt.hash(newpassword, 10);

            //UPDATE A USER PASSWORD IN DATABASE
            const updatedUser = await User.findOneAndUpdate({ _id }, {
                password: hashPassword
            });

            //IF USER NOT UPDATED SEND ERROR TO USER
            if (!updatedUser) {
                return next(customErrorHandler.serverError());
            }

            res.json({ message: 'password updated' })
        } catch (error) {
            return next(error);
        }
    }
}


export default forgotController;