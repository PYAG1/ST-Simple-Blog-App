import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaArrowLeft ,FaEdit} from "react-icons/fa";
import { useBlogContext } from "../../utils/context";
import { blogdata } from "../../types/types";
import {toast} from "react-toastify"

export default function BlogDetails() {
  const router = useRouter();

  const blogid = router?.query?.id;


// @ts-ignore

  const { blogs, deleteBlog } = useBlogContext();

  const handleDelete = () => {
    deleteBlog(blogid);
    toast.success('Blog post has been deleted', {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    router.push("/");
  };

  return (
    <div className=" w-full">
      <header className="flex justify-between items-center p-3">
        <Link href={"/"}>
          <FaArrowLeft size={30} />
        </Link>

        <div className=" flex  gap-2">
       <Link href={`/update_blog/${blogid}`}>
       <FaEdit size={30}/>
       
       </Link>

          <button onClick={() => handleDelete()}>del</button>
        </div>
      </header>

      <div>
        {blogs.map((item: blogdata) => {
          if (item.id === blogid) {
            return (
              <div className="w-full p-5 flex flex-col gap-3">
                <div className=" w-full h-[50vh] bg-black"></div>
                <p className=" text-4xl font-semibold my-3">{item.title}</p>
                <div className=" text-sm">
                  <p>date published {item.date}</p>
                  <p>published by @{item.author}</p>
                </div>
                <div className=" w-full overflow-x-clip">
                  <div dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
