import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import ChatLoader from "src/common/ChatLoader";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, data }] =
    useRefreshMutation();

  useEffect((): any => {
    const verifyRefreshToken = async () => {
      try {
        await refresh().unwrap();
      } catch (err) {
        navigate("/");
        console.error(err);
      }
    };
    if (!token) verifyRefreshToken();
    // eslint-disable-next-line
  }, []);

  let content: any;
  if (isLoading) {
    content = <ChatLoader />;
  } else if (isSuccess && token) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
