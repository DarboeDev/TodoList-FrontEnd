"use client";
import {useState } from 'react'
import SideMenu from './Components/SideMenu';
import ToDoMain from './Components/ToDoMain';

export default function Home() {
  const [showMenu, setShowMenu] = useState(true);
  return (
   <main className="w-full h-full flex">
    <SideMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
    <ToDoMain showMenu={showMenu} setShowMenu={setShowMenu}/>
   </main>
  )
}
