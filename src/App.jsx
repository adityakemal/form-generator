import dayjs from "dayjs";
// import "dayjs/locale/id";
import "./App.css";
import { Button, Form } from "antd";
import FormGenerator from "./components/FormGenerator";

function App() {
  const [hookFormGenerator] = Form.useForm();

  // console.log();

  const dataForm = [
    //TEXT
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Email address",
      rules: [{ required: true, message: "This field is required!" }],
    },
    //PASSWORD
    // Minimum eight characters, at least one letter and one number: "^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
    // Minimum eight characters, at least one letter, one number and one special character: "^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
    // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character: "(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Password",
      rules: [
        { required: true, message: "This field is required!" },
        {
          pattern: new RegExp(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
          ),
          message:
            "Minimum eight characters, at least one letter, one number and one special character",
        },
      ],
    },
    //CONFIRMATION PASSWORD
    {
      name: "confirm",
      label: "Confirm Password",
      type: "confirm_password",
      confirmationWith: "password", //  name input to validate value are same
      placeholder: "Confirm Password",
      rules: [{ required: true, message: "This field is required!" }],
    },

    //TEXT with number only
    {
      name: "ktp",
      label: "KTP",
      type: "text",
      placeholder: "KTP",
      rules: [
        {
          required: true,
          message: "This field is required!",
        },
        {
          min: 12, //min characters
        },
        {
          max: 12, //max characters
        },
        {
          pattern: /^(?:\d*)$/, // pattern for number only
          message: "Value should contain just number",
        },
      ],
    },
    //NUMBER
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Age",
      rules: [
        {
          required: true,
          message: "This field is required!",
        },
      ],
      min: 18,
      max: 70,
    },
    //PHONE WITH INDONESIAN FORMAT RULES
    {
      name: "phone",
      label: "Telephone",
      type: "tel",
      placeholder: "",
      rules: [
        {
          pattern: new RegExp(/^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/g),
          message: "Phone number format not match!",
        },
        { required: true, message: "This field is required!" },
      ],
    },
    //TEXTAREA
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description",
      rules: [{ required: true, message: "This field is required!" }],
    },
    //SELECT
    {
      name: "favorite_color",
      label: "Favorite Color Select type",
      placeholder: "choose color",
      type: "select",
      options: [
        { value: "blue", label: "Blue" },
        { value: " green", label: "Green" },
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    //CHECKBOX TYPE
    {
      name: "programing_language",
      label: "Programming Language",
      placeholder: "choose programming language",
      type: "checkbox",
      options: [
        { value: "javascript", label: "JavaScript" },
        { value: " python", label: "Python" },
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    //RADIO
    {
      name: "gender",
      label: "Gender",
      placeholder: "Choose gender",
      type: "radio",
      options: [
        { value: "male", label: "Pria" },
        { value: " female", label: "Wanita" },
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    //SLIDER
    {
      name: "progress",
      label: "Progress",
      type: "slider",
      placeholder: "Slider progress",
      min: 0,
      max: 100,
      rules: [{ required: true, message: "This field is required!" }],
    },
    //SWITCH
    {
      name: "status",
      label: "Status",
      type: "switch",
      rules: [{ required: true, message: "This field is required!" }],
      checkedChildren: "YES",
      unCheckedChildren: "NO",
    },
    //DATE
    {
      name: "birthday",
      label: "Birthday",
      type: "date",
      previewFormat: "DD MMM YYYY", //for preview
      payloadFormat: "DD-MM-YYYY", // for payload
      rules: [{ required: true, message: "This field is required!" }],
      //minDate and maxDate are optional
      // minDate: dayjs(new Date("2023-08-04")).format("YYYY-MM-DD"), //format YYYY-MM-DD , type string
      // maxDate: dayjs(new Date(), "YYYY-MM-DD").add(1, "day"), //today //format YYYY-MM-DD , type string
    },
    //DATE RANGE
    {
      name: "date_range",
      label: "Date Range",
      type: "range",
      previewFormat: "DD MMM YYYY",
      payloadFormat: "DD-MM-YYYY",
      rules: [{ required: true, message: "This field is required!" }],
      //minDate and maxDate are optional
      minDate: dayjs(new Date(), "YYYY-MM-DD").subtract(1, "month"), //format YYYY-MM-DD , type string
      maxDate: dayjs(new Date(), "YYYY-MM-DD").add(1, "day"), //today //format YYYY-MM-DD , type string
    },
    //IMAGE SINGLE TYPE
    {
      name: "avatar",
      label: "Avatar",
      type: "single_image",
      uploadType: "file", //default= 'file', options= "base64", "file", type string
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "is_have_escrow_agreement",
      label: "Do you have an Escrow Agreement?",
      type: "radio",
      options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      name: "is_radioGroup",
      label: "Fruit?",
      type: "radio",
      options: [
        { value: "apple", label: "Apple" },
        { value: "mango", label: "Mango" },
        { value: "nangka", label: "Nangka" },
      ],
      rules: [{ required: true, message: "This field is required!" }],
    },
    {
      type: "separator",
      label: "JUDUL SEPARATOR",
    },
  ];

  const handleSubmit = (value) => {
    console.log(value, "finished");
  };

  const valueWatch = Form.useWatch([], hookFormGenerator);
  return (
    <>
      <pre>{JSON.stringify(valueWatch, 0, 2)}</pre>
      <div className="max-w-[768px] mx-auto p-[24px] rounded-xl border-4 border-blue-100">
        <h1 className="text-center text-2xl">dynamic form</h1>
        {/* {dayjs(new Date(), "YYYY-MM-DD HH:mm:ss").toString()} */}
        <FormGenerator
          hookForm={hookFormGenerator}
          onFinish={handleSubmit}
          data={dataForm}
          id="dynamicForm"
          size="default" //small , default , large
          layout="vertical" //vertical, horizontal
          // formStyle={{ maxWidth: "100%" }}
        />
        <Button form="dynamicForm" htmlType="submit" className="mt-3">
          Submit
        </Button>
      </div>
    </>
  );
}

export default App;
