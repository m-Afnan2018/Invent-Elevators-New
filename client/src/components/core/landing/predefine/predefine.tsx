import React from 'react'
import Image from 'next/image'
import styles from './predefine.module.css'

const Predefine = () => {
  return (
    <div className={styles.predefine}>
      <Image 
        src="/images/carbg.png"
        alt="Section Banner"
        fill
        priority
        className={styles.bannerImage}
      />
    </div>
  )
}

export default Predefine