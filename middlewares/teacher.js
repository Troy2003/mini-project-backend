import { customErrorHandler } from "../services";

const teacher = (req, res, next) => {
    const role = req.user.role;

    if (role === 'teacher' || role === 'admin') {
        return next();
    }

    return next(customErrorHandler.unauthorize());
}

export default teacher;