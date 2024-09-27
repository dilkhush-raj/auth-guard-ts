export const otpEmailTemplate = ({name, otp}: {name: string; otp: string}) => `
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f0f4f8;">
  <table cellpadding="0" cellspacing="0" border="0" width="100%"
    style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
    <tr>
      <td style="padding: 40px 20px; text-align: center;">
        <h1 style="color: #333; font-size: 24px; margin-bottom: 10px;">Hello, ${name}!</h1>
        <p style="color: #666; font-size: 16px; margin-bottom: 30px;">Here's your One-Time Password (OTP)</p>

        <div style="background-color: #f8fafc; border-radius: 8px; padding: 30px; margin-bottom: 30px;">
          <div style="font-size: 36px; font-weight: bold; color: #4a90e2; letter-spacing: 5px; margin-bottom: 20px;">
            ${otp}</div>
        </div>

        <p style="color: #666; font-size: 14px; margin-bottom: 30px;">To finalize your registration, please complete
          your signup within the next 30 minutes. For your security, we kindly ask that you do not share your account
          details or this email with anyone.
        </p>

        <div style="color: #999; font-size: 12px; margin-top: 40px;">
          © 2024 Auth Guard TS. All rights reserved.
        </div>
      </td>
    </tr>
  </table>
</body>`;
