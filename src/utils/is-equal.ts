import {PlainObject} from "@/utils/types";

function isPlainObject(value: unknown): value is PlainObject {
    return typeof value === 'object'
        && value !== null
        && value.constructor === Object
        && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is unknown[] | PlainObject {
    return isPlainObject(value) || isArray(value);
}

function isEqual(lhs: PlainObject | unknown[], rhs: PlainObject | unknown[]): boolean {
    if (Object.keys(lhs).length !== Object.keys(rhs).length) {
        return false;
    }

    for (const [key, value] of Object.entries(lhs)) {
        const rightValue = (rhs as PlainObject)[key];

        if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
            if (isEqual(value as PlainObject | unknown[], rightValue as PlainObject | unknown[])) {
                continue;
            }
            return false;
        }

        if (value !== rightValue) {
            return false;
        }
    }

    return true;
}

export default isEqual;
