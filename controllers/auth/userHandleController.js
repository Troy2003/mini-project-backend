import { User } from '../../models';
import { customErrorHandler } from '../../services'
const userHandleController = {
    async student(req, res, next) {
        try {
            const students = await User.find({ role: 'student' });

            if (!students) {
                return next(customErrorHandler.serverError());
            }
            res.json(students);
        } catch (error) {
            return next(error);
        }
    },

    async teacher(req, res, next) {
        try {
            const teachers = await User.find({ role: 'teacher' });

            if (!teachers) {
                return next(customErrorHandler.serverError());
            }
            res.json(teachers);
        } catch (error) {
            return next(error);
        }
    }
}

export default userHandleController;