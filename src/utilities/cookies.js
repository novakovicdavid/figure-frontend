// export function cookieExists(name) {
//     return document.cookie.split(';').some(cookie => {
//         return cookie.trim().startsWith(name + "=");
//     });
// }

// export function setCookie(name, value, expiresInDays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
//     let expires = "expires="+ d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }