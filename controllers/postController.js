import { postValidator, postUpdateValidator } from '../validators';
import { Post } from '../models';
import { customErrorHandler } from '../services'

const postController = {
    async create(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = postValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { title, description, subject, attachment } = req.body;

        try {
            //STORE POST STORE IN DATABASE
            const post = await Post.create({
                title, description, subject, attachment
            });

            //IF POST NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!post) {
                return next(customErrorHandler.serverError());
            }

            res.json(post);

        } catch (error) {
            return next(error);
        }
    },

    async index(req, res, next) {

        try {
            const posts = await Notification.find();
            res.json(posts);

        } catch (error) {
            return next(customErrorHandler.serverError());
        }
    },

    async update(req, res, next) {
        const { id } = req.params;

        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = postUpdateValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { title, description, subject, attachments: newAttachments } = req.body;

        try {
            //TRY TO UPDATE A POST OBJECT IN DATABASE
            const post = await Post.findOneAndUpdate({ _id: id }, {
                title, description, subject,
                $addToSet: { attachments: { $each: newAttachments } },
            });

            if (!post) {
                return next(customErrorHandler.serverError());
            }

            res.json(post)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    },

    async delete(req, res, next) {
        const { id } = req.params;

        try {
            const post = await Post.findOneAndDelete({ _id: id });
            if (!post) {
                return next(customErrorHandler.serverError(error.message));
            }

            res.json(post)

        } catch (error) {
            return next(customErrorHandler.serverError(error.message));
        }
    }
}

export default postController;