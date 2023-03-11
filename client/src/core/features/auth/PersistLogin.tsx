import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentToken, setUserAuthenticated } from "./authSlice";
import ChatLoader from "src/common/ChatLoader";
import { useDispatch } from "react-redux";

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const navigate = useNavigate();
  const [refresh, { isUninitialized, isLoading, isSuccess, isError, data }] =
    useRefreshMutation();
  const dispatch = useDispatch();

  useEffect((): any => {
    const verifyRefreshToken = async () => {
      try {
        await refresh().unwrap();
        dispatch(setUserAuthenticated(true));
      } catch (err) {
        dispatch(setUserAuthenticated(false));
      }
    };
    if (!token) verifyRefreshToken();
    // eslint-disable-next-line
  }, []);

  let content: any;
  if (isLoading) {
    content = <ChatLoader />;
  } else {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
