
import  React from 'react'
import  ReactDOM from 'react-dom';
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage,useField, useFormik} from "formik";
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
    <input className='radio-input' {...field} {...props}></input>
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
        <a className='signup-link' href='#'>Sign Up to Drive</a>
     </div>
     <div >
     <h3 className='opp'>Opportunity is<br/>everywhere</h3>
     </div>
    
     
     </>
       
    )
} 


const ModalPage = ({setisShow, ...props}) => { 
         
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
                <button type="reset" className='confirm' >Confirm</button>
                <button className='Edit' onClick={()=> {
                    setisShow(false)
                }}>Edit</button>
            </div>
        </div>
    )

}

//main Component
const SignupForm = () => {  

    //defined states
    const [isShow, setisShow] = useState(false);
     const [initialValues, setinitialValues]  = useState({
        email:"" ,
        firstName:"",
         lastName:"",
         password:'',
         origin:'',
         inviteCode:""
      });
    
      //Formik methods 
const onSubmit = (values) => {
    alert(values.firstName);
    setisShow(true)
    setinitialValues(values)
}
const validationSchema =
    Yup.object({    
        firstName:Yup.string() .max(15,"Must be 15 characters or less").required("Required"),
        lastName:Yup.string().max(20,"Must be 20 words or less") .required('Required'),
        email:Yup.string().email("Inavlid email address").required("required"),
        password:Yup.string().required('Required'),
        origin:Yup.string().required('Required'),
        inviteCode:Yup.string().max(5, 'Must be 5 characters').required('Required'),
    })


//Event handlers
const handleConfirm = (onSubmitProps) => {
    setisShow(false);
    alert("you have sucecessfully registered");
    onSubmitProps.resetForm();

  };
    return( 
        <div className='driver-image'>
        <div className='formik-container'> 
        <Welcome />  
        <div>
            <img src={images} alt='capture' className='driver'/>
        </div>
        <Formik initialValues={initialValues}  onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => (
         <Form>
         <div style={{display:"flex",marginTop:"20px", gap:"30px"}}>
         <MyRadioBox  label="I have a car" name="car"  type="radio" />
         <MyRadioBox label="I need a car" name="car"  type="radio" />
         </div>
      <MyTextInput label="First Name" name="firstName" type="text" />
      <MyTextInput label="Last Name" name="lastName" type="text"  />    
      <MyTextInput label="Email Address" name="email" type="email" />
       <MyTextInput label='PassWord' name='password' type='text' />
       <MyTextInput label="Origin" name='origin' type='text' />
       <MyTextInput label='Invitation Code' name='inviteCode' type='text' />
       <div className='agreement'>
       <p style={{marginTop:"30px"}}>By proceeding I agree to UBer's <a href='#'><i style={{color:"blue"}}>Terms of Use</i> </a> and acknowledge That I have Read the <a href='#'><i style={{color:"blue"}}>
       Privacy Policy  </i></a></p>
          <p>I also agree tht Uber or the representation may  contact me by email, ohome or SMS(Incuding by automtic means) at the addresses or number i provided including for mrketing purpose</p>
          <MyCheckbox name="acceptedTerms">
             I accept the terms and conditions
          </MyCheckbox>
           </div> 
      <button type="submit" >Sign up to drive</button>
      <p className='have-account'>Already have an account? <a href='#'>Sign Up</a></p>
      
      {isShow ? ( <div className='main-modal'>
             <div>
                <p>FirstName: {initialValues.firstName}</p>
                <p>LastName: {initialValues.lastName}</p>
                <p>Email: {initialValues.email}</p>
                <p>PassWord: {initialValues.origin}</p>
                <p>Origin: {initialValues.inviteCode}</p>
                <p>inviteCode: {initialValues.password}</p>

                </div>
            <div className='modal'>
                <button type="reset" className='confirm' onClick={()=>
                {
                    formik.resetForm();
                    setisShow(false)
                }
                } >Confirm</button>
                <button className='Edit' onClick={()=> {
                    setisShow(false)
                }}>Edit</button>
            </div>
        </div>) : null }
    </Form> 
        )}
      </Formik>
         </div>
         </div>
        
       
     );
 };

 const ImagePage = () => {
    return(

        <div className='left-div'>
           <div className='opportunity'>
            <h3>Opportunity is <br/>everywhere</h3>
            <p>Make the most of your time on the road on<br/> the platform with the most of active riders</p>
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












