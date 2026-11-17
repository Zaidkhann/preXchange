export const getCurrentUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
        credentials: "include",
        cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
        return null;
    }

    return data.user;
};