import { NextResponse } from 'next/server'

export async function GET(request) {
  const { Client, Player } = require("spotify-api.js");
  // const { spawn } = require('child_process');
  // const dateActuelle = new Date();
  // const { month, year } = { month: dateActuelle.getMonth() + 1, year: dateActuelle.getFullYear() };

  const client = await Client.create(
    {
      token: {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
      }
    }
  );

  const player = new Player(client);

  const currentPlayback = await player.getCurrentlyPlaying();
  // const savedTracks = await client.user.getSavedTracks({ limit: 10 });
  // console.log(savedTracks[0]);
  // spawn('spotdl', ['--output', `public/${month}-${year}`, currentPlayback.item.externalURL.spotify]);

  const data = {
    isPlaying: currentPlayback.isPlaying,
    title: currentPlayback.item.name,
    album: currentPlayback.item.album.name,
    artist: currentPlayback.item.album.artists
    .map((artist) => artist.name)
    .join(', '),
    albumImageUrl: currentPlayback.item.album.images[0].url,
    songUrl: currentPlayback.item.externalURL.spotify,
  };

  return NextResponse.json(data)
}
