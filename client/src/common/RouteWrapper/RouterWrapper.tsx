import tw from "twin.macro";
import route from "../../animation/route";
import { motion } from "framer-motion";

const RouteWrapper = ({ children }: any) => {
  return (
    <Wrapper variants={route} initial="initial" animate="shown" exit="exit">
      {children}
    </Wrapper>
  );
};

const Wrapper = tw(motion.div)`w-full`;

export default RouteWrapper;
