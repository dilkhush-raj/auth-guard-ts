import {Request, Response} from 'express';
import {Otp, User} from '../models';
import {sendEmail, otpEmailTemplate} from '../services';
import {generateOTP, isValidEmail} from '../utils';

interface OtpDocument {
  _id: any;
  email: string;
  otp: string;
  sent: boolean;
}

interface EmailPayload {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const validateEmailAndUser = async (
  email: string,
  name?: string
): Promise<string> => {
  if (!email || (name === undefined && !name)) {
    throw new Error('Missing required fields');
  }

  const formattedEmail = email.toLowerCase().trim();

  if (!isValidEmail(formattedEmail)) {
    throw new Error('Invalid email format');
  }

  const existingUser = (await User.findOne({
    email: formattedEmail,
  })) as {
    email: string;
  } | null;
  if (existingUser) {
    throw new Error('User already exists');
  }

  return formattedEmail;
};

const getOrCreateOtp = async (email: string) => {
  let otp = (await Otp.findOne({email})) as OtpDocument | null;
  if (!otp) {
    const newOtp = generateOTP();
    otp = (await Otp.create({email, otp: newOtp})) as OtpDocument;
    if (!otp) {
      throw new Error('Failed to generate OTP');
    }
  }
  return otp;
};

const sendOtpEmail = async (
  email: string,
  otp: string,
  name: string = email
): Promise<void> => {
  const emailPayload: EmailPayload = {
    from: `Auth Guard TS <${process.env.EMAIL}>`,
    to: email,
    subject: 'Your OTP for Auth Guard TS',
    html: otpEmailTemplate({name, otp}),
  };

  const sentEmail = await sendEmail(emailPayload);

  if (sentEmail) {
    await Otp.updateOne({email}, {sent: true});
  }
};

const sendVerificationEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {email, name} = req.body as {email: string; name: string};
    const formattedEmail = await validateEmailAndUser(email, name);
    const otp = await getOrCreateOtp(formattedEmail);

    if (otp.sent) {
      res.status(409).json({error: 'OTP already sent, check your email!'});
      return;
    }

    await sendOtpEmail(formattedEmail, otp.otp, name);
    res.status(200).json({success: true});
  } catch (error) {
    res.status(400).json({error: (error as Error).message});
  }
};

const resendVerificationEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {email, name} = req.body as {email: string; name: string};
    const formattedEmail = await validateEmailAndUser(email, name);
    const otp = await getOrCreateOtp(formattedEmail);

    await sendOtpEmail(formattedEmail, otp.otp, name);
    res.status(200).json({success: true});
  } catch (error) {
    res.status(400).json({error: (error as Error).message});
  }
};

const verifyEmailOtp = async (req: Request, res: Response): Promise<void> => {
  try {
    const {email, otp} = req.body as {email: string; otp: string};

    if (!email || !otp) {
      res.status(400).json({error: 'Missing required fields'});
      return;
    }

    const formattedEmail = email.toLowerCase().trim();

    if (!isValidEmail(formattedEmail)) {
      res.status(400).json({error: 'Invalid email format'});
      return;
    }

    const otpRecord = (await Otp.findOne({
      email: formattedEmail,
    })) as OtpDocument | null;

    if (!otpRecord) {
      res
        .status(404)
        .json({error: 'No OTP found for this email, it may have expired'});
      return;
    }

    if (otpRecord.otp !== otp) {
      res.status(400).json({error: 'Invalid OTP'});
      return;
    }

    res
      .status(200)
      .json({success: true, message: 'Email verified successfully'});
  } catch (error) {
    res.status(500).json({error: (error as Error).message});
  }
};

export {sendVerificationEmail, resendVerificationEmail, verifyEmailOtp};
