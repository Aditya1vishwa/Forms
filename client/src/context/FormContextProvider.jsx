import axios from "axios";
import React, { useEffect } from "react";
import { useState, useContext } from "react";
import { apiConfig } from "../apiConfig";

const FormContext = React.createContext();

const FormContextProvider = ({ children }) => {
  const [user, setUser] = useState("ram");
  const [subForms, setSubForms] = useState([]);
  const [allcat, setAllcat] = useState([
    "Finance",
    "School",
    "teaching",
    "informational",
  ]);

  const [menuitem, setmenuitem] = useState([
    {
      fieldName: "make yours",
      field: "make yours",
      regex: null,
      errmessage: "",
    },
    { fieldName: "radio", field: "radio", regex: null, errmessage: "" },
    { fieldName: "CheckBox", field: "CheckBox", regex: null, errmessage: "" },
    { fieldName: "text", field: "text", regex: null, errmessage: "" },
    {
      fieldName: "password",
      field: "password",
      regex:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/,
      errmessage: "Username should contain 8 digit 1 uppercase 1 unique",
    },
    {
      fieldName: "email",
      field: "email",
      regex: /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/,
      errmessage: "",
    },
    { fieldName: "date", field: "date", regex: null, errmessage: "" },
    { fieldName: "pdf", field: "pdf", regex: null, errmessage: "" },
    { fieldName: "range", field: "range", regex: null, errmessage: "" },
    { fieldName: "image", field: "image", regex: null, errmessage: "" },
  ]);

  const [category, setcategory] = useState([
    {
      questionText: "what is the?",
      questionimage: null,
      questioninputName: "radio",
      questionType: "radio",
      questionregex: null,
      errmessage: null,
      error: null,
      options: [
        { optiontext: "Ram" },
        { optiontext: "Shyam" },
        { optiontext: "Bharat" },
        { optiontext: "Sita" },
      ],
      Ans: "ans",
    },
  ]);

  const [create, setcreate] = useState({
    creat: "create form",
    cre: true,
  });

  const [forms, setform] = useState({
    formid: "",
    formName: "ram",
    formDesc: "asdfghjkl",
    formImg: "",
    formCat: "Radio",
    category: category,
  });

  const [subadmins, createSubadmins] = useState([]);
  const [res, setRes] = useState([]);
  const [admin, setAdmin] = useState("sv");
  const [subadmin, setsubAdmin] = useState("null");

  // useEffect(()=>{

  //     handleData();
  //     console.log(admin?.token);

  // },[admin])

  return (
    <FormContext.Provider
      value={{
        menuitem,
        setmenuitem,
        create,
        setcreate,
        res,
        setRes,
        allcat,
        setAllcat,
        subadmins,
        createSubadmins,
        user,
        setUser,
        subForms,
        setSubForms,
        category,
        setcategory,
        forms,
        setform,
        admin,
        setAdmin,
        subadmin,
        setsubAdmin,
      }}>
      {children}
    </FormContext.Provider>
  );
};

export const formProvider = () => {
  return useContext(FormContext);
};

export default FormContextProvider;
