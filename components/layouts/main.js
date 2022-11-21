import React from 'react';
import Head from 'next/head';
import styles from './main.module.css';

const MainLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>React issue manager</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default MainLayout;