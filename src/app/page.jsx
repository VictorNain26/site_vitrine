'use client';

import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'
import { css } from '../../styled-system/css';
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  const { data } = useSWR(
    '/api/spotify',
    fetcher,
    {
      refreshInterval: 5,
    }
  )

  if (!data) return <div>Je dois dormir....</div>;

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

      <audio controls src="2-2024/grimes_genesis.mp3" className={css({ textAlign: 'center' })} />
    </div>
  )
}
