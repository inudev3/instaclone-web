import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedInVar, logUserOut, TOKEN } from "../apollo";
import { me } from "../__generated__/me";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const ME_QUERY = gql`
  query me {
    me {
      username
      avatar
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const { loading, data } = useQuery<me>(ME_QUERY, {
    // to query
    skip: !hasToken, //if not logged in, do not execute query
  });

  useEffect(() => {
    if (data?.me === null) {
      logUserOut(history);
    }
  }, [data]);
  return { data };
}

export default useUser;
