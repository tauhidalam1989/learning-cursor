import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

type ContactBody = {
  name: string;
  email: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  // Simple, permissive email regex suitable for form validation
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    if (!payload || typeof payload !== 'object') {
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }

    const { name, email, message } = payload as Partial<ContactBody>;

    // Validate fields
    if (!isNonEmptyString(name) || name.length > 200) {
      return NextResponse.json({ error: 'Name is required and must be <= 200 characters' }, { status: 400 });
    }
    if (!isValidEmail(email) || (email as string).length > 254) {
      return NextResponse.json({ error: 'A valid email is required' }, { status: 400 });
    }
    if (!isNonEmptyString(message) || message.length > 5000) {
      return NextResponse.json({ error: 'Message is required and must be <= 5000 characters' }, { status: 400 });
    }

    // Persist using Prisma
    const created = await prisma.contactSubmission.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      },
    });

    return NextResponse.json(
      {
        success: true,
        submission: {
          id: created.id,
          createdAt: created.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    // Log server-side error for debugging
    // eslint-disable-next-line no-console
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

