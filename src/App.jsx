import "./App.css";
import { Button } from "antd";
import FormGenerator from "./components/FormGenerator";

function App() {
  const dataForm = [
    //TEXT
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
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
    //NUMBER
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
    //Switch
    {
      name: "status",
      label: "Status",
      type: "switch",
      rules: [{ required: true, message: "This field is required!" }],
    },
    //DATE
    {
      name: "birthday",
      label: "Birthday",
      type: "date",
      format: "DD-MM-YYYY",
      rules: [{ required: true, message: "This field is required!" }],
    },
    //date range
    {
      name: "date_range",
      label: "Date Range",
      type: "range",
      format: "DD-MM-YYYY",
      rules: [{ required: true, message: "This field is required!" }],
    },
    //IMAGE
    {
      name: "avatar",
      label: "Avatar",
      type: "single_image",
      uploadType: "base64", //default= 'file', options= "base64", "file", type string
      rules: [{ required: true, message: "This field is required!" }],
    },
  ];

  const handleSubmit = (value) => {
    console.log(value, "finished");
  };

  return (
    <>
      <FormGenerator
        onFinish={handleSubmit}
        data={dataForm}
        id="dynamicForm"
        size="default" //small , default , large
        layout="vertical" //vertical, horizontal
        scrollToFirstError={true} //scroll to first error
        // formStyle={{ maxWidth: "100%" }}
      />
      <Button form="dynamicForm" htmlType="submit">
        Submit
      </Button>
    </>
  );
}

export default App;
