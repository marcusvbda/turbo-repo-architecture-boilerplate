import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })

  send(to: string, subject: string, html: string) {
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM ?? 'noreply@app.com',
      to,
      subject,
      html,
    })
  }
}
