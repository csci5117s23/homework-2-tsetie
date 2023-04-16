import React, { useState, useEffect } from 'react';
import { Inter } from "next/font/google";
import Header from "../components/header.js";
import Content from "../components/content.js";
import TodoInputs from "../components/todoInputs.js";
import { useAuth } from '@clerk/nextjs';

const inter = Inter({ subsets: ["latin"] });

export default function ToDos() {


  return (
    <>
      <Header done={false} />
      <Content done={false} />
    </>
  );
}
