"use client";

import Image from "next/image"
import Link from "next/link"
import useSWR from "swr"
import { useState } from "react";

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());
  const [showTracks, setShowTracks] = useState(false);

  const toggleTracks = () => {
    setShowTracks(!showTracks);
  };

  const { data, error } = useSWR(
    "/api/spotify",
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  if (error) return <div>AIE: {error.message}</div>;

  if (!data) return <div className="flex justify-center animate-pulse text-4xl mt-16">Patience...</div>;

  return (
    <>
      <div className="flex flex-col items-center my-11 mx-8">
        { data.isPlaying ? (
            <>
              <p className="text-3xl text-red-700 fw-bold mb-7 animate-pulse">En Direct</p>
              <p className="text-3xl">{data.title}</p>
              <p className="text-3xl italic">{data.artist}</p>
              <Link href={`${data.songUrl}`} target="_blank" rel="noopener noreferrer" className="mt-3 mb-1">
                <Image src={data.albumImageUrl} alt={data.title} width={500} height={500} className="rounded" />
              </Link>
            </>
          ) : (
            <p className="text-red text-3xl">Je dois sûrement dormir...</p>
          )
        }

        <h3 className={`inline rounded text-3xl cursor-pointer my-8 p-4 ${showTracks ? "bg-slate-950" : ""}`} onClick={toggleTracks}>Dernières écoutes</h3>
      </div>

      
      <section className={`fixed top-0 bg-slate-900 py-11 px-8 md:px-0 right-0 text-left lg:right-8 h-full w-full sm:w-3/5 md:w-2/5 xl:w-1/5 ${showTracks ? "block" : "hidden"}`}> 
        <h3 className="text-3xl mb-8">5 Dernières...</h3>
        
        <span className="text-3xl mb-8 cursor-pointer flex md:hidden" onClick={toggleTracks}>FERMER</span>
        
        { data.recentlyPlayed.items.map((item) => (
          <Link key={item.track.id} href={`${item.track.externalURL.spotify}`} target="_blank" rel="noopener noreferrer" className="flex items-center p-4 rounded hover:bg-slate-950">
            <Image src={item.track.album.images[0].url} alt={item.track.title} width={60} height={60} className="object-cover rounded me-4" />

            <div className="w-full">
              <p className="text-lg truncate">{item.track.name}</p>
              <p className="text-lg italic truncate">{item.track.artists.map((artist) => artist.name).join(", ")}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  )
}
