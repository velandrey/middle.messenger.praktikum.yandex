export type PageLinkProps = {
    title: string,
    link: string,
    class?: string;
}
export const pages:PageLinkProps[] = [
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
export const chatList = [
    {
        name: 'Рафик Непричёмкин',
        date: '15:30',
        count: 2,
        text: 'Go to',
        image: '/images/user.webp',
    },
    {
        name: 'Альберт Душный',
        date: '13:01',
        count: 6,
        text: 'Labore, repellendus.',
        image: '/images/user.webp',
    },
    {
        name: 'Алёна Кораблёва',
        date: '11:33',
        count: 12,
        text: 'Consectetur adipisicing elit. Assumenda cumque, deserunt.',
        image: '/images/user.webp',
    },
    {
        name: 'Владимир Уточкин',
        date: '09:02',
        count: 3,
        text: 'Saepe sed sunt vero?',
        image: '/images/user.webp',
    },
    {
        name: 'Соня Прищепкина',
        date: '06:00',
        count: 3,
        text: 'синие тапочки.',
        image: '/images/user.webp',
    }
];
export const chatMessages = [
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

export const profileData = {
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
export const fieldsParams = [
    {
        type: 'text',
        name: 'login',
        label: 'Логин',
        required: 'required',
    },{
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        required: 'required',
    },{
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        required: 'required',
    },{
        type: 'email',
        name: 'email',
        label: 'Почта',
        required: 'required',
    },{
        type: 'text',
        name: 'phone',
        label: 'Телефон',
        required: 'required',
    },{
        type: 'password',
        name: 'password',
        label: 'Пароль',
        required: 'required',
    },{
        type: 'password',
        name: 'password2',
        label: 'Пароль (ещё раз)',
        required: 'required',
    },
    {
        type: 'text',
        name: 'nic_name',
        label: 'Имя в чате',
        required: 'required',
    },
    {
        type: 'text',
        name: 'avatar',
        label: 'Аватар',
        required: 'required',
    },
];
export const inputLabels = {
    first_name: 'Имя',
    second_name: 'Фамилия',
    email: 'Почта',
    login: 'Логин',
    nic_name: 'Имя в чате',
    phone: 'Телефон',
};
export function getLabelByName(name:string):string{
    if(name in inputLabels){
        return inputLabels[name as keyof typeof inputLabels];
    }
    return '';
}