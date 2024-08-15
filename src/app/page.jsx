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

  if (!data) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center my-11">
      { data.isPlaying ? (
          <>
            <p className="text-3xl text-red-500 fw-bold mb-7">En Direct</p>
            <p><span className='fw-bolder'>Artiste:</span> {data.artist}</p>
            <p>Album: {data.album}</p>
            <Link href={`${data.songUrl}`} target="_blank" rel="noopener noreferrer" className="">
              <Image src={data.albumImageUrl} alt={data.title} width={500} height={500} />
            </Link>
            <p className='text-2xl mt-3'>{data.title}</p>
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
