import type { NextApiRequest, NextApiResponse } from 'next';

export type ContactFormType = 'contact' | 'application' | 'newsletter' | 'feedback';

type Body = {
  formType?: ContactFormType;
  fullName?: string;
  email?: string;
  phoneCountry?: string;
  phoneNumber?: string;
  company?: string;
  message?: string;
};

function validate(body: Body) {
  const errors: Record<string, string> = {};
  if (!body.fullName || !body.fullName.trim() || body.fullName.trim().length < 2) {
    errors.fullName = 'Full name is required and must be at least 2 characters';
  }
  if (!body.email || !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(body.email)) {
    errors.email = 'Valid email is required';
  }
  if (!body.message || !body.message.trim() || body.message.trim().length < 10) {
    errors.message = 'Please provide a more detailed message (min 10 characters)';
  }
  if (body.phoneNumber && !/^\d{7,15}$/.test(body.phoneNumber)) {
    errors.phoneNumber = 'Enter a valid phone number';
  }
  return errors;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const body: Body = req.body ?? {};
  const errors = validate(body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const base =
      process.env.PAYLOAD_SERVER_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      `http://localhost:${process.env.PORT ?? 3000}`;

    const resp = await fetch(new URL('/api/payload/api/cms-contacts', base).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType: body.formType ?? 'contact',
        fullName: body.fullName,
        email: body.email,
        phoneCountry: body.phoneCountry,
        phoneNumber: body.phoneNumber,
        company: body.company,
        message: body.message,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      // Propagate error message where possible.
      return res.status(502).json({ error: 'Failed to save contact submission', detail: text });
    }

    const json = await resp.json();
    return res.status(201).json({ ok: true, id: json?.doc?.id ?? json?.id ?? null });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Contact submit error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}

