import {BaseAPI} from "@/utils/api/base-api";
import {LoginData, RegistrationData} from "@/utils/types";

class AuthApi extends BaseAPI {
    constructor() {
        super('/auth');
    }

    public getUser() {
        return this.get('/user');
    }

    public login(loginData: LoginData) {
        this.options.data = loginData;
        return this.post('/signin', this.options);
    }

    public logout() {
        return this.post('/logout', this.options);
    }

    public create(registrationData: RegistrationData) {
        this.options.data = registrationData;
        return this.post('/signup', this.options);
    }
}

export default new AuthApi();
