import { NextRequest, NextResponse } from 'next/server';

import { Client } from '@notionhq/client';
import axios from 'axios';

//1.Get the code from the URL query string parameter 'code'
//2. Encode the client ID and API secret in base64 format to be used in the Authorization header of the request to the Notion API
//3. Send a POST request to the Notion API to get the access token and workspace details from the code provided in the URL query string parameter 'code' using the headers specified below (Content-Type: application/json, Authorization: Basic <encoded>, Notion-Version: 2022-06-28) and the data object which contains the grant type, code, and redirect URI as the body of the request to get the access token and workspace details

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code'); // Get the code from the URL query string parameter 'code'
  const encoded = Buffer.from(`${process.env.NOTION_CLIENT_ID}:${process.env.NOTION_API_SECRET}`).toString('base64');
  if (code) {
    const response = await axios('https://api.notion.com/v1/oauth/token', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Basic ${encoded}`,
        'Notion-Version': '2022-06-28',
      },
      data: JSON.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.NOTION_REDIRECT_URI!,
      }),
    });
    if (response) {
      // If the response from the Notion API contains the access token and workspace details, redirect the user to the connections page with the workspace details in the URL query string parameters
      const notion = new Client({
        auth: response.data.access_token,
      });
      //   Get the databases from the workspace using the Notion API
      const databasesPages = await notion.search({
        filter: {
          value: 'database',
          property: 'object',
        },
        sort: {
          direction: 'ascending',
          timestamp: 'last_edited_time',
        },
      });
      //   Get the database ID from the response to pass it to the connections page to display the database details in the connections page
      const databaseId = databasesPages?.results?.length ? databasesPages.results[0].id : '';

      console.log(databaseId);

      //   Redirect the user to the connections page with the workspace details in the URL query string parameters
      return NextResponse.redirect(
        `https://autofloww.vercel.app/connections?access_token=${response.data.access_token}&workspace_name=${response.data.workspace_name}&workspace_icon=${response.data.workspace_icon}&workspace_id=${response.data.workspace_id}&database_id=${databaseId}`,
      );
    }
  }

  // If the response from the Notion API does not contain the access token and workspace details, redirect the user to the connections page without the workspace details in the URL query string parameters
  return NextResponse.redirect('https://autofloww.vercel.app/connections');
}
