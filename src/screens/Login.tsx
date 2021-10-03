import React, { useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "../components/auth/AuthLayout";
import Separator from "../components/auth/Separator";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import FormBox from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { set, useForm } from "react-hook-form";
import { SubmitHandler } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation, useQuery } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useLocation } from "react-router-dom";
import { login, loginVariables } from "../__generated__/login";

type FormProps = {
  username: string;
  password: string;
  result?: string;
};
type LocationProps = {
  message?: string;
  username?: string;
  password?: string;
};
const FacebookLogin = styled.div`
  color: #385285;

  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const Notifications = styled.div`
  color: #2ecc71;
`;

function Login() {
  const location = useLocation<LocationProps>();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm<FormProps>({
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
    mode: "onChange",
  });

  const Login_mutation = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        ok
        token
        error
      }
    }
  `;
  const { username, password } = getValues();
  const [login, { loading }] = useMutation<login, loginVariables>(
    Login_mutation,
    {
      variables: { username, password },
      onCompleted: (data) => {
        const {
          login: { ok, error, token },
        } = data;
        if (error) {
          return setError("result", {
            message: error,
          });
        }
        if (token) {
          logUserIn(token);
        }
      },
    }
  );
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) return;
    login();
  };
  const { errors } = formState;

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notifications>{location?.state?.message}</Notifications>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", { required: "username is required" })}
            hasError={Boolean(errors?.username?.message)}
            placeholder="username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              minLength: {
                value: 3,
                message: "password should be longer than 3 characters",
              },
            })}
            hasError={Boolean(errors?.password?.message)}
            placeholder="password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Looading..." : "Login"}
            disabled={!formState.isValid || loading}
          />
        </form>
        <Separator>OR</Separator>

        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign Up"
      />
    </AuthLayout>
  );
}

export default Login;
