import React, { useContext, useState } from "react";
import { createContext } from "react";
import { BlogContextType, BlogProviderProps, blogdata } from "../types/types";

const Blogcontext = createContext<BlogContextType | null>(null);

export const useBlogContext = () => {
  const context= useContext(Blogcontext);
  if(!context) {
    throw new Error("Null Context")
  }
  return context
};

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [blogs, setBlogArray] = useState<blogdata[]>([]);
  const [updateState,setupdateState] = useState(false)

  const addblog = (blogs: blogdata) => {
    setBlogArray((prev) => {
      return [...prev, blogs];
    });
  };
  const updateBlog = (
    id: any,
    updatedTitle: string,
    updatedContent: string,
    dateUpdated: string
  ) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === id) {
        return {
          ...blog,
          title: updatedTitle,
          content: updatedContent,
          date: dateUpdated,
        };
      }
      return blog;
    });
    setBlogArray(updatedBlogs);
  };

  const deleteBlog = (id:any) => {
    const updatedblogs= blogs.filter((item)=>{
      return item.id !== id
    })
    setBlogArray(updatedblogs)
  };



 

  return (
    <Blogcontext.Provider value={{ blogs, addblog, deleteBlog,updateState,setupdateState ,updateBlog}}>
      {children}
    </Blogcontext.Provider>
  );
};
