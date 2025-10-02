import {Discussant, InputParams, Message, PageLinkProps} from "@/utils/types";

export const pages: PageLinkProps[] = [
    {
        title: 'Авторизация',
        link: 'Auth',
    },
    {
        title: 'Регистрация',
        link: 'Registration',
    },
    {
        title: 'Список чатов',
        link: 'Chat',
    },
    {
        title: 'Профиль',
        link: 'Profile',
    },
    {
        title: 'Ошибка 404',
        link: 'Error404',
    },
    {
        title: 'Ошибка 500',
        link: 'Error500',
    },
];

const chatMessages: Message[] = [
    {
        direction: 'to',
        type: 'text',
        time: '08:13',
        status: 'unread',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda cumque, deserunt, dignissimos dolores exercitationem explicabo id ipsam laborum laudantium molestiae porro quis quisquam quos saepe sed sunt vero? Labore, repellendus.',

    },
    {
        direction: 'to',
        type: 'text',
        time: '08:14',
        status: 'read',
        content: 'Assumenda cumque, deserunt, dignissimos dolores exercitationem explicabo id ipsam laborum laudantium molestiae porro',
    },
    {
        direction: 'from',
        type: 'text',
        time: '08:17',
        status: 'unread',
        content: 'Go to',
    }
];
export const chatList: Discussant[] = [
    {
        id: 1,
        name: 'Рафик Непричёмкин',
        date: '15:30',
        count: 2,
        text: 'Go to',
        image: '/images/user.webp',
        messages: chatMessages,
    },
    {
        id: 2,
        name: 'Альберт Душный',
        date: '13:01',
        count: 6,
        text: 'Labore, repellendus.',
        image: '/images/user.webp',
        messages: chatMessages,
    },
    {
        id: 3,
        name: 'Алёна Кораблёва',
        date: '11:33',
        count: 12,
        text: 'Consectetur adipisicing elit. Assumenda cumque, deserunt.',
        image: '/images/user.webp',
        messages: chatMessages,
    },
    {
        id: 4,
        name: 'Владимир Уточкин',
        date: '09:02',
        count: 3,
        text: 'Saepe sed sunt vero?',
        image: '/images/user.webp',
        messages: chatMessages,
    },
    {
        id: 5,
        name: 'Соня Прищепкина',
        date: '06:00',
        count: 3,
        text: 'синие тапочки.',
        image: '/images/user.webp',
        messages: chatMessages,
    }
];

export const profileData: Record<string, string> = {
    first_name: 'Игнат',
    second_name: 'Ёжиков',
    email: 'test@yandex.ru',
    login: 'mylogin',
    nic_name: 'i_yozh',
    phone: '+7 (987) 654 32 11',
};

/**
 * Список свойств полей ввода
 */
export const fieldsParams: InputParams[] = [
    {
        name: 'login',
        label: 'Логин',
        type: 'email',
        required: 'required',
        error: '',
    }, {
        name: 'first_name',
        label: 'Имя',
        type: 'text',
        required: 'required',
        error: '',
    }, {
        name: 'second_name',
        label: 'Фамилия',
        type: 'text',
        required: 'required',
        error: '',
    }, {
        name: 'email',
        label: 'Почта',
        type: 'email',
        required: 'required',
        error: '',
    }, {
        name: 'phone',
        label: 'Телефон',
        type: 'text',
        required: 'required',
        error: '',
    }, {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        required: 'required',
        error: '',
    }, {
        name: 'oldPassword',
        label: 'Старый пароль',
        type: 'password',
        required: 'required',
        error: '',
    }, {
        name: 'newPassword',
        label: 'Новый пароль',
        type: 'password',
        required: 'required',
        error: '',
    }, {
        name: 'password2',
        label: 'Пароль (ещё раз)',
        type: 'password',
        required: 'required',
        error: '',
    },
    {
        name: 'nic_name',
        label: 'Имя в чате',
        type: 'text',
        required: 'required',
        error: '',
    },
    {
        name: 'avatar',
        label: 'Аватар',
        type: 'file',
        required: 'required',
        error: '',
    },
];
export const inputLabels: Record<string, string> = {
    first_name: 'Имя',
    second_name: 'Фамилия',
    email: 'Почта',
    login: 'Логин',
    nic_name: 'Имя в чате',
    phone: 'Телефон',
};

export function getLabelByName(name: string): string {
    if (name in inputLabels) {
        return inputLabels[name as keyof typeof inputLabels];
    }
    return '';
}

export function getFieldParams(arrFieldName: string[]): InputParams[] {
    const arParams: InputParams[] = [];
    arrFieldName.forEach(fieldName => {
        const field: InputParams | undefined = fieldsParams.find((fieldRow: InputParams) => fieldRow.name === fieldName);
        if (field) {
            arParams.push(field);
        }
    });
    return arParams;
}

export const URL = {
    API: 'https://ya-praktikum.tech/api/v2',
    WS: 'wss://ya-praktikum.tech/ws/chats'
};
