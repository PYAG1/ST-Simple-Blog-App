import React, { useContext, useState } from "react";
import { createContext } from "react";
import { BlogContextType, BlogProviderProps, blogdata } from "../types/types";

const Blogcontext = createContext<BlogContextType | null>(null);

export const useBlogContext = () => {
  return useContext(Blogcontext);
};

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [blogs, setBlogArray] = useState<blogdata[]>([]);

  const addblog = (blogs: blogdata) => {
    setBlogArray((prev) => {
      return [...prev, blogs];
    });
  };
  const updateBlog = (id: string, updatedTitle: string, updatedContent: string,dateUpdated:string ) => {
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === id) {
        return {
          ...blog,
          title: updatedTitle,
          content: updatedContent,
          date:dateUpdated
        };
      }
      return blog;
    });
    setBlogArray(updatedBlogs);
  };
  
  return (
    <Blogcontext.Provider value={{ blogs, addblog }}>
      {children}
    </Blogcontext.Provider>
  );
};
