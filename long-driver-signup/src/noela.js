import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../FormikControl/FormikControl";
import styles from "./FormikRenderProps.module.css";
export default function FormikRenderProps() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isConfirm, setIsConfirm] = useState(false);
  const [nedEdit, setNeedEdit] = useState(false);
  const [passType, setPassType] = useState("password");
  const [isVissible, setIsVissible] = useState(false);
  const options = [
    { key: "I have a car", value: "I have a car" },
    { key: "I need a car", value: "I need a car" },
  ];
  const [initialValues, setInitialValues] = useState({
    radioOption: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phoneNumber: "",
    city: "",
    inviteCode: "",
  });
  const [initialValue, setInitialValue] = useState(initialValues);
  const regEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //const regEX = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  const validationSchema = Yup.object().shape({
    radioOption: Yup.string().required("selection required"),
    firstName: Yup.string()
      .max(15, "must be atmost 15 characters")
      .matches(/^[A-Za-z]*$/, "please enter a valid name")
      .required("First name is required"),
    lastName: Yup.string()
      .max(15, "must be atmost 15 characters")
      .matches(/^[A-Za-z]*$/, "please enter a valid name")
      .required("last name is required"),
    email: Yup.string().email("Invalid email address").matches(regEX, "invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Must be atleast 8 characters")
      .required("Required")
      .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "Password ahould contain at least one uppercase and lowercase character")
      .matches(/\d/, "Password should contain at least one number")
      .matches(/[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/, "Password should contain at least one special character"),
    phoneNumber: Yup.string()
      .matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, "please enter a valid number")
      .test("len", "must be exactly 9 characters", (val) => val.length === 9)
      .required("required"),
    city: Yup.string()
      .matches(/^[A-Za-z]*$/, "please enter a valid city")
      .max(20, "field must be atmost 20 charcaters")

      .min(3, "must be atleast 3 characters")
      .required("required"),
    inviteCode: Yup.string(),
  });
 
  const handleConfirm = (onSubmitProps) => {
    setSubmitted(false);
    alert("you have sucecessfully registered");
    onSubmitProps.resetForm();

  };
  const handleEdit = () => {
    setSubmitted(false);
  };

  
  const onSubmit = (values, onSubmitProps) => {
    setInitialValue({
      radioOption: values.radioOption,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      phoneNumber: values.phoneNumber,
      city: values.city,
      inviteCode: values.inviteCode,
    });
   // onSubmitProps.setSubmitting(true);
    console.log("form data", values);
    console.log("form input", initialValue);
    //onSubmitProps.setSubmitting(false);
    // alert(JSON.stringify(values, null, 8));
    setSubmitted(true);
   //  onSubmitProps.resetForm();
    
  };

  const handleVissiblity = () => {
    setPassType("text");
    setIsVissible((prev) => !prev);
  };
  const handleHideVissiblity = () => {
    setPassType("password");
    setIsVissible((prev) => !prev);
  };
  console.log(initialValue.radioOption);
  return (
    <div className={styles.baseForm}>
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => (
          <Form>
            <FormikControl control="radio" type="radio" label="Become a driver" name="radioOption" options={options} value="" />
            <FormikControl control="input" type="text" label="first name" name="firstName" />
            <FormikControl control="input" type="text" label="last name" name="lastName" />
            <FormikControl control="input" type="email" label="email" name="email" />
            <FormikControl control="input" type={passType} label="password" name="password" vissible={isVissible} handleVissiblity={handleVissiblity} handleHideVissiblity={handleHideVissiblity} />
            <FormikControl control="input" type="tel" label="phone number" name="phoneNumber" />
            <FormikControl control="input" type="text" label="city you'll drive in" name="city" />
            <FormikControl control="input" type="text" label="invite code(optional)" name="inviteCode" />
            <p className={styles.conditions}>
              By proceeding, I agree to Uber's{" "}
              <span>
                <a href="">Terms of Use</a>
              </span>{" "}
              and acknowledge that i have read the{" "}
              <span>
                <a href="">Privacy Policy</a>
              </span>
              <br />
            </p>
            <p className={styles.conditions}>I also agree that Uber or it's representatives may contact me by email, phone, or SMS (including by automated means) at the email address or number I provide, including for marketing purposes.</p>
            <button type="submit" disabled={!formik.isValid} className={styles.submit}>
              Sign up to drive
            </button>
            <p className={styles.conditions}>
              Already have an account?{" "}
              <span>
                <a href="">SignIn</a>
              </span>
            </p>

            <div className={styles.modal} style={{ display: submitted ? "block" : "none" }}>
              <h3>sucessful input validation</h3>
              <p>radio option:{initialValue.radioOption}</p>
              <p>first name:{initialValue.firstName}</p>
              <p>last name:{initialValue.lastName}</p>
              <p>email:{initialValue.email}</p>
              <p>password:{initialValue.password}</p>
              <p>phone number:{initialValue.phoneNumber}</p>
              <p>city:{initialValue.city}</p>
              <p>invite code (optional):{initialValue.inviteCode}</p>
              <hr />
              <div className={styles.modalBtn}>
                <button type="reset" className={styles.confirm} onClick={handleConfirm}>
                  Confirm
                </button>
                <button className={styles.close} type="button" onClick={handleEdit}>
                  Edit
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}