'use client'

import Image from 'next/image'
import axios from 'axios'
import { css } from '../../styled-system/css';
import useSWR from 'swr'

const fetcher = url => axios.get(url).then(res => res.data)

export default function Home() {
  const { data, error } = useSWR('/api/spotify', fetcher)

  return (
    <div className={css({ fontSize: "2xl", fontWeight: 'bold' })}>
      {data ? (
        <div>
          <p>{data.artist}</p>
          <p>{data.title}</p>
          <p>{data.album}</p>
          <p>{console.log(data)}</p>
          <Image src={data.albumImageUrl} alt={data.title} width={100} height={100} />
          <p>{data.songUrl}</p>
        </div>
      ) : (
        <p>Chargement...</p>
      )}
    </div>
  )
}
