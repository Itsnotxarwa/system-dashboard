const apiFetch = async (url, options = {}) => {
    const buildOptions = (opts) => ({
        ...opts,
        credentials: "include",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            ...opts.headers,
        },
    });

    const response = await fetch(url, buildOptions(options));

    if (response.status === 401) {
        console.log("[apiFetch] Access token expired, attempting refresh...");

        const refreshResponse = await fetch("https://api.mazia.ai/auth/refresh", {
            method: "POST",
            credentials: "include",
        });

        console.log("[apiFetch] Refresh response status:", refreshResponse.status);

        const refreshBody = await refreshResponse.clone().json().catch(() => null);
        console.log("[apiFetch] Refresh response body:", refreshBody);


        if (refreshResponse.status === 401) {
            console.warn("[apiFetch] Refresh token rejected → session expired");
            window.location.href = "/session-expired";
            return;
        }

        if (!refreshResponse.ok) {
            throw new Error(`Token refresh failed: ${refreshResponse.status}`);
        }

        console.log("[apiFetch] Refresh succeeded, retrying original request...");
        const retryResponse = await fetch(url, buildOptions(options));
        console.log("[apiFetch] Retry response status:", retryResponse.status);

        if (retryResponse.status === 401) {
            window.location.href = "/session-expired";
            return;
        }


        return retryResponse;
    }

    return response;
};

export default apiFetch;