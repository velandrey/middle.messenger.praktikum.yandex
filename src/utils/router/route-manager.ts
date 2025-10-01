import Block from "@/utils/block";
import {Route} from "@/utils/router/route";
import AuthController from "@/controllers/auth-controller";
import {Routes} from "@/utils/router/routes";

class RouteManager {
    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;

    constructor() {
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
    }

    public use(pathname: string, block: Block) {
        const route = new Route(pathname, block);
        this.routes.push(route);
        return this;
    }

    public start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    public async _onRoute(pathname: string) {
        const arRoutes:string[] = Object.values(Routes);
        const route = this.getRoute(pathname);
        if (arRoutes.includes(pathname)) {
            const userIsAuth = await AuthController.checkUserIsAuth();
            if (userIsAuth) {
                if (pathname === Routes.ROOT || pathname === Routes.REGISTRATION) {
                    this.go(Routes.CHAT);
                }
            } else {
                if (pathname === Routes.CHAT) {
                    this.go(Routes.ROOT);
                }
            }
        } else {
            this.go(Routes.ERROR_NOT_FOUND);
        }
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        if(route){
            this._currentRoute = route;
            route.render();
        }
    }

    public go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    public back() {
        this.history.back();
    }

    public forward() {
        this.history.forward();
    }

    public getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}

export default new RouteManager();
