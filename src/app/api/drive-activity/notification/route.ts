import { NextRequest } from 'next/server';
import { headers } from 'next/headers';
import { db } from '@/lib/db';

export async function POST(req: NextRequest) {
  console.log('🔴 Changed');
  const headerlist = headers();
  let channelResourceId;
  headerlist.forEach((value, key) => {
    if (key === 'x-goog-resource-id') {
      channelResourceId = value;
    }
  });


  if (channelResourceId) {
    const user = await db.user.findFirst({
      where: {
        googleResourceId: channelResourceId,
      },
      select: { clerkId: true, credits: true },
    })

  return Response.json(
    {
      message: 'success',
    },
    {
      status: 200,
    },
  );
}
