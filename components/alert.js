import React from "react"
import styles from './alert.module.css';
export default function Alert({ message, type = 'info' }) {
  return (
    <aside className={`${styles.alert} ${styles[type]}`}>
      {message}
    </aside>
  )
}
