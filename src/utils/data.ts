import {InputParams} from "@/utils/types";

/**
 * Список свойств полей ввода
 */
export const fieldsParams: InputParams[] = [
    {
        name: 'login',
        label: 'Логин',
        type: 'text',
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
        name: 'display_name',
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
    display_name: 'Имя в чате',
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
} as const;

export const defaultPath = {
    avatar: '/images/user.webp'
} as const;
