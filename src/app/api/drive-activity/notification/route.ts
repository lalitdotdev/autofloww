import { NextRequest } from 'next/server';
import { headers } from 'next/headers';

export async function POST(req: NextRequest) {
  const headerlist = headers();
  let channelResourceId;
  headerlist.forEach((value, key) => {
    if (key === 'x-goog-resource-id') {
      channelResourceId = value;
    }
  });

  return Response.json(
    {
      message: 'success',
    },
    {
      status: 200,
    },
  );
}
