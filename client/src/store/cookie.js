// const Cookie = {
//     getCookie(name, parse = false) {
//         let matches = document.cookie.match(new RegExp(
//             "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
//         ));
//         if (parse) {
//             return this.parseException(matches ? decodeURIComponent(matches[1]) : undefined)
//         } else {
//             return matches ? decodeURIComponent(matches[1]) : undefined;
//         }
//     },
//
//     setCookie(name, value, options = {}) {
//         console.log(value)
//         options = {
//             path: '/',
//             // при необходимости добавьте другие значения по умолчанию
//             ...options
//         };
//
//         if (options.expires instanceof Date) {
//             options.expires = options.expires.toUTCString();
//         }
//
//         let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
//
//         for (let optionKey in options) {
//             updatedCookie += "; " + optionKey;
//             let optionValue = options[optionKey];
//             if (optionValue !== true) {
//                 updatedCookie += "=" + optionValue;
//             }
//         }
//         console.log(updatedCookie)
//         document.cookie = updatedCookie;
//     },
//
//
//     deleteCookie(name) {
//         this.setCookie(name, "", {
//             'max-age': -1
//         })
//     },
//
//     parseException(value) {
//         try {
//             return JSON.parse(value);
//         } catch (e) {
//             return null;
//         }
//     }
// };
export default class Coockies {

    static getCookie(name, parse = false) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        if (parse) {
            return Coockies.#parseException(matches ? decodeURIComponent(matches[1]) : undefined)
        } else {
            return matches ? decodeURIComponent(matches[1]) : undefined;
        }
    }

    static setCookie(name, value, options = {}) {
        console.log(value)
        options = {
            path: '/',
            // при необходимости добавьте другие значения по умолчанию
            ...options
        };

        if (options.expires instanceof Date) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }
        console.log(updatedCookie)
        document.cookie = updatedCookie;
    }

    static deleteCookie(name) {
        this.setCookie(name, "", {
            'max-age': -1
        })
    }

    static #parseException(value) {
        try {
            return JSON.parse(value);
        } catch (e) {
            return null;
        }
    }
};