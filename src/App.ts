import Block from "@/utils/block";
import {Auth, Chat, Error404, Error500, Profile, Registration} from './pages';
import {pages} from "@/utils/data";
import {initModal} from "@/pages/profile";
import {PageContext, PageLinkProps} from "@/utils/types";

/**
 * Основной класс приложения.
 * Отвечает за маршрутизацию, базовую сборку и рендеринг.
 */
export default class App {

    /**
     * URI на страницы для псевдомаршрутизации.
     * @private
     */
    private page: string;

    /**
     * HTML элемент для отрисовки приложения
     * @private
     */
    private readonly appElement: HTMLElement | null;

    constructor() {
        this.page = 'Auth';
        this.page = 'Chat';//TODO Remove Chat
        this.appElement = document.getElementById('app');
    }

    /**
     * Точка входа в приложение.
     */
    load() {
        const block: Block = this.getBlockObject();
        this.render(block);
        this.addEventHandlers();
    }

    /**
     * Рендеринг компонента Block.
     * @param componentBlock
     * @private
     */
    private render(componentBlock: Block) {
        if (this.appElement) {
            componentBlock.dispatchComponentDidMount();
            const html = componentBlock.getContent()
            while (this.appElement.firstChild) {
                this.appElement.removeChild(this.appElement.firstChild);
            }
            this.appElement.appendChild(html);
        }
    }

    /**
     * Добавление обработчиков событий.
     * @private
     */
    private addEventHandlers() {
        const elementsLink = document.querySelectorAll('.nav_list_item');
        elementsLink.forEach(element => {
            element.addEventListener('click', (e: Event) => {
                e.preventDefault();
                if (e.target instanceof HTMLElement
                    && e.target.dataset
                    && 'link' in e.target.dataset
                    && typeof e.target.dataset.link === 'string'
                ) {
                    this.changePage(e.target.dataset.link);
                }
            });
        });
        initModal();
    }

    /**
     * Изменить текущую страницу.
     * @param page
     * @private
     */
    private changePage(page: string): void {
        this.page = page;
        this.load();
    }

    /**
     * Сформировать список страниц для навигации с указанием текущей.
     * @private
     */
    private getPagesList(): PageLinkProps[] {
        return pages.map((item) => {
            const className = (this.page === item.link) ? 'active' : '';
            return {...item, class: className};
        });
    }

    /**
     * Получить читабельный заголовок страницы.
     * @private
     */
    private getPageTitle(): string {
        const objPage: PageLinkProps | undefined = pages.find(item => item.link === this.page);
        return (typeof (objPage) === 'object' && objPage.title) ? objPage.title : '';
    }

    /**
     * Получить параметры компонента (контекст).
     * @private
     */
    private getContext(): PageContext {
        return {
            title: this.getPageTitle(),
            pages: this.getPagesList(),
        };
    }

    /**
     * Получить объект компонента в зависимости от страницы.
     * @private
     */
    private getBlockObject(): Block {
        const context: PageContext = this.getContext();
        if (this.page === 'Registration') {
            return new Registration(context);
        } else if (this.page === 'Chat') {
            return new Chat(context);
        } else if (this.page === 'Error404') {
            return new Error404(context);
        } else if (this.page === 'Error500') {
            return new Error500(context);
        } else if (this.page === 'Profile') {
            return new Profile(context);
        } else if (this.page === 'Auth') {
            return new Auth(context);
        }
        return new Auth(context);
    }
}
