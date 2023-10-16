import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useBlogContext } from "../../utils/context";
import { blogdata } from "../../types/types";
import image from "../assets/34.jpg"



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  //@ts-ignore
  const { blogs } = useBlogContext();
  return (
    <div className=" w-full h-full ">
      <header className=" w-full p-4 flex justify-between">
        <p className=" text-2xl">BlogSpot</p>
        <button className=" px-3 bg-[]">
          <Link href={"/add_blog"}>Add Blog</Link>
        </button>
      </header>

      <main>
        <p className=" text-4xl font-bold text-center py-5 ">Your feed</p>
{
  blogs && (
    
    <div className="w-full px-4 flex flex-col gap-3 lg:grid lg:grid-cols-3  ">
    {blogs.map(({ id, title, content}: blogdata) => {
      return (
        <div
          key={id}
          className=" w-full grid grid-cols-2 grid-rows-1 gap-3 lg:grid-cols-1 lg:grid-rows-2"
        >
          <div className="w-full h-[250px] lg:h-[15em]">
            <Image src={image} alt="image" className=" w-full h-full object-cover"/>
          </div>

          <div className=" flex flex-col gap-2 pr-3 overflow-hidden ">
            <Link href={`/${id}`} className=" text-2xl font-semibold">
              {title}
            </Link>
            <div className="w-full h-[100px]  overflow-hidden  text-sm">
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </div>
        </div>
      );
    })}

    {
      blogs.length===0 && (
        <p>No blogs have been posted</p>
      )
    }
  </div>
  )
}
      </main>
      <div>
        <p>By py Next Js + TypeScript</p>
      </div>
    </div>
  );
}
