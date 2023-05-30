"use client"

import { useState } from 'react';
import Image from 'next/image'
import styles from './page.module.css'
import { ExpenseProvider } from '../components/ExpenseProvider';
import { ExpenseForm } from "../components/ExpenseForm";
import { Expenses } from '../components/Expenses';
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
