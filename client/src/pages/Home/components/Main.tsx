import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import tw from "twin.macro";

type TGoal = {
  title: string;
  blueTitle: string;
  desc: any;
};

const Goal = ({ title, blueTitle, desc }: TGoal) => {
  return (
    <div className="flex font-SFPro">
      <div className="mr-4 h-full w-2 rounded-lg bg-my-blue" />
      <div className="flex flex-col justify-around">
        <h5 className="mb-2 text-[65px] font-bold leading-none text-my-blue">
          {blueTitle}
          <span className="text-[60px] font-medium text-black"> {title}</span>
        </h5>
        <p className="font-SFPro text-lg font-light leading-6 text-my-blue-gray">
          {desc}
        </p>
      </div>
    </div>
  );
};

const Main = () => {
  const goals = [
    {
      blueTitle: "100+",
      title: "user",
      desc: (
        <>
          We looking for almost 100+ <br /> and 10+ active user
        </>
      ),
    },
    {
      blueTitle: "Update",
      title: "monthly",
      desc: (
        <>
          We try to update monthly and handle
          <br />
          github issue daily.
        </>
      ),
    },
    {
      blueTitle: "50+",
      title: "like",
      desc: (
        <>
          I will try my best. But if you have come this far,
          <br />
          come back and give a like.
        </>
      ),
    },
  ];
  return (
    <Wrapper>
      <div>
        <div className="mb-28">
          <h2 className="text-center font-SFPro text-7xl font-bold">
            OUR <span className="text-my-blue">GOAL</span>
          </h2>
        </div>
        <div className="flex justify-between">
          {goals.map(({ title, blueTitle, desc }: TGoal, index): any => (
            <Goal title={title} blueTitle={blueTitle} desc={desc} key={index} />
          ))}
        </div>
      </div>
      <div className="mt-56 mb-24 flex h-[567px] w-full flex-col items-center justify-evenly rounded-2xl bg-gradient-to-b from-[#605E65] to-[#292A33]">
        <h2 className="font-SFPro text-7xl font-bold text-white">
          So, What do you waiting for?
        </h2>
        <p className="text-center text-5xl font-normal leading-tight text-my-light-gray">
          Let’s try Chatter and get the
          <br />
          benefit
        </p>
        <Button className="bg-my-blue">
          Try it now
          <ArrowLongRightIcon className="ml-4 w-7" />
        </Button>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`container mx-auto`;
const Button = tw.button`py-3 flex items-center justify-center rounded-lg text-white font-DMSans text-xl w-48`;

export default Main;
