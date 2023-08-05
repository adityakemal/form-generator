import React, { useRef, useState } from "react";
import moment from "moment";
import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
  message,
} from "antd";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

// const getBase64 = (img, callback) => {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// };

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function FormGenerator({
  data,
  onFinish,
  id,
  size,
  layout,
  formStyle,
  scrollToFirstError,
}) {
  const formRef = useRef(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleChangeSingleImage = async (info, name, uploadType) => {
    const file = info.file.originFileObj;

    const isJpgOrPng =
      (await file.type) === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = (await file.size) / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    console.log(isJpgOrPng, "isJpgOrPng");
    console.log(isLt2M, "isLt2m");
    try {
      const url = await getBase64(file);
      if (isJpgOrPng && isLt2M) {
        setImageUrl(url);
        // prettier-ignore
        formRef.current.setFieldValue(name,uploadType === "base64" ? url : file); //validate upload type
      } else {
        // const imgValueBefore = formRef.current.getFieldValue(name);
        formRef.current.setFieldValue(name, undefined);
        setImageUrl("");
      }
      console.log("successfully");
    } catch (error) {
      console.log(error, "error generate base64 uploading");
    }
  };

  return (
    <>
      <Form
        ref={formRef}
        id={id}
        onFinishFailed={(failData) => console.log(failData)}
        // labelCol={{
        //   span: 4,
        // }}
        // wrapperCol={{
        //   span: 14,
        // }}
        onFinish={(value) => {
          //filter value formatted
          for (const objForm of data) {
            if (objForm.type === "date") {
              value[objForm.name] = moment(value[objForm.name]).format(
                objForm.format
              );
            }
            if (objForm.type === "range") {
              value[objForm.name] = [
                moment(value[objForm.name][0]).format(objForm.format),
                moment(value[objForm.name][1]).format(objForm.format),
              ];
            }
          }
          onFinish(value);
        }}
        layout={layout}
        size={size}
        scrollToFirstError={scrollToFirstError}
        // disabled={componentDisabled}
        style={{ ...formStyle }}
      >
        {data.map((res, i) => {
          if (res?.type === "text")
            return (
              <Form.Item
                key={i}
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <Input placeholder={res?.placeholder} />
              </Form.Item>
            );
          if (res?.type === "number") {
            return (
              <Form.Item
                key={i}
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <InputNumber
                  placeholder={res?.placeholder}
                  min={res?.min}
                  max={res?.max}
                />
              </Form.Item>
            );
          }
          if (res?.type === "tel") {
            return (
              <Form.Item
                key={i}
                label={res?.label}
                name={res?.name}
                rules={res?.rules}
              >
                <Input placeholder={res?.placeholder} />
              </Form.Item>
            );
          }

          if (res?.type === "select")
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Select placeholder={res.placeholder}>
                  {res.options.map((option, optIdx) => (
                    <Select.Option key={optIdx} value={option.value}>
                      {option.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            );
          if (res?.type === "checkbox") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Checkbox.Group>
                  {res.options.map((option, optIdx) => (
                    <Checkbox key={optIdx} value={option.value}>
                      {option.label}
                    </Checkbox>
                  ))}
                </Checkbox.Group>
              </Form.Item>
            );
          }
          if (res?.type === "radio") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Radio.Group>
                  {res.options.map((option, optIdx) => (
                    <Radio key={optIdx} value={option.value}>
                      {option.label}
                    </Radio>
                  ))}
                </Radio.Group>
              </Form.Item>
            );
          }
          if (res?.type === "slider") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Slider min={res.min} max={res.max} />
              </Form.Item>
            );
          }
          if (res?.type === "switch") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Switch defaultChecked={false} />
              </Form.Item>
            );
          }
          if (res?.type === "date") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <DatePicker format={res.format} />
              </Form.Item>
            );
          }
          if (res?.type === "range") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <RangePicker />
              </Form.Item>
            );
          }
          //   if (res?.type === "upload") {
          //     return (
          //       <Form.Item label={res.label} key={i} name={res.name} rules={res?.rules}>
          //         <Upload.Dragger />
          //       </Form.Item>
          //     );
          //   }
          if (res?.type === "textarea") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <TextArea />
              </Form.Item>
            );
          }
          //SINGLE IMAGE
          if (res.type === "single_image") {
            return (
              <Form.Item
                label={res.label}
                key={i}
                name={res.name}
                rules={res?.rules}
              >
                <Upload
                  listType="picture-card"
                  className="avatar-uploader"
                  customRequest={() => {}}
                  showUploadList={false}
                  accept="image/png, image/jpg, image/jpeg"
                  showRemoveIcon
                  //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  //   beforeUpload={beforeUpload}
                  onChange={(info) =>
                    handleChangeSingleImage(info, res.name, res?.uploadType)
                  }
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{
                        width: "100%",
                      }}
                    />
                  ) : (
                    <Button>Upload</Button>
                  )}
                </Upload>
              </Form.Item>
            );
          }
        })}
      </Form>
    </>
  );
}
