import Handlebars from 'handlebars';
import * as Layout from './layout';
import * as Components from './components';
import * as Pages from './pages';
import {initModal} from './layout/popup';
import {Context, Page} from "../types";

Object.entries(Layout).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});
Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});
export default class App {
    PAGES:Page[] = [
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
    private page: string;
    readonly appElement: HTMLElement | null;

    constructor() {
        this.page = 'Auth';
        this.appElement = document.getElementById('app');
    }

    load() {
        const context:Context = {
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
            context.image = '/images/user.webp';
            this.render(Pages.Profile, context);
        } else {
            this.render(Pages.Auth, context);
        }
        this.addEventHandlers();
    }

    render(templateString:string, context:Context) {
        const template = Handlebars.compile(templateString);
        const html = template(context);
        const parser = new DOMParser();
        const doc:Document = parser.parseFromString(html, 'text/html');
        const fragment = document.createDocumentFragment();
        if(doc.body.firstChild){
            Array.from(doc.body.firstChild.childNodes).forEach(node => {
                fragment.appendChild(node.cloneNode(true));
            });
            if(this.appElement){
                while (this.appElement.firstChild) {
                    this.appElement.removeChild(this.appElement.firstChild);
                }
                this.appElement.appendChild(fragment);
            }
        }
    }

    addEventHandlers() {
        const elementsLink = document.querySelectorAll('.nav_list_item');
        elementsLink.forEach(element => {
            element.addEventListener('click', (e:Event) => {
                e.preventDefault();
                if (e.target instanceof HTMLElement
                    && e.target.dataset
                    && 'link' in e.target.dataset
                    && typeof e.target.dataset.link === 'string'
                ){
                    this.changePage(e.target.dataset.link);
                }
            });
        });
        initModal();
    }

    changePage(page:string):void {
        this.page = page;
        this.load();
    }

    getPagesList():Page[] {
        return this.PAGES.map((item) => {
            const className = (this.page === item.link) ? 'active' : '';
            return {...item, class: className};
        });
    }

    getPageTitle():string {
        const objPage:Page | undefined = this.PAGES.find(item => item.link === this.page);
        return (typeof(objPage) ==='object' && objPage.title) ? objPage.title : '';
    }
}
