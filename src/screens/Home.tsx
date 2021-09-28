import { VFC } from "react";
import React from "react";
import { Dispatch, SetStateAction } from "react";
import { isLoggedInVar, logUserOut } from "../apollo";
import { useHistory } from "react-router-dom";

type Props = {
  login: () => void;
};
export default function Home({}) {
  const history = useHistory();
  return (
    <>
      <h1>Welcome!</h1>
      <button onClick={() => logUserOut(history)}>Logout</button>
    </>
  );
}
