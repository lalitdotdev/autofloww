import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { headers } from 'next/headers';

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
    });

    if ((user && parseInt(user.credits!) > 0) || user?.credits == 'Unlimited') {
      const workflow = await db.workflows.findMany({
        where: {
          userId: user.clerkId,
        },
      });
    }
  }

  return Response.json(
    {
      message: 'success',
    },
    {
      status: 200,
    },
  );
}
