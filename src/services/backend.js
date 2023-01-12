const backend_url = "http://localhost:8000";
/**
 * Object to interact with the backend.
 * Errors are generally returned as an object with an "error" field and string value of what went wrong.
 */
export const backend = {
    signup: (email, password, username) => signup(email, password, username),
    login: (email, password) => login(email, password),
    loadSession: () => load_session(),
    invalidateSession: () => invalidate_session(),
}

/**
 * Success: Object with profile field containing profile values (username, display_name...)
 * Fail: Object with error field and string value of what went wrong.
 */
async function load_session() {
    try {
        return await fetch(backend_url + "/session/load", {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            }
        }).then(async (response) => {
            if (response.ok) return await response.json().then((profile) => {
                return {
                    profile
                };
            });
            else return await response.json().then((error) => error)
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: Object with profile field containing profile values (username, display_name...)
 * Fail: Object with error field and string value of what went wrong.
 * @param email An email
 * @param password A password
 */
async function login(email, password) {
    try {
        return await fetch(backend_url + "/users/signin", {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            })
        }).then(async (response) => {
            if (response.ok) return await response.json().then((profile) => {
                return {
                    profile
                };
            });
            else return await response.json().then((error) => error)
        })
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: true if the session was successfully invalidated
 * Fail: Object with error field and string value of what went wrong.
 */
async function invalidate_session() {
    try {
        return await fetch(backend_url + "/session/invalidate", {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            }
        }).then(async (response) => {
            if (response.ok) return true;
            else return await response.json().then((error) => error)
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: Object with profile field containing profile values (username, display_name...)
 * Fail: Object with error field and string value of what went wrong.
 * @param email An email
 * @param password A password
 * @param username Desired username
 */
async function signup(email, password, username) {
    try {
        return await fetch(backend_url + "/users/signup", {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        }).then(async (response) => {
            if (response.ok) return await response.json().then((profile) => {
                return {
                    profile
                }
            });
            else return await response.json().then((error) => error)
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}