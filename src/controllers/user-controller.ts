import {PasswordData, ProfileData, UserInfo} from "@/utils/types";
import store from "@/utils/store";
import userApi from "@/api/user-api";


class UserController {
    public async changeProfile(profileData:ProfileData) {
        try {
            store.set('loading', true);
            const response = await userApi.changeProfile(profileData);
            if (response.id) {
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

    public async searchUsersByLogin(login: string) {
        try {
            store.set('loading', true);
            let response:UserInfo[] = [];
            if(login.length > 0){
                response = await userApi.searchUserByLogin(login);
                store.set('searchUsers',response);
            } else {
                store.set('searchUsers',response);
            }
            store.set('search',login);
            return response;
        } catch (error) {
            console.log(error);
        } finally {
            store.set('loading', false);
        }
        return [];
    }
}

export default new UserController();
