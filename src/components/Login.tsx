import React, { Dispatch, SetStateAction, useState } from "react";
import Logo from "./Logo";
import { Formik, Form, Field } from "formik";
import axios from "axios";

interface LoginFormState {
  username: string;
  password: string;
}

const initialFormState: LoginFormState = {
  username: "",
  password: "",
};

const BASE_URL = "http://localhost:8080";

const getAuthToken = async (username: string, password: string) => {
  const req = {
    username,
    password,
  };
  const response = await axios.post(`${BASE_URL}/api/login`, req);
  return response.data;
};

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setLogin }) => {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: LoginFormState) => {
    try {
      const data = await getAuthToken(values.username, values.password);
      localStorage.setItem("token", data.accessToken.token);
      localStorage.setItem("username", data.username);
      setLogin(true);
      setError(null);
    } catch (error: any) {
      console.error("Error during login:", error);
      if (error.response) {
        if (error.response.status === 404) {
          setError("Username or password is incorrect.");
        } else if (error.response.status === 401) {
          setError(
            "Invalid credentials. Please check your username and password."
          );
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section className="flex justify-center items-center min-h-screen w-full">
      <div className="flex flex-row w-full h-full">
        <div className="w-1/2 flex">
          <img
            src="https://lh3.googleusercontent.com/p/AF1QipN4Yb3jPXtQ0bsktGCjFvae4ti_jqosqViRPHrA=s1360-w1360-h1020"
            alt="Image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center items-center p-20">
          <Logo />
          <h3 className="text-3xl font-bold text-center my-5">
            Sign in to your account
          </h3>
          <Formik initialValues={initialFormState} onSubmit={handleSubmit}>
            <Form className="space-y-3 w-full">
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <Field
                id="username"
                name="username"
                placeholder="Username"
                required
                className="w-full p-3 border rounded-md"
              />
              <Field
                id="password"
                name="password"
                placeholder="Password"
                required
                className="w-full p-3 border rounded-md"
              />
              <button
                className="bg-orange-600 hover:bg-orange-500 transition-all w-full p-3 rounded-md text-white font-bold text-lg"
                type="submit"
              >
                Log In
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </section>
  );
};

export default Login;
