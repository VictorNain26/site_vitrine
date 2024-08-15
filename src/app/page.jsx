'use client';

import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

export default function Home() {
  const fetcher = (url) => fetch(url).then((r) => r.json());

  const { data, error } = useSWR(
    '/api/spotify',
    fetcher,
    {
      refreshInterval: 10000,
    }
  );

  if (error) return <div>Error loading data: {error.message}</div>;

  if (!data) return <div className='flex justify-center animate-pulse text-4xl mt-16'>Patience...</div>;

  return (
    <div className="flex flex-col items-center my-11">
      { data.isPlaying ? (
          <>
            <p className="text-3xl text-red-700 fw-bold mb-7 animate-pulse">En Direct</p>
            <p className="text-3xl">{data.artist}</p>
            <p className="text-3xl">{data.title}</p>
            <Link href={`${data.songUrl}`} target="_blank" rel="noopener noreferrer" className="mt-3 mb-1">
              <Image src={data.albumImageUrl} alt={data.title} width={500} height={500} className='rounded' />
            </Link>
            <p className="text-lg italic">{data.album}</p>
          </>
        ) : (
          <>
            <p className="text-red text-3xl">Je dois dormir....</p>
          </>
        )
      }
    </div>
  )
}
