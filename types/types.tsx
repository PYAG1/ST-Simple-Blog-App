import { ReactNode } from "react";

export interface BlogProviderProps {
  children: ReactNode;
}
//ReactNode is a type from the React library, and it essentially means that children can be any valid JSX or React element. This is a flexible way to allow the BlogProvider component to render its child components.
export interface blogdata {
  id: string;
  title: string;
  content: string;
  date:string,
  author:string
}
export interface BlogContextType {
  updateState:boolean
  setupdateState: React.Dispatch<React.SetStateAction<boolean>>;
  blogs: blogdata[];
  addblog: (blogs: blogdata) => void;
  updateBlog: (  
    id: string,
    updatedTitle: string,
    updatedContent: string,
    dateUpdated: string
    ) => void;
  deleteBlog:(id:string) =>void
}

export interface ReactQuillFieldProps {
  label: string;
  name: string;
}