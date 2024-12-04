import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { addPost } from '../../network/postsApis';
import { useState, useEffect } from 'react';

function PostForm(){
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postsData.posts);
    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
      });
    
    useEffect(()=>{
        console.log(newPost)
    },[newPost])

    const validationSchema = Yup.object({
        title: Yup.string()
          .required('Title is required')
          .max(100, 'Title cannot exceed 100 characters'),
        content: Yup.string()
          .required('Content is required')
          .min(5, 'Content must be at least 10 characters long'),
    });
    
      // Handle form submission
    const handleSubmit = (values, { resetForm }) => {
        console.log('Form values:', values);
        setNewPost({...newPost, title: values.title, body: values.content})
        console.log(newPost)
        
        resetForm();
    };

    const handleAddPost = () => {
        // dispatch action
        dispatch(addPost(newPost)).then(() => {
          setNewPost({ title: "", body: "" });
          toast.success("Post added successfully");
        });
      };

    return(

        <Formik
            initialValues={{title: '', body: ''}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div>
                    <label htmlFor="title">Title:</label>
                    <Field type="text" name="title" />
                    <ErrorMessage name="title" component="div" style={{ color: 'red' }} />
                    </div>
                    <div>
                    <label htmlFor="content">Content:</label>
                    <Field as="textarea" name="content" />
                    <ErrorMessage name="content" component="div" style={{ color: 'red' }} />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                    Submit
                    </button>
                </Form>
            )}

        </Formik>
    )
}

export default PostForm;