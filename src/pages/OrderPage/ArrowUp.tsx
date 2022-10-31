import { useEffect, useState } from 'react'
import { useScrollDirection } from '../../hooks/useScrollDirection'
import styles from './OrderPage.module.scss'

export const ArrowUp = () => {
  const show = useScrollDirection()

  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return <div onClick={clickHandler} className={`${styles.arrowDownContainer} ${!show && styles.arrowFown_disabled}`}>
    <div>↑</div>
  </div>
}