import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
 metadataBase: new URL('https://mr-clothing-unisex-bengaluru.rahulpersonal147.chatgpt.site'),
 icons: {icon:'/favicon.svg'},
 title: 'Mr.Clothing Unisex | Clothing Store in Chokkanahalli, Bengaluru',
 description: 'Visit Mr.Clothing unisex in Chokkanahalli, Bengaluru. Explore everyday fashion and find your next look. Open daily from 9:30 AM to 11:30 PM.',
 openGraph: {title:'Mr.Clothing Unisex — Style That Speaks For You.', description:'Everyday style in Bengaluru. Visit us in Chokkanahalli, open daily 9:30 AM – 11:30 PM.', type:'website',images:[{url:'/og.png',width:1536,height:1024,alt:'Mr.Clothing Unisex — Style that speaks for you.'}]},
 twitter: {card:'summary_large_image',title:'Mr.Clothing Unisex — Style That Speaks For You.',description:'Everyday style in Bengaluru.',images:['/og.png']},
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
