export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let c of ca) {
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// export function setCookie(name, value, expiresInDays) {
//     const d = new Date();
//     d.setTime(d.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
//     let expires = "expires="+ d.toUTCString();
//     document.cookie = name + "=" + value + ";" + expires + ";path=/";
// }