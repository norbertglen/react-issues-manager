import React from "react";
import MainLayout from "../components/layouts/main";

export default function Home() {
  return (
    <section>
      <h1>Welcome to Facebook react issues manager!</h1>
    </section>
  );
}

Home.getLayout = (page) => {
  return <MainLayout>{page}</MainLayout>;
};

