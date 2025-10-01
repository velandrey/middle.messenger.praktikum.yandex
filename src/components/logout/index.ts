import Block from '@/utils/block';
import authController from "@/controllers/auth-controller";

export class Logout extends Block {
    constructor(props:object) {
        super({
            ...props,
            events: {
                click: async (e: Event) => {
                    e.preventDefault();
                    await authController.logout();
                }
            }
        });
    }

    render() {
        return `
            <div class="profile_action profile_logout" id="profile_logout">Выйти</div>
        `;
    }
}
