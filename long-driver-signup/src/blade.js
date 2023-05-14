import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Modal from './Modal';
import carPic from "../../assets/10109.jpg"
const InputFields = (props:any) => {
  return (
    <div>
   <section className="main-section-right ]  ">
         <div className='mb-1'>
            <label >{props.label}</label>
            <input 
            type={props.type}
            name={props.name}
            className={`block form-input w-full  rounded border py-1 px-2 ${props.touched && props.errors ? 'border-red-400' : 'border-gray-300'}`}
              onChange={props.handleChange} onBlur={props.handleBlur} value={props.values} />
            {props.touched && props.errors && (
              <span className='text-red-400'>{props.errors}</span>
            )}
          </div>
        </section>
    </div>
  )
}
// create the temlate for reusing the input ifeld as components 

const Reusable = () => {
  const [showModal , setShowModal]= useState(false)
  const toggleModal = ()=>{
    setShowModal(true)
  }
  //TODO create formik instance
  const formik = useFormik({
     initialValues: {
       car: '',
       firstname: '',
       lastname: '',
       email: '',
      password: '',
       age: '',
       phonenumber: '',
       city: '',
       invitecode:''
     },
     validationSchema: Yup.object({
       firstname: Yup.string()
       .min(2, "Too Short!")
       .max(50, "Too Long!")
       .required(),
   
     lastname: Yup.string()
       .min(2, "Too Short!")
       .max(50, "Too Long!")
       .required(),              
       email: Yup.string()
               .email()
               .required(),

        password: Yup.string()
        .required()
         .min(6, "Password is too short - should be 6 chars minimum"),
      phonenumber: Yup.string().
      required('Phone number is required').matches(/^[0-9]+$/, 'Must be only digits').min(7, 'Too short').max(15, 'Too long')
       .label('phone number'),
       city:Yup.string()    
       .label('city')
       .required(),
       car:Yup.string()    
       .label('car')
       .required(),
       invitecode:Yup.string()    
       .label('invite code')
       .optional()
     }),
     onSubmit: function () { 
      toggleModal()     
     }
   })
     // /display the modal values on   
const showmodal=()=>{
  alert(`The form values are 
   car: ${formik.values.car}. 
  firstnaame: ${formik.values.firstname}. 
  lastnaame: ${formik.values.lastname}.
  Email: ${formik.values.email}.
  password: ${formik.values.password}.
  phonenumber: ${formik.values.phonenumber}.
  city: ${formik.values.city}.
  invitecode: ${formik.values.invitecode}
   `);  
  formik.resetForm();
}
  return (
    <main className=' main-section  px-[1em]  md:shadow-lg my-[2em]  mx-auto my-0 md:w-[70%] 
    md:flex ' >
             <section className="main-section-left ">
            <article className='block md:hidden'>
              <img src={carPic} alt="carPic " />
            </article>
            <article className="content px-2 ">
              <div> 
              <h1 className='text-[30px] my-[1em] ' >Opportunity is EveryWhere</h1>
              <p>make the most of your time on the road oon the platform with the largest 
                netwok of active riders</p>
            </div>
            </article>
        </section>
        <section className="main-section-right mt-[0.5em] ]  ">
    <div className="form-top flex ">
            <h3 className="form-top-head font-[500]  text-[20px]  ">Become a driver</h3>
            <h3 className="form-top-head mt-[5px] ml-[12px] ">Sign up to ride</h3>
     </div>


      <form   onSubmit={formik.handleSubmit}  >

        {/* Validate radio buttons   */}
<section className="radio-btns mb-5  ">
<div className='flex  mt-3  ' >
  <span className="radio">
        <input 
        type="radio"
         className=' radiobtn w-[1.2em] h-[1.2em]   mr-2  cursor-pointer '  
         id="haveCar" 
         name='car'
         value="Has Car" 
         onChange={formik.handleChange}
         checked={formik.values.car === "Has Car"}
         />
      <label htmlFor="haveCar" className=" cursor">
        I have a car
      </label>
      </span>  <span className="radio">   
        <input 
        type="radio" 
        className=' radiobtn w-[1.2em] h-[1.2em]  mr-2  cursor-pointer' 
        id="needCar"
        name='car' 
        value="Needs Car"
        onChange={formik.handleChange}
        checked={formik.values.car === "Needs Car"}
         />
      <label htmlFor="needCar" className=" cursor-pointer">
        I need a car
      </label>    
      </span>
      </div>
      {formik.touched.car && formik.errors.car && (
              <span className='text-red-400'>{formik.errors.car}</span>
            )}
    </section>
<InputFields label="First name" name="firstname" type="text"
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.firstname}
errors={formik.errors.firstname}
values={formik.values.firstname}
/>
{/* <InputFields label="" name="" type="" /> */}
<InputFields label="Last name" name="lastname" type="texte" 
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.lastname}
errors={formik.errors.lastname}
values={formik.values.lastname}
/>
<InputFields label="Email" name="email" type="email" 
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.email}
errors={formik.errors.email}
values={formik.values.email}
/>
<InputFields label="Password" name="password" type="password" 
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.password}
errors={formik.errors.password}
values={formik.values.password}
/>
<InputFields label="Phone number" name="phonenumber" type="tel" 
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.phonenumber}
errors={formik.errors.phonenumber}
values={formik.values.phonenumber}
/>
<InputFields label="City you'll drive in" name="city" type="text" 
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.city}
errors={formik.errors.city}
values={formik.values.city}
/>
<InputFields label="invite Code(optional(" name="invitecode" type="text" 
handleChange={formik.handleChange}
handleBlur={formik.handleBlur} 
touched={formik.touched.invitecode}
errors={formik.errors.invitecode}
values={formik.values.invitecode}
/>
<p className="form-text">
              By proceeding, you'll agree to Uber's <a href="/"> Term of Use</a>
               and acknowledge 
              taht i have read the  <a href="/"> Privacy Policy</a>
            </p>
            <p className="form-text"> I also agree that Uber or it's representatives 
            may contact me  by email,photo or SMS(including by automated means
           ) at the email address or number i provide,
            including for marketing purposes  </p>
<div className='text-center mt-3'>
            <button         
         className='bg-[black] rounded p-3 text-white'  >Submit</button>
          </div>
          <p className="form-text mb-[1em] ">Already have an Account ? <a href="/">
               Sign In</a>  </p>
          </form>
          </section>
{/* <InputFields label="" name="" type="" /> */}
{showModal? (<Modal showModal={showModal} setShowModal={setShowModal}
          showmodal={showmodal}  />):null }
    </main>
    
  )
}

export default Reusable