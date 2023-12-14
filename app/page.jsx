import SideMenu from './Components/SideMenu';
import ToDoMain from './Components/ToDoMain';

export default function Home() {
  return (
   <main className="w-full h-full flex">
    <SideMenu/>
    <ToDoMain/>
   </main>
  )
}
