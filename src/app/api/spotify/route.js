import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { Client, Player } = require("spotify-api.js");

  try {
    const client = await Client.create({
      token: {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
      }
    });

    const player = new Player(client);

    const recentlyPlayed = await player.getRecentlyPlayed({ limit: 5 });
    const currentPlayback = await player.getCurrentlyPlaying();

    if (currentPlayback) {
      const data = {
        isPlaying: currentPlayback.isPlaying,
        title: currentPlayback.item.name,
        album: currentPlayback.item.album.name,
        artist: currentPlayback.item.album.artists
          .map((artist) => artist.name)
          .join(', '),
        albumImageUrl: currentPlayback.item.album.images[0].url,
        songUrl: currentPlayback.item.externalURL.spotify,
        recentlyPlayed: recentlyPlayed,
        message: "Boum Boum la musique",
        status: 200
      };

      return NextResponse.json(data);
    } else {
      return NextResponse.json({ error: 'No current playback' }, { status: 404 });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  // const { spawn } = require('child_process');
  // spawn('spotdl', ['--output', `public/musiques`, currentPlayback.item.externalURL.spotify]);

  try {
  } catch (error) {
    console.error("Error occurred:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
