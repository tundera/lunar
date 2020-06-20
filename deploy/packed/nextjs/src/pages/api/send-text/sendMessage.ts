import { Twilio } from 'twilio';

export default async (messageBody: string) => {
  try {
    const accountSid = `${process.env.TWILIO_ACCOUNT_SID}`;
    const authToken = `${process.env.TWILIO_AUTH_TOKEN}`;

    const client = new Twilio(accountSid, authToken);

    const newMessage = await client.messages.create({
      body: messageBody,
      to: `${process.env.TWILIO_SMS_RECIPIENT_NUMBER}`, // Text this number
      from: `${process.env.TWILIO_SMS_SENDER_NUMBER}`, // From a valid Twilio number
    });

    console.log(newMessage.sid);
  } catch (err) {
    throw new Error(err);
  }
};
