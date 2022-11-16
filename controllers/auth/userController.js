import { User } from '../../models';
import { customErrorHandler } from '../../services';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { userUpdateValidator } from '../../validators/auth';

//CREATING STROGE USING MULTER LIBRARY
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/users/'),
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(
            Math.random() * 1e9
        )}${path.extname(file.originalname)}`;

        cb(null, uniqueName);
    },
});

//CREATE A FUNCTION FOR MULTER LIBRARY
const handleMultipartData = multer({
    storage,
    limits: { fileSize: 1024 * 1025 * 2 },
}).single('profile');

const userController = {
    async me(req, res, next) {
        try {
            //FINDING A USER USING ID
            const user = await User.findOne({ _id: req.user._id }).select(
                '-password'
            );

            //IF WE CANT FIND USER RETURN ERROR
            if (!user) {
                return next(customErrorHandler.notFound('user not found'));
            }

            //IF FIND USER SO SEND A USER OBJCT TO USER
            res.json(user);
        } catch (error) {
            return next(customErrorHandler.notFound('user not found'));
        }
    },

    async update(req, res, next) {
        handleMultipartData(req, res, async (err) => {
            if (err) {
                return next(customErrorHandler.serverError(err.message));
            }

            //GET A FILE PATH FROM FILE OBJECT ATTACHED ON REQ BEZ OF HANDLEM... FUNCTION
            const fileName = req.file.path;

            //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
            const { error } = userUpdateValidator.validate(req.body);

            //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
            if (error) {
                fs.unlink(`${appRoot}/${fileName}`, () => {});
                return next(error);
            }

            //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
            const {
                name,
                profile,
                email,
                contact,
                dob,
                gender,
                qulification,
                experience,
            } = req.body;

            try {
                //CHECK USER HAVE ALREADY PROFILE IMAGE OF NOT
                const { profile } = await User.findOne({ _id: req.user._id });

                //IF PROFILE EXIST DELETE IT
                if (profile) {
                    fs.unlink(`${appRoot}/${profile}`, () => {});
                }

                //FIND USER AND UPDATE ITS PROFILE URL
                const user = await User.findOneAndUpdate(
                    { _id: req.user._id },
                    {
                        profile: fileName,
                    }
                );

                //IF USER IS NOT UPDATED DELETE A SAVED FILE AND RETURN A ERROR
                if (!user) {
                    fs.unlink(`${appRoot}/${fileName}`, () => {});
                    return next(customErrorHandler.serverError());
                }

                //IF EVERYTHING IS ALRIGHT SEND A RESPONSE TO USER
                res.json(user);
            } catch (error) {
                //IF ERROR COMES DELETE A SAVED FILE AND RETURN A ERROR
                fs.unlink(`${appRoot}/${fileName}`, () => {});
                return next(customErrorHandler.notFound(error.message));
            }
        });
    },
};

export default userController;
