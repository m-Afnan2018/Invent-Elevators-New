import React from 'react'
import Image from 'next/image'
import styles from './predefine.module.css'

const Predefine = ({ data }: { data: any }) => {
  if (!data || data.length === 0) return null;
  const item = data[0];

  return (
    <div className={styles.predefine}>
      <Image
        src={item.image || "/images/prebg.png"}
        alt={item.title || "Section Banner"}
        fill
        priority
        className={styles.bannerImage}
      />
    </div>
  )
}

export default Predefine