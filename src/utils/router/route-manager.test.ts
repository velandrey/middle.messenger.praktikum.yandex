import { Route } from '@/utils/router/route';
import routeManager from "@/utils/router/route-manager";

jest.mock('@/utils/router/route');
jest.mock('@/controllers/auth-controller');
jest.mock('@/utils/router/routes');


type RouteManagerPrivate = {
    routes: Route[];
    history: History;
    _currentRoute: Route | null;
    _onRoute(pathname: string): Promise<void>;
};

const originalHistoryPushState = history.pushState;
const originalHistoryBack = history.back;
const originalHistoryForward = history.forward;

describe('RouteManager', () => {
    beforeEach(() => {
        history.pushState = jest.fn();
        history.back = jest.fn();
        history.forward = jest.fn();
        (routeManager as unknown as RouteManagerPrivate).routes = [];
        (routeManager as unknown as RouteManagerPrivate)._currentRoute = null;
        jest.clearAllMocks();
    });

    afterEach(() => {
        history.pushState = originalHistoryPushState;
        history.back = originalHistoryBack;
        history.forward = originalHistoryForward;
    });

    it('Метод _onRoute срабатывает с параметром window.location.pathname', () => {
        const onRouteSpy = jest.spyOn(routeManager as unknown as RouteManagerPrivate, '_onRoute');
        routeManager.start();
        expect(onRouteSpy).toHaveBeenCalledWith(window.location.pathname);
    });

    it('Метод go изменяет history', () => {
        const pathname = '/new-path';
        routeManager.go(pathname);
        expect(history.pushState).toHaveBeenCalledWith({}, '', pathname);
    });

    it('Метода back обращается к history.back', () => {
        routeManager.back();
        expect(history.back).toHaveBeenCalled();
    });

    it('Метод forward обращается к history.forward', () => {
        routeManager.forward();
        expect(history.forward).toHaveBeenCalled();
    });
});
