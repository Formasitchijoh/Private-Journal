
import  React from 'react'
import  ReactDOM from 'react-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage,useField} from "formik";
import * as Yup from 'yup'
import "./styles.css";
import images from './image.png'

const MyTextInput = ({label, ...props}) =>{
    
    const [field, meta] = useField(props);
    return (
        <div className='container'>
        <label htmlFor={props.id || props.name} className='label'>{label}</label>
        <input className='text-input' {...field} {...props} />
        {meta.touched && meta.error ?
         (<div className='error'>{meta.error}</div>):null}

        </div>
    );
};

const MyRadioBox = ({label, ...props}) => { 
    const [field, meta] = useField({...props, type:"radio"});
    return ( 
      <div role="group"  className='radio'
      aria-labelledby="my-radio-group">
    <label htmlFor={props.id || props.name} className='label'>
    <input className='radio-inpit' {...field} {...props}></input>
        {label}</label>
            {meta.touched && meta.error ? (<div className='error'>{meta.error}</div>):null}
        </div>
    )

}

const MyCheckbox = ({children, ...props}) => {
    const [field, meta] = useField({...props, type:'checkbox'});

    return ( 
        <div> 
             <label className='checkbox'>
            <input type='checkbox' {...field} {...props}/>
                {children}
        </label>
        {meta.touched && meta.error ? (
            <div className='error'>{meta.error}</div>
        ) : null}
        </div>
        
    );
};


const MySelect = ({label, ...props}) => {
    const [field, meta] = useField(props);

    return (
        <div>

            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props}/>

            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ):null}
        </div>
    )
}
const Welcome = () =>{
    return (
        <>
         <div className='header-text'>
        {/* <h5>Become a driver</h5> */}
        <button>Sign up</button>
     </div>
     <div className='opp'>
     <h3>Opportunity is<br/>everywhere</h3>
     </div>
    
     
     </>
       
    )
} 


const ModalPage = ({setisSummit, ...props}) => { 
         
    return (
        <div className='main-modal'>
             <div>

                <p>FirstName: {props.firstName}</p>
                <p>LastName: {props.lastName}</p>
                <p>Email: {props.email}</p>
                <p>PassWord: {props.origin}</p>
                <p>Origin: {props.inviteCode}</p>
                <p>inviteCode: {props.password}</p>

                </div>
            <div className='modal'>
                <button className='confirm' onClick={() => {
                    alert("Successfully submitted your form -:)")
                    setisSummit(false)
                }} >Confirm</button>
                <button className='Edit' onClick={()=> {
                    setisSummit(false)
                }}>Edit</button>
            </div>
        </div>
    )

}

const SignupForm = () => {  
    const [isSummit, setisSummit] = useState(false);
    const [details, setdetails] = useState({email:"" ,
    firstName:"",
     lastName:"",
     password:'',
     origin:'',
     inviteCode:""})

    return(

         <div className='driver-image'>
        <div className='formik-container'> 
        <Welcome />  
        <div>
            <img src={images} alt='capture' className='driver'/>
        </div>
        <Formik
            initialValues={{
                 email:"" ,
                  firstName:"",
                   lastName:"",
                   password:'',
                   origin:'',
                   inviteCode:""
                
                }}
            validationSchema={ Yup.object({    
            firstName:Yup.string()
            .max(15,"Must be 15 characters or less")
            .required("Required"),

            lastName:Yup.string()
            .max(20,"Must be 20 words or less")
            .required('Required'),

            email:Yup.string().email("Inavlid email address").required("required"),
            password:Yup.string().required('Required'),
            origin:Yup.string().required('Required'),
            inviteCode:Yup.string().max(5, 'Must be 5 characters').required('Required'),
        })}
        onSubmit={(values,{setSubmitting})=>{
            // setTimeout(()=>{ 
            //     alert(JSON.stringify(values,null,2));
              
               
            // },400)
            setSubmitting(false); 
            setisSummit(true);
                setdetails({...values})
        }}>
            <Form>
                  <div style={{display:"flex",marginTop:"20px", gap:"30px"}}>
                  <MyRadioBox 
                  label="I have a car"
                  name="car"
                  type="radio"
                  />
                  <MyRadioBox 
                  label="I need a car"
                  name="car"
                  type="radio"
                  />
                  </div>
          
               <MyTextInput
               
               label="First Name"
               name="firstName"
               type="text"
               placeholder="Jane"
               
               />

               <MyTextInput
               label="Last Name"
               name="lastName"
               type="text"
               placeholder="Doe"
               
               />    
                  <MyTextInput
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="jane@formik.com"
                  ></MyTextInput>
                  <MyTextInput
                  label='PassWord'
                  name='password'
                  type='text'
                  />

                  <MyTextInput
                  label="Origin"
                  name='origin'
                  type='text'
                  />

                  <MyTextInput 
                  label='Invitation Code'
                  name='inviteCode'
                  type='text'
                  />
                 
                
                   {/* <MySelect
                //   label="Job Type" name="jobType">
                //     <option value="">Select a Job type</option>
                //     <option value="designer">Designer</option>
                //     <option value="developer">Developer </option>
                //     <option value="product">Product Manager</option>
                //     <option value="other">Other</option>

                //   </MySelect> */}
                <div className='agreement'>
                <p style={{marginTop:"30px"}}>By proceeding I agree to UBer's <a href='#'><i style={{color:"blue"}}>Terms of Use</i> </a> and acknowledge That I have Read the <a href='#'><i style={{color:"blue"}}>
                Privacy Policy  </i></a></p>
                   <p>I also agree tht Uber or the representation may  contact me by email, ohome or SMS(Incuding by automtic means) at the addresses or number i provided including for mrketing purpose</p>
                   <MyCheckbox name="acceptedTerms">
                     I accept the terme and conditions
                   </MyCheckbox>
                    </div> 
                  

               <button type="submit"  >Sign up to drive</button>
               <p>Already have an account? <a href='#'>Sign Up</a></p>
             </Form>
         </Formik>
      {isSummit ? ( <ModalPage
      setisSummit={setisSummit}
      isSummit={isSummit}
      {...details}
      />) : null }


         </div>
         </div>
        
       
     );
 };

 const ImagePage = () => {
    return(

        <div className='left-div'>
           <div className='opportunity'>
            <h3>Opportunity is <br/>everywhere</h3>
            <p>Make the most of your time on the road on the platform<br/> with the most of active riders</p>
           </div>
            <img src={images} alt='capture' className='image'/>
    
        </div>
    )
 }
 function App(){ 
     return (
        <div className='app-div'>
        <ImagePage/>
          <SignupForm />
        </div>
      
        
       
     )
 }

