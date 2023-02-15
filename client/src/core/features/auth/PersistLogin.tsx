import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import ChatLoader from "src/common/ChatLoader";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);
  const navigate = useNavigate();
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect((): any => {
    if (
      effectRan.current === true ||
      process.env.REACT_APP_NODE_ENV !== "development"
    ) {
      const verifyRefreshToken = async () => {
        try {
          await refresh().unwrap();
          setTrueSuccess(true);
        } catch (err) {
          navigate("/");
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => (effectRan.current = true);

    // eslint-disable-next-line
  }, []);

  let content: any;
  if (isLoading) {
    content = <ChatLoader />;
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
