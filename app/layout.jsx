import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './Components/NavBar'
import SideMenu from './Components/SideMenu';

import ToastProvider from './providers/toastProvider'
import DataProvider from './Context/appContext';
import DarkModeProvider from './Context/DarkmodeContext';
import { TaskProvider } from './Context/getDataContext';
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToDo',
  description: 'Developed by DarboeDev',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <TaskProvider>
    <DataProvider>
      <DarkModeProvider>
      <body className={inter.className}>
        <NavBar/>
        <ToastProvider/>
        <div className='flex w-[100%]'>
        <SideMenu/>
        {children}
        </div>
        </body>
        </DarkModeProvider>
        </DataProvider>
        </TaskProvider>
    </html>
  )
}
