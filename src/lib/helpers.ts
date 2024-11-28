import { SetURLSearchParams } from "react-router-dom";

export type NoseurObject<T> = { [key: string]: T; };
export type URLSearchParamsValue = string | string[] | number | number[] | undefined | null;

export const Helpers = {

    updateSearchParams(key: string, value: URLSearchParamsValue, setSearchParams: SetURLSearchParams | URLSearchParams, cb?: Function | undefined) {
        const fun = (prev: URLSearchParams) => {
            if (value === undefined || value === null) {
                prev.delete(key);
            } else if (Array.isArray(value)) {
                prev.delete(key);
                for (const v of value) prev.append(key, `${v}`);
            } else {
                prev.set(key, `${value}`);
            }
            return prev;
        };
        if (setSearchParams instanceof URLSearchParams) fun(setSearchParams);
        else setSearchParams(fun);
        cb && cb();
    },

    normalizeUrlParams(urlSearchParams: URLSearchParams, keyLookupMap: NoseurObject<string> = {}, extraParams: NoseurObject<string | number> = {}) {
        const params: NoseurObject<any> = {};
        Object.keys(Object.fromEntries(urlSearchParams)).forEach((key: string) => {
            const lookupKey = keyLookupMap[key] ?? key;
            const values = urlSearchParams.getAll(key);
            if (values.length) {
                params[lookupKey] = values.length > 1 ? values : values[0];
            }
        });
        Object.keys(extraParams).forEach((key) => params[key] = extraParams[key])
        return params;
    },

    urlParamsToSearch(urlSearchParams: URLSearchParams, only?: string[], includes?: NoseurObject<URLSearchParamsValue>) {
        only && only.length && Object.keys(Object.fromEntries(urlSearchParams)).forEach((key: string) => {
            if (!only.includes(key)) urlSearchParams.delete(key);
        });
        if (includes) {
            Object.keys(includes).forEach((key: string) => Helpers.updateSearchParams(key, includes[key], urlSearchParams));
        }
        return urlSearchParams.toString();
    }

}