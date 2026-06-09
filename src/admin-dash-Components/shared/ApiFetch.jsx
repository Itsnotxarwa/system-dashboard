const apiFetch = async (url, options = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
        headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        ...options.headers,
        },
    });

    // 2. If 401 → try to refresh the cookie
    if (response.status === 401) {
        const refreshResponse = await fetch("https://api.mazia.ai/auth/refresh", {
        method: "POST",
        credentials: "include", 
        });

        if (!refreshResponse.ok) {
        window.location.href = "https://auth.mazia.ai/"; 
        return;
        }

        return fetch(url, {
        ...options,
        credentials: "include",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            ...options.headers,
        },
        });
    }
    
    return response;
};

export default apiFetch;