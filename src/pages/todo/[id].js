import { Inter } from 'next/font/google'
import Header from '../../components/header'
const inter = Inter({ subsets: ['latin'] })
import ToDoItem from '../../components/toDoItem'
export default function ToDos() {
  return (
    <>
      <Header done={false}/>
      <ToDoItem></ToDoItem>
    </>
  );
}