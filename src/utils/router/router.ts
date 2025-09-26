import Block from "@/utils/block";
import {Route} from "@/utils/router/route";

export class Router {
    private static __instance: Router;
    private routes: Route[] = [];
    private history: History = window.history;
    private _currentRoute: Route | null = null;

    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }
        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        Router.__instance = this;
    }

    use(pathname: string, block: Block) {
        const route = new Route(pathname, block);
        this.routes.push(route);
        return this;
    }

    start() {
        window.onpopstate = () => {
            this._onRoute(window.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (this._currentRoute) {
            this._currentRoute.leave();
        }
        if(route){
            this._currentRoute = route;
            route.render();
        }
    }

    go(pathname: string) {
        this.history.pushState({}, "", pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}
