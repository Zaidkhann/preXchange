export const getCurrentUser = async () => {
    const res = await fetch("http://localhost:5000/api/auth/me", {
        credentials: "include",
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        return null;
    }

    return data.user;
};