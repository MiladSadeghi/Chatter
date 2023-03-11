import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import Goal, { TGoal } from "src/common/GoalBanner/GoalBanner";
import tw from "twin.macro";

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
        <div className="flex flex-col lg:flex-row">
          {goals.map(({ title, blueTitle, desc }: TGoal, index): any => (
            <Goal title={title} blueTitle={blueTitle} desc={desc} key={index} />
          ))}
        </div>
      </div>
      <div className="mt-14 mb-24 flex h-[567px] w-full flex-col items-center justify-evenly rounded-2xl bg-gradient-to-b from-[#605E65] to-[#292A33] text-center md:mt-56">
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
