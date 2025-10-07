import {Auth, chatPage, Error404, Error500, profilePage, Registration} from './pages';
import {Routes} from "@/utils/router/routes";
import routeManager from "@/utils/router/route-manager";


/**
 * Основной класс приложения.
 * Отвечает за маршрутизацию, базовую сборку и рендеринг.
 */
export default class App {

    constructor() {

    }

    /**
     * Точка входа в приложение.
     */
    public async load() {
        routeManager
            .use(Routes.ROOT, new Auth({}))
            .use(Routes.REGISTRATION, new Registration({}))
            .use(Routes.PROFILE, new profilePage({}))
            .use(Routes.CHAT, new chatPage({}))
            .use(Routes.ERROR_NOT_FOUND, new Error404({}))
            .use(Routes.ERROR_SERVER, new Error500({}))
        ;
        routeManager.start();
    }
}
