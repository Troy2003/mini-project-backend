import { customErrorHandler, jwtService } from '../services'

const authHeader = async (req, res, next) => {

    let token = null;

    try {
        token = req.headers.authorization.split(" ")[1];
    } catch (error) {
        token = null;
        return next(error);
        return next(customErrorHandler.unauthorize('invalid token'));
    }
    
    
    if (!token) {
        return next(error);
        return next(customErrorHandler.unauthorize('invalid token'))
    }
    
    try {
        const { _id, role } = jwtService.verify(token);
        
        const user = {
            _id, role
        }
        req.user = user;
        
        next();
    } catch (error) {
        return next(error);
        return next(customErrorHandler.unauthorize('invalid token'));
    }

}


export default authHeader;