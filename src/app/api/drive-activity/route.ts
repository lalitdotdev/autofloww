import { auth, clerkClient } from '@clerk/nextjs';

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { google } from 'googleapis';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.OAUTH2_REDIRECT_URI,
  );

  return new NextResponse('Oops! something went wrong, try again');
}
