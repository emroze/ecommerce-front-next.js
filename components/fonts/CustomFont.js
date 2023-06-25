import { Poppins,Inter,Roboto } from 'next/font/google'

export const CustomFont = Poppins({
  weight: ['400','500','600','700'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})