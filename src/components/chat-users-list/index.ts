import Block, {TypeProps} from '@/utils/block';
import {hoc} from "@/utils/hoc";
import {State, UserInfo} from "@/utils/types";
import {ChatUsersListItem} from "@/components";

function constructUserBlocks(arUsers: UserInfo[]) {
    return arUsers.map((item: UserInfo) => {
        return new ChatUsersListItem(item);
    });
}

class ChatUsersList extends Block {
    constructor({...props}: object) {
        super({
            ...props,
            ChatUsers: constructUserBlocks([])
        });
    }


    componentDidUpdate(oldProps: TypeProps, newProps: TypeProps): boolean {
        if (
            Array.isArray(newProps.chatUsers)
            && newProps.chatUsers.length > 0
        ) {
            const userBlocks = constructUserBlocks(newProps.chatUsers);
            delete newProps.chatUsers;
            this.setProps({ChatUsers: userBlocks});
        }
        return super.componentDidUpdate(oldProps, newProps);
    }

    render() {
        return `
            <div>{{{ChatUsers}}}</div>
        `;
    }
}

export const chatUsersList = hoc(
    state =>
        ({
            chatUsers: state.chatUsers,
        }) as State
)(ChatUsersList);