const rootElement = document.getElementById("root");
ReactDOM.render(<App/>, rootElement);



// import React from "react";
// import ReactDOM from "react-dom";
// import { useFormik } from "formik";
// import "./styles.css";

// const SignupForm = () => {
//   const formik = useFormik({
//     initialValues: { email: "" },
//     onSubmit: values => {
//       alert(JSON.stringify(values, null, 2));
//     }
//   });
//   return (
//     <form onSubmit={formik.handleSubmit}>
//       <label htmlFor="email">Email Address</label>
//       <input
//         id="email"
//         name="email"
//         type="email"
//         onChange={formik.handleChange}
//         value={formik.values.email}
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// function App() {
//   return <SignupForm />;
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


































// import  React from 'react'
// import  ReactDOM from 'react-dom';
// import { useFormik} from "formik";
// import * as Yup from 'yup'
// import "./styles.css";

// const validate = values =>{
//     const errors = {};

//     if(!values.firstName) {
//         errors.firstName = "Required"
//     }else if(values.firstName.length > 15){
//         errors.firstName = "Must be 15 characters or less"
//     }

//     if(!values.lastName){
//         errors.lastName = "Required"
//     }else if(values.lastName.length >15){
//         errors.lastName = "Must be 15 characters or less"
//     }

//     if(!values.email){
//         errors.email = "Required";
//     }else if (!/^[A-Z0-9._%+-]+\.[A-Z]{2,4}$/i.test(values.email)){
//         errors.email = "Invalid email address";
//     }
//     return errors;
// };

// const SignupForm = () => { 
//     const formik = useFormik({
//         initialValues:{ email:"" , firstName:"", lastName:""},
//         // validate,
//         // Replacing the validate function with the  yup validation
//         validationSchema:Yup.object({    
//             firstName:Yup.string()
//             .max(15,"Must be 15 characters or less")
//             .required("Required"),

//             lastName:Yup.string()
//             .max(20,"Must be 20 words or less")
//             .required('Required'),

//             email:Yup.string().email("Inavlid email address").required("required"),
//         }),
//         onSubmit: values => {
//             alert(JSON.stringify(values, null, 2));
//         }
//     });

//   return (  
//     <form 
//     onSubmit={formik.handleSubmit}>
       
//         <label htmlFor='firstname'>First Name</label>
//         <input
//         id='firstname'
//         name='firstname'
//         type='text'
//         {...formik.getFieldProps('firstName')}
//         // onChange={formik.handleChange}
//         // onBlur={formik.handleBlur}
//         // value={formik.values.firstName}
//         ></input>

//         {/* validating firstname input */}
//         { formik.touched.firstName && formik.errors.firstName? <div>{formik.errors.firstName}</div>: null}
       
//         <label htmlFor='lastname'>Last Name</label>
//         <input
//         id='lastName'
//         name='LastName'
//         type='text'
//         {...formik.getFieldProps("lastName")} //Reduced boilerPlate of formik components
//         // onChange={formik.handleChange}
//         // onBlur={formik.handleBlur}
//         // value={formik.values.lastName}
//         ></input>
//         {/* validating lastname input */}
//         {formik.touched.lastName &&   formik.errors.lastName ? <div>{formik.errors.lastName}</div>:null}

//          <label htmlFor='email'>Email Address</label>
//         <input
//         id='email'
//         name='email'
//         type='email'
//         {...formik.getFieldProps("email")}
//         // onChange={formik.handleChange}
//         // onBlur={formik.handleBlur}
//         // value={formik.values.email}
//         ></input>

//         { formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div>:null}
//         <button type='submit'>Submit</button>
//     </form>
//   );
// };

// function App(){
//     return <SignupForm/>
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App/>, rootElement);


// // import React from "react";
// // import ReactDOM from "react-dom";
// // import { useFormik } from "formik";
// // import "./styles.css";

// // const SignupForm = () => {
// //   const formik = useFormik({
// //     initialValues: { email: "" },
// //     onSubmit: values => {
// //       alert(JSON.stringify(values, null, 2));
// //     }
// //   });
// //   return (
// //     <form onSubmit={formik.handleSubmit}>
// //       <label htmlFor="email">Email Address</label>
// //       <input
// //         id="email"
// //         name="email"
// //         type="email"
// //         onChange={formik.handleChange}
// //         value={formik.values.email}
// //       />
// //       <button type="submit">Submit</button>
// //     </form>
// //   );
// // };

// // function App() {
// //   return <SignupForm />;
// // }

// // const rootElement = document.getElementById("root");
// // ReactDOM.render(<App />, rootElement);










