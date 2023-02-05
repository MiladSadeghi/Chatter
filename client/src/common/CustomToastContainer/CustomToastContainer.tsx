import { ToastContainer } from "react-toastify";
import styled from "styled-components";
import tw, { theme } from "twin.macro";
const CustomToastContainer = () => {
  return (
    <Wrapper>
      <ToastContainer
        toastClassName=""
        position="bottom-right"
        closeButton={false}
        closeOnClick={false}
        limit={5}
        draggablePercent={60}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default CustomToastContainer;
