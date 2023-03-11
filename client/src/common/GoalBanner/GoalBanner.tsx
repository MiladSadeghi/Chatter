import tw from "twin.macro";

export type TGoal = {
  title: string;
  blueTitle: string;
  desc: any;
};

const Goal = ({ title, blueTitle, desc }: TGoal) => {
  return (
    <Wrapper>
      <div className="mr-4 h-auto w-2 rounded-lg bg-my-blue lg:h-full" />
      <div className="flex flex-col justify-around">
        <h5 className="mb-2 text-[65px] font-bold leading-none text-my-blue">
          {blueTitle}
          <span className="text-[60px] font-medium text-black"> {title}</span>
        </h5>
        <p className="font-SFPro text-lg font-light leading-6 text-my-blue-gray">
          {desc}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = tw.div`flex w-full font-SFPro lg:last:justify-end mb-6 lg:mb-0`;

export default Goal;
