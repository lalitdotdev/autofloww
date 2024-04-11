import { NextRequest, NextResponse } from 'next/server';

import axios from 'axios';
import url from 'url';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code'); // Get the code from the URL query string parameter 'code'
  if (code) {
    const data = new url.URLSearchParams(); // Create a new URLSearchParams object to store the data to be sent to the Discord API to get the access token and webhook details from the code provided
    data.append('client_id', process.env.DISCORD_CLIENT_ID!); // Add the client ID to the data object (from the environment variable)
    data.append('client_secret', process.env.DISCORD_CLIENT_SECRET!); // Add the client secret to the data object (from the environment variable)
    data.append('grant_type', 'authorization_code'); // Add the grant type to the data object
    data.append('redirect_uri', 'https://localhost:3000/api/auth/callback/discord'); // Add the redirect URI to the data object (the same as the one used to get the code)
    data.append('code', code.toString()); // Add the code to the data object

    // Send a POST request to the Discord API to get the access token and webhook details from the code provided in the URL query string parameter 'code' using the data object created above as the body of the request and the headers specified below (Content-Type: application/x-www-form-urlencoded)
    const output = await axios.post('https://discord.com/api/oauth2/token', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    // If the response from the Discord API contains the access token and webhook details, redirect the user to the connections page with the webhook details in the URL query string parameters
    if (output.data) {
      const access = output.data.access_token;
      const UserGuilds: any = await axios.get(`https://discord.com/api/users/@me/guilds`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      //  filter the guilds to get the guild name of the webhook created by the user and pass it to the connections page to display the guild name in the connections page .
      const UserGuild = UserGuilds.data.filter((guild: any) => guild.id == output.data.webhook.guild_id);

      //   Redirect the user to the connections page with the webhook details in the URL query string parameters
      return NextResponse.redirect(
        `https://localhost:3000/connections?webhook_id=${output.data.webhook.id}&webhook_url=${output.data.webhook.url}&webhook_name=${output.data.webhook.name}&guild_id=${output.data.webhook.guild_id}&guild_name=${UserGuild[0].name}&channel_id=${output.data.webhook.channel_id}`,
      );
    }

    // If the response from the Discord API does not contain the access token and webhook details, redirect the user to the connections page without the webhook details in the URL query string parameters
    return NextResponse.redirect('https://localhost:3000/connections');
  }
}
