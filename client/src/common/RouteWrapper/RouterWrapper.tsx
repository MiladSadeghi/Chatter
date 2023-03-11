import tw from "twin.macro";
import route from "../../animation/route";
import { motion } from "framer-motion";

const RouteWrapper = ({ children, className }: any) => {
  return (
    <Wrapper
      className={`${className}`}
      variants={route}
      initial="initial"
      animate="shown"
      exit="exit"
    >
      {children}
    </Wrapper>
  );
};

const Wrapper = tw(motion.div)`w-full`;

export default RouteWrapper;
