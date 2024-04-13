import { NextRequest } from 'next/server';
import { db } from '@/lib/db';
import { headers } from 'next/headers';
import { onCreateNewPageInDatabase } from '@/app/(main)/(pages)/connections/_actions/notion-connection';
import { postContentToWebHook } from '@/app/(main)/(pages)/connections/_actions/discord-connection';
import { postMessageToSlack } from '@/app/(main)/(pages)/connections/_actions/slack-connection';

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
      if (workflow) {
        workflow.map(async (flow) => {
          const flowPath = JSON.parse(flow.flowPath!);
          let current = 0;
          while (current < flowPath.length) {
            if (flowPath[current] == 'Discord') {
              const discordMessage = await db.discordWebhook.findFirst({
                where: {
                  userId: flow.userId,
                },
                select: {
                  url: true,
                },
              });
              if (discordMessage) {
                await postContentToWebHook(flow.discordTemplate!, discordMessage.url);
                flowPath.splice(flowPath[current], 1);
              }
            }
            if (flowPath[current] == 'Slack') {
              const channels = flow.slackChannels.map((channel) => {
                return {
                  label: '',
                  value: channel,
                };
              });
              await postMessageToSlack(flow.slackAccessToken!, channels, flow.slackTemplate!);
              flowPath.splice(flowPath[current], 1);
            }
            if (flowPath[current] == 'Notion') {
              await onCreateNewPageInDatabase(
                flow.notionDbId!,
                flow.notionAccessToken!,
                JSON.parse(flow.notionTemplate!),
              );
              flowPath.splice(flowPath[current], 1);
            }
          }
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
}
