const emailLayout = (content, previewText) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PreXchange</title>
</head>

<body style="margin:0;padding:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a;">

    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
        ${previewText}
    </div>

    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9;padding:40px 16px;">
        <tr>
            <td align="center">

                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border-radius:20px;overflow:hidden;border:1px solid #e2e8f0;">

                    <!-- Header -->
                    <tr>
                        <td style="padding:28px 36px;border-bottom:1px solid #e2e8f0;">
                            <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                <tr>
                                    <td>
                                        <div style="font-size:25px;font-weight:800;letter-spacing:-0.5px;color:#0891b2;">
                                            PreXchange
                                        </div>

                                        <div style="margin-top:5px;font-size:12px;color:#94a3b8;">
                                            Buy. Sell. Exchange.
                                        </div>
                                    </td>

                                    <td align="right">
                                        <div style="display:inline-block;padding:7px 12px;background:#ecfeff;border-radius:20px;color:#0891b2;font-size:11px;font-weight:700;">
                                            PREXCHANGE
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- Content -->
                    <tr>
                        <td style="padding:42px 36px;">
                            ${content}
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding:25px 36px;background:#f8fafc;border-top:1px solid #e2e8f0;">

                            <div style="font-size:13px;font-weight:700;color:#334155;margin-bottom:7px;">
                                PreXchange
                            </div>

                            <div style="font-size:12px;line-height:20px;color:#94a3b8;">
                                A simple marketplace to buy, sell and exchange products.
                            </div>

                            <div style="margin-top:16px;font-size:11px;color:#cbd5e1;">
                                © ${new Date().getFullYear()} PreXchange. All rights reserved.
                            </div>

                        </td>
                    </tr>

                </table>

                <div style="margin-top:18px;font-size:11px;color:#94a3b8;">
                    This is an automated email. Please do not reply to this message.
                </div>

            </td>
        </tr>
    </table>

</body>
</html>
`;

export const signupEmail = (userName) =>
    emailLayout(
        `
        <!-- Icon -->
        <div style="width:52px;height:52px;background:#ecfeff;border-radius:14px;text-align:center;line-height:52px;font-size:25px;margin-bottom:24px;">
            ✨
        </div>

        <h1 style="margin:0 0 12px;font-size:30px;line-height:38px;letter-spacing:-0.7px;color:#0f172a;">
            Welcome to PreXchange!
        </h1>

        <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:#475569;">
            Hi <strong style="color:#0f172a;">${userName}</strong>,
        </p>

        <p style="margin:0 0 24px;font-size:15px;line-height:26px;color:#64748b;">
            Your PreXchange account has been successfully created.
            We're excited to have you with us.
        </p>

        <!-- Account Created Card -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;">
            <tr>
                <td style="padding:20px 22px;">

                    <div style="font-size:13px;font-weight:700;color:#334155;margin-bottom:8px;">
                        Your account is ready
                    </div>

                    <div style="font-size:13px;line-height:21px;color:#64748b;">
                        You can now discover products, publish your own listings,
                        connect with sellers and find great deals on PreXchange.
                    </div>

                </td>
            </tr>
        </table>

        <div style="margin-top:28px;">
            <p style="margin:0;font-size:14px;line-height:23px;color:#64748b;">
                Thanks for joining us.
            </p>

            <p style="margin:5px 0 0;font-size:14px;font-weight:700;color:#0891b2;">
                Team PreXchange
            </p>
        </div>
        `,
        "Welcome to PreXchange! Your account has been successfully created."
    );


export const loginEmail = (userName) =>
    emailLayout(
        `
        <!-- Icon -->
        <div style="width:52px;height:52px;background:#ecfdf5;border-radius:14px;text-align:center;line-height:52px;font-size:25px;margin-bottom:24px;">
            🔐
        </div>

        <h1 style="margin:0 0 12px;font-size:30px;line-height:38px;letter-spacing:-0.7px;color:#0f172a;">
            Welcome back!
        </h1>

        <p style="margin:0 0 24px;font-size:16px;line-height:26px;color:#475569;">
            Hi <strong style="color:#0f172a;">${userName}</strong>,
        </p>

        <p style="margin:0 0 24px;font-size:15px;line-height:26px;color:#64748b;">
            You have successfully logged in to your PreXchange account.
            Everything is ready for you.
        </p>

        <!-- Login Status -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:14px;">
            <tr>
                <td style="padding:20px 22px;">

                    <div style="font-size:13px;font-weight:700;color:#166534;margin-bottom:8px;">
                        Login successful
                    </div>

                    <div style="font-size:13px;line-height:21px;color:#4d7c5b;">
                        Your account was accessed successfully.
                        You can continue using PreXchange normally.
                    </div>

                </td>
            </tr>
        </table>

        <!-- Security Notice -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:18px;background:#fff7ed;border:1px solid #fed7aa;border-radius:14px;">
            <tr>
                <td style="padding:17px 20px;">

                    <div style="font-size:12px;line-height:20px;color:#9a3412;">
                        <strong>Didn't log in?</strong><br>
                        If you don't recognize this activity, secure your account
                        immediately by changing your password.
                    </div>

                </td>
            </tr>
        </table>

        <div style="margin-top:28px;">
            <p style="margin:0;font-size:14px;line-height:23px;color:#64748b;">
                Stay safe and happy exchanging.
            </p>

            <p style="margin:5px 0 0;font-size:14px;font-weight:700;color:#0891b2;">
                Team PreXchange
            </p>
        </div>
        `,
        "New login detected on your PreXchange account."
    );


