import React from "react";
import styled from "styled-components";
import { FatLink } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import AuthLayout from "../components/auth/AuthLayout";
import Separator from "../components/auth/Separator";
import { Helmet } from "react-helmet-async";
import Input from "../components/auth/Input";
import { Container } from "../components/auth/FormBox";
import BottomBox from "../components/auth/BottomBox";
import routes from "../routes";
import PageTitle from "../components/PageTitle";
import { SubmitHandler, useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import FormError from "../components/auth/FormError";
import Button from "../components/auth/Button";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const SignUpBox = styled(Container)`
  form {
    margin-top: 0px;
  }
`;

type FormProps = {
  email: string;
  username: string;
  password: string;
  firstName: string;
  result?: string;
  lastName?: string;
};

function SignUp() {
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
    mode: "onChange",
  });
  const history = useHistory();
  const SignUp_mutation = gql(`
    mutation createAccount(
     $firstName: String!
     $lastName: String
     $username: String!
     $email: String!
     $password: String!
    ) {
      createAccount(
      firstName:$firstName
      lastName:$lastName
      username:$username
      email:$email
      password:$password
      ) {
        ok
        error
      }
    }
`);

  const [createAccount, { loading, data, error, called }] = useMutation(
    SignUp_mutation,
    {
      onCompleted: (data) => {
        const { username, password } = getValues();
        const {
          createAccount: { ok, error },
        } = data;
        if (!ok) {
          return setError("password", {
            message: error,
          });
        }
        history.push(routes.home, {
          message: "Account created.Please Login",
          username,
          password,
        });
      },
    }
  );
  const onSubmitValid: SubmitHandler<FormProps> = (data) => {
    if (loading) return;
    createAccount({ variables: { ...data } });
  };
  const { errors } = formState;
  return (
    <AuthLayout>
      <PageTitle title="Sign Up" />
      <SignUpBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", { required: "this field is required" })}
            hasError={Boolean(errors?.firstName?.message)}
            placeholder="firstName"
          />
          <FormError message={errors?.firstName?.message} />
          <Input {...register("lastName")} placeholder="lastName" />
          <Input
            {...register("username", { required: "this field is required" })}
            hasError={Boolean(errors?.username?.message)}
            placeholder="username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("email", { required: "this field is required" })}
            hasError={Boolean(errors?.email?.message)}
            placeholder="email"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("password", { required: "this field is required" })}
            hasError={Boolean(errors?.password?.message)}
            placeholder="password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Looading..." : "Sign Up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </SignUpBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log In" />
    </AuthLayout>
  );
}

export default SignUp;
