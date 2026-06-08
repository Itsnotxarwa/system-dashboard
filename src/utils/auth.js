export function handleUnauthorized(status) {
    if (status === 401) {
        window.location.href = "/session-expired";
    }
}