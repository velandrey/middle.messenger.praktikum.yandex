import {EventBus} from "@/utils/event-bus";
import {State} from "@/utils/types";

export enum StoreEvents {
    Updated = 'updated',
}

class Store extends EventBus {
    private _state: State = {
        loading: false,
        user: null,
    };

    public getState(): State {
        return this._state;
    }

    public set<K extends keyof State>(path: K, value: State[K]): void {
        if (path in this._state) {
            this._state[path] = value;
            this.emit(StoreEvents.Updated);
        }
    }
}

export default new Store();
