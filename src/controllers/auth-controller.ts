import authApi from "@/api/auth-api";
import {LoginData, RegistrationData, UserInfo} from "@/utils/types";
import store from "@/utils/store";
import RouteManager from "@/utils/router/route-manager";
import {Routes} from "@/utils/router/routes";


class AuthController {
    public async checkUserIsAuth() {
        try {
            store.set('loading', true);
            const user = await authApi.getUser();
            if(user.id){
                const userInfo: UserInfo = {
                    id: user.id,
                    avatar: user.avatar,
                    display_name: user.display_name,
                    email: user.email,
                    first_name: user.first_name,
                    second_name: user.second_name,
                    login: user.login,
                    phone: user.phone,
                };
                store.set('user', userInfo);
                return true;
            }
        } catch (error) {
            console.log(error);
            store.set('user', null);
            return false;
        } finally {
            store.set('loading', false);
        }
        return false;
    }

    public async login(loginRequest: LoginData) {
        try {
            store.set('loading', true);
            const response = await authApi.login(loginRequest);
            if (response === 'OK') {
                await this.checkUserIsAuth();
                RouteManager.go(Routes.CHAT);
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }

    public async logout() {
        try {
            store.set('loading', true);
            const response = await authApi.logout();
            if (response === 'OK') {
                store.set('user', null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            RouteManager.go(Routes.ROOT);
            store.set('loading', false);
        }
    }

    public async registration(registrationData: RegistrationData) {
        try {
            store.set('loading', true);
            const response = await authApi.create(registrationData);
            if (response === 'OK') {
                await this.checkUserIsAuth();
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
}

export default new AuthController();
