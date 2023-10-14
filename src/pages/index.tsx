import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useBlogContext } from '../../utils/context'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const {blogs}= useBlogContext()
  return (
<div className=' w-full h-full '>
<header className=' w-full p-4 flex justify-between'>
<p className=' text-2xl'>BlogSpot</p>
<button className=' px-3 bg-[]'>

  <Link href={'/add_blog'}>Add Blog</Link>
</button>
</header>

<main>
  <p className=' text-4xl font-bold text-center py-5 ' >Your feed</p>

  <div className='w-full px-4 flex flex-col gap-3 '>
    {
      blogs.map(({title,content,author,date})=>{
      
     return (
      <div className=' w-full grid grid-cols-2 grid-rows-1 gap-3'>
        <div className='w-full h-[150px] bg-black'>
          </div>

          <div className=' flex flex-col gap-2'>
            <p className=' text-2xl font-bold'>{title}</p>
            {content}
            
            </div>


      </div>
     )
      })

    }
    
  </div>
</main>
</div>
  )
}
