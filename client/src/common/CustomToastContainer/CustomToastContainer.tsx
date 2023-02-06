import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import tw, { theme } from "twin.macro";
import "react-toastify/dist/ReactToastify.css";

const CustomToastContainer = () => {
  return (
    <Wrapper>
      <ToastContainer
        toastClassName="toast"
        position="top-right"
        closeButton={true}
        closeOnClick={false}
        limit={1}
        draggablePercent={60}
        autoClose={4000}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .toast {
    ${tw`font-DMSans font-normal`}
  }
`;

export default CustomToastContainer;
