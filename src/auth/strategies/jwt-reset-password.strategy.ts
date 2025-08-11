import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class PasswordResetJwtStrategy extends PassportStrategy(Strategy, "jwt-password-reset") {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_PASSWORD_RESET,
        });
    }

    async validate(payload: any) {
        return { login: payload.login };
    }
}
