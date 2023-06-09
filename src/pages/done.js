import { Inter } from 'next/font/google'
import Header from '../components/header.js'
import Content from '../components/content.js'
const inter = Inter({ subsets: ['latin'] })

export default function Done() {
  return (
    <>
      <Header done={true}/>
      <Content done={true}/>
    </>
  );
}