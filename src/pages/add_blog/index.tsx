import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { useField } from "formik";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false, // Ensure it's not loaded on the server side
});
import "react-quill/dist/quill.snow.css";
import { useBlogContext } from "../../../utils/context";
import Router, { useRouter } from "next/router";

interface ReactQuillFieldProps {
  label: string;
  name: string;
}

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



  return (
    <div>
      <label htmlFor={props.name} className="text-3xl">
        {label}
      </label>
      <ReactQuill
        value={value || ""}
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
  const router = useRouter();

  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required("Title is required")
      .min(1, "Title must not be an empty string"),
    content: Yup.string()
      .required("Content is required")
      .min(1, "Content must not be an empty string"),
  });

  
  const { blogs, addblog } = useBlogContext();

  return (
    <div>
      <header className="flex justify-between items-center p-3">
        <Link href={"/"}>
          <FaArrowLeft size={30} />
        </Link>
      </header>

      <Formik
        initialValues={{
          id: `${Math.ceil(Math.random() * 10000)}`,
          title: "",
          content: "",
          date: formattedDate,
          author: "you",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          toast.success("Blog post has been added", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          addblog(values);
          router.push("/");
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
                placeholder="Enter your title"
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

            <button type="submit" className="w-max px-4 py-2 newbord ">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
