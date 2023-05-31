"use client"

import styles from './page.module.css'
import { ExpenseProvider } from '../components/ExpenseProvider';
import { Header } from '../components/Header';

export default function Home() {
  return (
    <main className={styles.main}>
      <ExpenseProvider>
        <Header />
      </ExpenseProvider>
    </main>
  )
}
