"use client";
import {useState } from 'react'
import SideMenu from './Components/SideMenu';
import ToDoMain from './Components/ToDoMain';
import Completed from './completed/pages';

export default function Home() {
  const [showMenu, setShowMenu] = useState(true);
  return (
   <main className="w-full h-full flex">
    <SideMenu showMenu={showMenu} setShowMenu={setShowMenu}/>
    <ToDoMain showMenu={showMenu} setShowMenu={setShowMenu}/>
    {/* <Completed showMenu={showMenu} setShowMenu={setShowMenu}/> */}
   </main>
  )
}
