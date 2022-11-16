import jsonwebtoken from 'jsonwebtoken'
import { JWT_SECRET } from '../config';

class jwtService {

    static sign(payload, secret = JWT_SECRET, expiry = '1h') {
        return jsonwebtoken.sign(payload, secret, { expiresIn: expiry });
    }

    static verify(token, secret = JWT_SECRET) {
        return jsonwebtoken.verify(token, secret);
    }
}

export default jwtService;