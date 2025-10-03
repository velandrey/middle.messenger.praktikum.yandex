import {PlainObject} from "@/utils/types";

export function cloneDeep<T extends PlainObject>(obj: T): T {
    function _cloneDeep<T>(item: T): T {
        if (item === null || typeof item !== "object") {
            return item;
        }

        if (item instanceof Date) {
            return new Date(item.valueOf()) as unknown as T;
        }

        if (Array.isArray(item)) {
            return item.map((element) => _cloneDeep(element)) as unknown as T;
        }

        if (item instanceof Set) {
            const copy = new Set();
            item.forEach(v => copy.add(_cloneDeep(v)));
            return copy as unknown as T;
        }

        if (item instanceof Map) {
            const copy = new Map();
            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
            return copy as unknown as T;
        }

        if (typeof item === "object") {
            const copy: PlainObject = {};

            Object.getOwnPropertySymbols(item).forEach(s => {
                copy[s.toString()] = _cloneDeep((item as PlainObject)[s.toString()]);
            });

            Object.keys(item).forEach(k => {
                copy[k] = _cloneDeep((item as PlainObject)[k]);
            });

            return copy as unknown as T;
        }

        throw new Error(`Невозможно скопировать объект: ${item}`);
    }

    return _cloneDeep(obj);
}
