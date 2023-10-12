
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { title } from "process";


export default function index() {
  const newDate = new Date();

  const day = String(newDate.getUTCDate()).padStart(2, '0');
  const month = String(newDate.getUTCMonth() + 1).padStart(2, '0'); // Month is zero-based, so we add 1.
  const year = newDate.getUTCFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  
  console.log(formattedDate);
  



  return (
    <div>
      <header className=" flex justify-between items-center p-3">
        <Link href={"/"}>
          <FaArrowLeft size={30} />
        </Link>
      </header>



      
    </div>
  );
}
/*      <Formik 
      initialValues={
    {
      title:"",
      content:"",
      date:``,
      author:"you"
    }
      }
      >
        <Form>

        </Form>
      </Formik>*/