import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = "syriana77@naver.com";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email, message } = (req.body ?? {}) as {
    email?: string;
    message?: string;
  };

  if (!email || !message) {
    return res.status(400).json({ error: "email과 message는 필수입니다." });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: "올바른 이메일 형식이 아닙니다." });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: "메시지가 너무 깁니다." });
  }

  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: TO_EMAIL,
      replyTo: email,
      subject: `[Portfolio] ${email}님의 새 메시지`,
      text: `보낸 사람: ${email}\n\n${message}`,
    });

    if (error) {
      console.error(error);
      return res.status(502).json({ error: "메일 발송에 실패했습니다." });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "서버 오류가 발생했습니다." });
  }
}
