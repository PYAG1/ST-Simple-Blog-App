import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { useField } from "formik";
import { ReactQuillFieldProps, blogdata } from "../../../types/types";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Ensure it's not loaded on the server side
});
import "react-quill/dist/quill.snow.css";
import { useBlogContext } from "../../../utils/context";
import { Router, useRouter } from "next/router";

const getId = () => {
  const router = useRouter();
  const ID = router.query.index;
  return ID;
};

const ReactQuillField: React.FC<ReactQuillFieldProps> = ({
  label,
  ...props
}) => {
  const [field, , helpers] = useField(props);
  const { value } = field;

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      ["link"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  // @ts-ignore

  const { blogs } = useBlogContext();
  const currentBlog = blogs.filter((item: blogdata) => {
    return item.id === getId();
  });

  return (
    <div>
      <label htmlFor={props.name} className="text-3xl">
        {label}
      </label>
      <ReactQuill
        value={value || currentBlog[0]?.content}
        onChange={(content) => helpers.setValue(content)}
        modules={modules}
        className=" text-lg"
      />
    </div>
  );
};

export default function index() {
  const newDate = new Date();
  const day = String(newDate.getUTCDate()).padStart(2, "0");
  const month = String(newDate.getUTCMonth() + 1).padStart(2, "0");
  const year = newDate.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(1, "Title must not be an empty string"),
  });

  // @ts-ignore

  const { blogs, updateBlog } = useBlogContext();
  const currentBlog = blogs.filter((item: blogdata) => {
    //function to get the current blog
    return item.id === getId();
  });

  const router = useRouter();

  return (
    <div>
      <header className="flex justify-between items-center p-3">
        <Link href={"/"}>
          <FaArrowLeft size={30} />
        </Link>
      </header>

      <Formik
        initialValues={{
          id: getId(),
          title: currentBlog[0]?.title,
          content: currentBlog[0]?.content,
          date: formattedDate,
          author: "you",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          // Handle form submission logic here
          console.log(values);

          updateBlog(values.id, values.title, values.content, values.date);
          toast.success("Blog post has been updated", {
            position: "top-right",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            
          });
          router.push("/")
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-full flex flex-col gap-4 px-[1.5em]">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-3xl">
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                placeholder={`${currentBlog[0]?.title}`}
                className={`focus:border-none border-[2px] ${
                  !errors.title
                    ? "focus:outline-[#4FFFB0] outline-black/25"
                    : "focus:outline-[#EF0107] border-[#EF0107]"
                } focus:outline-[2px] px-4 py-2 rounded duration-700 text-black/80 bg-slate-50`}
              />
              {errors.title && (
                <ErrorMessage
                  name="title"
                  component="div"
                  className="text-red-600"
                />
              )}
            </div>

            <ReactQuillField name="content" label="Content" />

            <button type="submit" className="w-max px-4 py-2 newbord ">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
