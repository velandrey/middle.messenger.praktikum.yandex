import {PasswordData, ProfileData} from "@/utils/types";
import store from "@/utils/store";
import userApi from "@/api/user-api";


class UserController {
    public async changeProfile(profileData:ProfileData) {
        try {
            store.set('loading', true);
            const response = await userApi.changeProfile(profileData);
            if (response === 'OK') {
                store.set('user', response);
                return true;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return false;
    }
    public async changeAvatar(file:File) {
        try {
            store.set('loading', true);
            const response = await userApi.changeAvatar(file);
            if ('id' in response) {
                store.set('user', response);
                return true;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return false;
    }

    public async changePassword(passwordData: PasswordData) {
        try {
            store.set('loading', true);
            const response = await userApi.changePassword(passwordData);
            if (response === 'OK') {
                return true;
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return false;
    }

    public async searchUserByLogin(login: string) {
        try {
            store.set('loading', true);
            const response = await userApi.searchUserByLogin(login);
            if (response === 'OK') {
                // [
                //     {
                //         "id": 123,
                //         "first_name": "Petya",
                //         "second_name": "Pupkin",
                //         "display_name": "Petya Pupkin",
                //         "phone": "+79001001100",
                //         "login": "userLogin",
                //         "avatar": "/path/to/avatar.jpg",
                //         "email": "string@ya.ru"
                //     }
                // ]
            }
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
    }
}

export default new UserController();
