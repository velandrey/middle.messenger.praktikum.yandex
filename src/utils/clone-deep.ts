import { PlainObject } from "@/utils/types";

export function cloneDeep<T extends PlainObject>(obj: T): T {
    function _cloneDeep<T>(item: T): T {
        // Handle primitive types
        if (item === null || typeof item !== "object") {
            return item;
        }

        // Handle Date
        if (item instanceof Date) {
            return new Date(item.valueOf()) as unknown as T;
        }

        // Handle Array
        if (Array.isArray(item)) {
            return item.map((element) => _cloneDeep(element)) as unknown as T;
        }

        // Handle Set
        if (item instanceof Set) {
            const copy = new Set();
            item.forEach(v => copy.add(_cloneDeep(v)));
            return copy as unknown as T;
        }

        // Handle Map
        if (item instanceof Map) {
            const copy = new Map();
            item.forEach((v, k) => copy.set(k, _cloneDeep(v)));
            return copy as unknown as T;
        }

        // Handle Object
        if (typeof item === "object" && item !== null) {
            const copy: PlainObject = {};

            // Handle Object.symbol
            Object.getOwnPropertySymbols(item).forEach(s => {
                copy[s.toString()] = _cloneDeep((item as PlainObject)[s.toString()]);
            });

            // Handle Object.name (other)
            Object.keys(item).forEach(k => {
                copy[k] = _cloneDeep((item as PlainObject)[k]);
            });

            return copy as unknown as T;
        }

        throw new Error(`Невозможно скопировать объект: ${item}`);
    }

    return _cloneDeep(obj);
}
