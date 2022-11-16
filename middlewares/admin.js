import { customErrorHandler } from "../services";

const admin = (req, res, next) => {
    const role = req.user.role;

    if (role !== 'admin') {
        return next(customErrorHandler.unauthorize());
    }

    return next();
}

export default admin;