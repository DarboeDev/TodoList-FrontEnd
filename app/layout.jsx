import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './Components/NavBar'
import ToastProvider from './providers/toastProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ToDo',
  description: 'Developed by DarboeDev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        <ToastProvider/>
        {children}
        </body>
    </html>
  )
}
