import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
<div className=' w-full h-full '>
<header className=' w-full p-4 flex justify-between'>
<p className=' text-2xl'>BlogSpot</p>
<button className=' px-3 bg-[]'>

  <Link href={'/add_blog'}>Add Blog</Link>
</button>
</header>

<main>
  <p className=' text-4xl font-bold text-center' >Your feed</p>
</main>
</div>
  )
}
