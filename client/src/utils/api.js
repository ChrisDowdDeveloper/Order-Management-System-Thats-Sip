const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "";
/**
 * Defines the default headers for these functions to work with a `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
    try {
        const response = await fetch(url, options);
        if (response.status === 204) {
            return null;
        }
        const payload = await response.json();
        if (payload.error) {
            return Promise.reject({ message: payload.error });
        }
        //console.log(payload.data)
        return payload.data;
    } catch (error) {
        if (error.name !== "AbortError") {
            throw error;
        }
        return Promise.resolve(onCancel);
    }
}

export async function callBot(form, signal) {
    const url = new URL(`${API_BASE_URL}/items`);
    const options = {
        method: "POST",
        headers,
        body: JSON.stringify({ form }),
        signal,
    };
    return await fetchJson(url, { headers, signal }, []);
}

export async function listItems(signal) {
  const url = new URL(`http://localhost:8080/items`);
  return await fetchJson(url, { headers, signal }, [])
}