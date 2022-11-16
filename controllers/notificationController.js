import { notificationValidator } from '../validators';
import { Notification } from '../models';
import { customErrorHandler } from '../services'

const notificationController = {
    async create(req, res, next) {
        //VALIDATE USER PROVIDED DATA WITH THE HELP OF JOI VALIDATION LIBRARY
        const { error } = notificationValidator.validate(req.body);

        //IF USER NOT SEND A REQUIRED DATA RETURN AN ERROR
        if (error) {
            return next(error);
        }

        //IF USER PROVIDE ALL REQUIRED DATA THEN EXTRACT DATA FROM REQUEST BODY
        const { creator, title, description, links } = req.body;

        try {
            //STORE NOTIFICATION STORE IN DATABASE
            const notification = await Notification.create({
                creator, title, description, links
            });

            //IF NOTIFICATION NOT SAVED IN DATABASE SEND SERVER ERROR TO USER
            if (!notification) {
                return next(customErrorHandler.serverError());
            }

            res.json(notification);

        } catch (error) {
            return next(error);
        }
    },

    async index(req, res, next) {

        try {
            const notifications = await Notification.find();
            res.json(notifications);

        } catch (error) {
            return next(customErrorHandler.serverError());
        }
    },


    update(req, res, next) {
        res.json({ status: 'update notification' })
    },

    delete(req, res, next) {
        res.json({ status: 'delete notification' })
    }
}

export default notificationController;