import {BaseAPI} from "@/utils/api/base-api";
import {PasswordData, ProfileData} from "@/utils/types";

class UserApi extends BaseAPI {
    constructor() {
        super('/user');
    }

    public changeProfile(profileData: ProfileData) {
        this.options.data = profileData;
        return this.put('/profile', this.options);
    }

    public changeAvatar(file:File) {
        return this.put('/profile/avatar', {data: {avatar: file}});
    }

    public changePassword(passwordData: PasswordData) {
        this.options.data = passwordData;
        return this.put('/password', this.options);
    }

    public searchUserByLogin(login: string) {
        this.options.data = {
            login: login
        };
        return this.put('/search', this.options);
    }
}

export default new UserApi();
