
class customErrorHandler {

    constructor(message, status) {
        this.message = message;
        this.status = status;
    }

    static serverError(message = "internal server error") {
        return new customErrorHandler(message, 500);
    }

    static alreadyExists(message = "already exists") {
        return new customErrorHandler(message, 401);
    }

    static wrongCredentials(message = "wrong credentials") {
        return new customErrorHandler(message, 401);
    }

    static unauthorize(message = "unauthorize") {
        return new customErrorHandler(message, 401);
    }

    static notFound(message = "not found") {
        return new customErrorHandler(message, 404);
    }

    static connectionError(message = "cannot connect to database") {
        return new customErrorHandler(message, 401);
    }
}


export default customErrorHandler;