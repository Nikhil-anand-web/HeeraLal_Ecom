
import EmailTemplate from '@/components/global/EmailTemplate';
import { Resend } from 'resend';

const rsnd = new Resend(process.env.RESEND_KEY);

export default async function resend(otp,to) {
    try {
      const { data, error } = await rsnd.emails.send({
        from: 'onboarding@resend.dev',
        to: [`${to}`],
        subject: `Varification Code`,
        react: EmailTemplate({ otp: `${otp}` }),
      });
  
      if (error) {
        console.log(error)
        return Response.json({ error }, { status: 500 });
      }
  
      return Response.json(data);
    } catch (error) {
        console.log(error)
      return Response.json({ error }, { status: 500 });
    }
  }