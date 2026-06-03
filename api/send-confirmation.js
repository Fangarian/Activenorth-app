function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { to, name, activity, departure, children } = req.body;

  if (!to || !name) return res.status(400).json({ error: 'Missing required fields' });
  if (!EMAIL_RE.test(to)) return res.status(400).json({ error: 'Invalid recipient address' });

  const childrenHtml = children && children.length > 0
    ? `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #d4e4e0;color:#6a8a82;font-size:14px;width:130px;">Children</td>
        <td style="padding:10px 0;border-bottom:1px solid #d4e4e0;color:#04342C;font-size:14px;font-weight:600;">
          ${children.map(c => `${escHtml(c.name)} (age&nbsp;${escHtml(String(c.age))})`).join('<br>')}
        </td>
      </tr>`
    : '';

  const departureRow = departure
    ? `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #d4e4e0;color:#6a8a82;font-size:14px;">Departure</td>
        <td style="padding:10px 0;border-bottom:1px solid #d4e4e0;color:#04342C;font-size:14px;font-weight:600;">${departure}</td>
      </tr>`
    : '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F0F4F3;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0F4F3;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #d4e4e0;">

        <!-- Header -->
        <tr>
          <td style="background:#04342C;padding:28px 32px;">
            <p style="margin:0;font-size:22px;font-weight:800;color:#9FE1CB;letter-spacing:-0.5px;">Activenorth</p>
            <p style="margin:4px 0 0;font-size:13px;color:#6a9a90;">Skibotn, Norway</p>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="padding:32px 32px 24px;">
            <p style="margin:0 0 8px;font-size:22px;font-weight:700;color:#04342C;">Declaration signed ✓</p>
            <p style="margin:0 0 24px;font-size:15px;color:#6a8a82;line-height:1.6;">
              Hi ${name}, your guest declaration for Activenorth has been recorded. You're all set!
            </p>

            <!-- Summary table -->
            <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #d4e4e0;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #d4e4e0;color:#6a8a82;font-size:14px;width:130px;">Activity</td>
                <td style="padding:10px 0;border-bottom:1px solid #d4e4e0;color:#04342C;font-size:14px;font-weight:600;">${activity || '—'}</td>
              </tr>
              ${departureRow}
              ${childrenHtml}
            </table>

            <p style="margin:24px 0 0;font-size:15px;color:#1a1a1a;line-height:1.6;">
              You don't need to do anything else — see you on the adventure!
            </p>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F0F4F3;padding:20px 32px;border-top:1px solid #d4e4e0;">
            <p style="margin:0;font-size:12px;color:#6a8a82;">Activenorth · Skibotn, Norway</p>
            <p style="margin:4px 0 0;font-size:12px;color:#6a8a82;">This is an automated confirmation — please do not reply to this email.</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Activenorth <noreply@activenorth.no>',
        to: [to],
        subject: 'Your Activenorth declaration – signed ✓',
        html,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Resend error:', err);
      return res.status(500).json({ error: 'Email delivery failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('send-confirmation error:', e);
    return res.status(500).json({ error: 'Internal error' });
  }
}
