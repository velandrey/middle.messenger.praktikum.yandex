import {Context} from "./utils/types";
import Block from "@/utils/block";


import {Auth, Chat, Error404, Error500, Profile, Registration} from './pages';
import {PageLinkProps, pages} from "@/utils/data";
import {initModal} from "@/pages/profile";

export default class App {

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
        let block: Block | null = null;
        if (this.page === 'Registration') {
            block = new Registration(context);
        } else if (this.page === 'Chat') {
            block = new Chat(context);
        } else if (this.page === 'Error404') {
            block = new Error404(context);
        } else if (this.page === 'Error500') {
            block = new Error500(context);
        } else if (this.page === 'Profile') {
            context.full_name = 'Игнат Ёжиков';
            context.image = '/images/user.webp';
            block = new Profile(context);
        } else {
            block = new Auth(context);
        }
        if (block){
            this.render(block);
        }
        this.addEventHandlers();
    }

    render(componentBlock:Block) {
        if(this.appElement){
            componentBlock.dispatchComponentDidMount();
            const html = componentBlock.getContent()
            while (this.appElement.firstChild) {
                this.appElement.removeChild(this.appElement.firstChild);
            }
            this.appElement.appendChild(html);
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

    getPagesList():PageLinkProps[] {
        return pages.map((item) => {
            const className = (this.page === item.link) ? 'active' : '';
            return {...item, class: className};
        });
    }

    getPageTitle():string {
        const objPage:PageLinkProps | undefined = pages.find(item => item.link === this.page);
        return (typeof(objPage) ==='object' && objPage.title) ? objPage.title : '';
    }
}
