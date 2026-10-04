export const sendEmail = async (to, subject, html) => {
    try {
        const res = await fetch(process.env.SENDLIB_API_URL, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.SENDLIB_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: process.env.EMAIL_FROM,
                to,
                subject,
                html
            })
        })

        const data = await res.json()

        if (!res.ok) {
            console.log("Sendlib API Error:", data)
            throw new Error(data.message || "Email sending failed")
        }

        return data
    } catch (error) {
        console.log("Email failed:", error.message)
        throw error
    }
}