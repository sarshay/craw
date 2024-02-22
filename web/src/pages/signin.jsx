import React, { useState } from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { API_ROUTES, APP_ROUTES } from "../routes";
import axios from "axios";
// import { storeTokenInLocalStorage } from "../hooks/auth/auth";
import { NavigateProps, useNavigate } from "react-router-dom";
import { useLayout } from "../providers/context";
import { useCookies } from "react-cookie";

const SignInPage = (formData) => {

  const [cookies, setCookie] = useCookies(["user_token"]);
  const [loading, setLoading] = useState(false);
  const [messageAPi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const signIn = (values) => {
    setLoading(true);
    var option = {
      url: API_ROUTES.SIGN_IN,
      headers: {
        Accept: "application/json",
        "Content-type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      data: values,
      credentials: 'include',
    };

    axios(option)
      .then(function (response) {
        setCookie('user_token', response.data.token, { path: '/' })
        navigate(APP_ROUTES.DASHBOARD);
      })
      .catch((err) => {
        err.response
          ? messageAPi.error(err.response.data.message)
          : messageAPi.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={signIn}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      {contextHolder}
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInPage;
