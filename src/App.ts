import {Auth, Chat, Error404, Error500, Profile, Registration} from './pages';
import {Routes} from "@/utils/router/routes";
import {Router} from "@/utils/router/router";


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
    load() {
        const router = new Router();
        router
            .use(Routes.AUTH, new Auth({}))
            .use(Routes.REGISTRATION, new Registration({}))
            .use(Routes.PROFILE, new Profile({}))
            .use(Routes.CHAT, new Chat({}))
            .use(Routes.ERROR_NOT_FOUND, new Error404({}))
            .use(Routes.ERROR_SERVER, new Error500({}))
        ;

        router.start();

        //TODO тут тоже бредовый код который надо удалить
        // const userIsAuth = false;
        // if (!userIsAuth) {
        //     router.go(Routes.AUTH);
        // }
    }
}
