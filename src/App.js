import Handlebars from 'handlebars';
import * as Layout from './layout';
import * as Components from './components';
import * as Pages from './pages';
import {initModal} from "./layout/popup/index.js";

Object.entries(Layout).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});
Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});
export default class App {
    PAGES = [
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

    constructor() {
        this.page = 'Auth';
        this.appElement = document.getElementById('app');
    }

    load() {
        const context = {
            title: this.getPageTitle(),
            pages: this.getPagesList(),
        };
        if (this.page === 'Registration') {
            this.render(Pages.Registration, context);
        } else if (this.page === 'Chat') {
            this.render(Pages.Chat, context);
        } else if (this.page === 'Error404') {
            this.render(Pages.Error404, context);
        } else if (this.page === 'Error500') {
            this.render(Pages.Error500, context);
        } else if (this.page === 'Profile') {
            context.full_name = 'Игнат Ёжиков';
            context.image = './assets/images/user.webp';
            this.render(Pages.Profile, context);
        } else {
            this.render(Pages.Auth, context);
        }
        this.addEventHandlers();
    }

    render(templateString, context) {
        const template = Handlebars.compile(templateString);
        const html = template(context);
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const fragment = document.createDocumentFragment();
        Array.from(doc.body.firstChild.childNodes).forEach(node => {
            fragment.appendChild(node.cloneNode(true));
        });
        while (this.appElement.firstChild) {
            this.appElement.removeChild(this.appElement.firstChild);
        }
        this.appElement.appendChild(fragment);
    }

    addEventHandlers() {
        const elementsLink = document.querySelectorAll('.nav__link');
        elementsLink.forEach(element => {
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.changePage(e.target.dataset.link);
            });
        });
        initModal();
    }

    changePage(page) {
        this.page = page;
        this.load();
    }

    getPagesList() {
        return this.PAGES.map((item) => {
            const className = (this.page === item.link) ? 'active' : '';
            return {...item, class: className};
        });
    }

    getPageTitle() {
        const objPage = this.PAGES.find(item => item.link === this.page);
        return (objPage.title) ? objPage.title : '';
    }
}
