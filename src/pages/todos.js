import React from 'react';
import { Inter } from "next/font/google";
import Header from "../components/header.js";
import Content from "../components/content.js";

const inter = Inter({ subsets: ["latin"] });

export default function ToDos() {


  return (
    <>
      <Header done={false} />
      <Content done={false} />
    </>
  );
}
