import { NextResponse } from 'next/server'

export async function GET(request) {
  const { Client, Player } = require("spotify-api.js");
  // const { spawn } = require('child_process');
  // const dateActuelle = new Date();
  // const { month, year } = { month: dateActuelle.getMonth() + 1, year: dateActuelle.getFullYear() };

  try {
    const client = await Client.create({
      token: {
        clientID: process.env.SPOTIFY_CLIENT_ID,
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        refreshToken: process.env.SPOTIFY_REFRESH_TOKEN,
      }
    });

    const player = new Player(client);

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

  // const savedTracks = await client.user.getSavedTracks({ limit: 10 });
  // console.log(savedTracks[0]);
  // spawn('spotdl', ['--output', `public/${month}-${year}`, currentPlayback.item.externalURL.spotify]);
}
