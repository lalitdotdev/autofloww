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

  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ message: 'User not found' });
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_google');

  const accessToken = clerkResponse[0].token;
  oauth2Client.setCredentials({
    access_token: accessToken,
  });

  const drive = google.drive({
    version: 'v3',
    auth: oauth2Client,
  });

  const channelId = uuidv4();

  const startPageTokenRes = await drive.changes.getStartPageToken({});
  const startPageToken = startPageTokenRes.data.startPageToken;
  if (startPageToken == null) {
    throw new Error('startPageToken is unexpectedly null');
  }

  return new NextResponse('Oops! something went wrong, try again');
}
