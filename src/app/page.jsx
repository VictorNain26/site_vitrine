'use client';

import Image from 'next/image'
import Link from 'next/link'
import { css } from '../../styled-system/css';
import useSWR from 'swr'

const fetcher = url => fetch(url, { cache: 'no-store' }).then(r => r.json())

export default function Home() {
  const { data, error } = useSWR(
    '/api/spotify',
    fetcher,
    {
      refreshInterval: 1000,
    }
  )

  if (error) return <div>Error loading data: {error.message}</div>;

  if (!data) return <div>Loading...</div>;

  return (
    <div className=
      {
        css(
          { display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            m: '8',
            fontSize: "2xl",
            fontWeight: 'bold'
          }
        )
      }
    >
      <p>{data.artist}</p>
      <p>{data.title}</p>
      <p>{data.album}</p>
      <Link href={`${data.songUrl}`} target="_blank" rel="noopener noreferrer" className={css({ textAlign: 'center' })}>
        <Image src={data.albumImageUrl} alt={data.title} width={250} height={250} className={css({ my: '8' })} />
      </Link>

      <audio controls src="" className={css({ textAlign: 'center' })} />
    </div>
  )
}
