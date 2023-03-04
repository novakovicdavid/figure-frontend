export const backend_url = process.env.REACT_APP_BACKEND_URL;

/**
 * Object to interact with the backend.
 * Errors are generally returned as an object with an "error" field and string value of what went wrong.
 */
export const backend = {
    signup: (email, password, username) => signup(email, password, username),
    login: (email, password) => login(email, password),
    loadSession: () => load_session(),
    invalidateSession: () => invalidate_session(),

    get_figure: (figure_id) => get_figure(figure_id),
    get_first_browse_figures: (profile_id) => get_first_browse_figures(profile_id),
    get_figures_after_id: (figure_id, profile_id) => get_figures_after_id(figure_id, profile_id),
    get_profile: (id) => get_profile(id),
    upload_figure: (title, description, file) => upload_figure(title, description, file),
    updateProfile: (displayName, bio, banner, profilePicture) => updateProfile(displayName, bio, banner, profilePicture),

    get_total_profiles_count: () => get_total_profiles_count(),
    get_total_figures_count: () => get_total_figures_count(),
    get_landing_page_figures: () => get_landing_page_figures(),

    get_total_figures_by_profile: (id) => get_total_figures_by_profile(id)
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
            return await response.json().then((response) => response);
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
            return await response.json().then((response) => response);
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
            else return await response.json().then((error) => error);
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
            return await response.json().then((response) => response);
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: Object with figure field containing figure values (title, description...)
 * Fail: Object with error field and string value of what went wrong.
 * @param figure_id The id of the figure to retrieve
 */
async function get_figure(figure_id) {
    try {
        return await fetch(backend_url + "/figures/" + figure_id, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            }
        }).then(async (response) => {
            return await response.json().then((response) => response);
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: Array of the latest Figures with their values
 * Fail: Object with error field and string value of what went wrong.
 * @param profile_id (Optional) The id of the profile you want to get figures of
 */
async function get_first_browse_figures(profile_id) {
    let link = backend_url;
    if (profile_id) link = link + "/profile/" + profile_id;
    else link = link + "/figures";
    link = link + "/browse";
    try {
        return await fetch(link, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            }
        }).then(async (response) => {
            return await response.json().then((response) => response);
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 Success: Array of Figures after the specified figure_id with their values
 Fail: Object with error field and string value of what went wrong.
 @param figure_id The id of the figure after which you want to get figures
 @param profile_id (Optional) The id of the profile you want to get figures of
 */
async function get_figures_after_id(figure_id, profile_id) {
    let link = backend_url;
    if (profile_id) link = link + "/profile/" + profile_id;
    else link = link + "/figures";
    link = link + "/browse/" + figure_id;
    try {
        return await fetch(link, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            }
        }).then(async (response) => {
            return await response.json().then((response) => response);
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: Object with profile field containing profile values (username, display_name...)
 * Fail: Object with error field and string value of what went wrong.
 * @param id Id of the profile
 */
async function get_profile(id) {
    try {
        return await fetch(backend_url + "/profiles/" + id, {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            }
        }).then(async (response) => {
            return await response.json().then((response) => response);
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

/**
 * Success: Object with figure_id field containing id of newly created Figure
 * Fail: Object with error field and string value of what went wrong.
 * @param title The title of the new Figure
 * @param description The description of the new Figure
 * @param file The image to upload for the Figure
 */
async function upload_figure(title, description, file) {
    let formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('file', file);
    try {
        return await fetch(backend_url + "/figures/upload", {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
            body: formData
        }).then(async (response) => {
            return await response.json().then((response) => response);
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

async function get_total_profiles_count() {
    try {
        return await fetch(backend_url + "/profiles/count", {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
        }).then(async (response) => {
            return await response.text();
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

async function get_total_figures_count() {
    try {
        return await fetch(backend_url + "/figures/count", {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
        }).then(async (response) => {
            return await response.text();
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

async function get_landing_page_figures() {
    try {
        return await fetch(backend_url + "/figures/landing-page", {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
        }).then(async (response) => {
            return await response.json();
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

async function get_total_figures_by_profile(id) {
    try {
        return await fetch(backend_url + "/profile/" + id + "/total_figures", {
            method: "GET",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
        }).then(async (response) => {
            return await response.text();
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}

async function updateProfile(displayName, bio, banner, profilePicture) {
    let formData = new FormData();
    formData.append('display_name', displayName);
    formData.append('bio', bio);
    formData.append('banner', banner);
    formData.append('profile_picture', profilePicture);
    try {
        return await fetch(backend_url + "/profile/update", {
            method: "POST",
            credentials: 'include',
            headers: {
                Accept: "application/json",
            },
            body: formData
        }).then(async (response) => {
            try {
                return await response.json().then((response) => response);
            }
            catch (e) { return true }
        });
    }
    catch (e) {
        return {error: "network-error"}
    }
}