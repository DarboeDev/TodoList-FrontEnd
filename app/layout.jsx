import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './Components/NavBar'
import SideMenu from './Components/SideMenu';

import ToastProvider from './providers/toastProvider'
import DataProvider from './Context/appContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToDo',
  description: 'Developed by DarboeDev',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <DataProvider>
        <NavBar/>
        <ToastProvider/>
        <div className='flex w-[100%]'>
        <SideMenu/>
        {children}
        </div>
        </DataProvider>
        </body>
    </html>
  )
}
