import tw from "twin.macro";

const Account = ({ children }: any) => {
  const spacePercentage = [
    "left-[5%]",
    "left-[15%]",
    "left-[32.5%]",
    "left-[50%]",
    "left-[67%]",
    "left-[85%]",
  ];
  return (
    <div className="relative z-20 flex h-screen w-full items-center justify-center bg-my-light-white">
      <div className="bg-clip absolute  bottom-0 left-0 z-10 h-full w-full bg-white" />
      <div className="border-clip absolute left-0 bottom-0 z-10 h-full w-full bg-my-turquoise " />
      <div className="cutter-clip absolute left-0 bottom-0 z-10 h-full w-full bg-white" />
      {spacePercentage.map((space: string, index: number) => (
        <Line className={`${space}`} key={index}></Line>
      ))}
      <div className="z-30">{children}</div>
    </div>
  );
};

const Line = tw.div`top-0 h-full w-2 border-r-2 border-dashed border-gray-500 opacity-[7%] absolute z-10`;

export default Account;
