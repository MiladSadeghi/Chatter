import { useSelector } from "react-redux";
import tw from "twin.macro";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import DarkModeButton from "src/common/DarkModeButton";

const ProfileBar = () => {
  const userName = useSelector((state: any) => state.user.userName);
  return (
    <Wrapper>
      <Bar>
        <Profile>
          <ProfilePicture>{userName[0]}</ProfilePicture>
        </Profile>
        <div className="flex flex-col">
          <DarkModeButton />
          <LogOut />
        </div>
      </Bar>
    </Wrapper>
  );
};

const Wrapper = tw.div`w-20 h-full shadow-to-r dark:bg-[#171821]`;
const Bar = tw.div`flex flex-col p-3 h-full justify-between`;
const Profile = tw.div`flex justify-center`;
const ProfilePicture = tw.div`bg-my-light-purple w-[56px] h-[56px] capitalize rounded-2xl text-center items-center leading-[56px] text-white font-bold font-SFPro text-xl`;
const LogOut = tw(ArrowRightOnRectangleIcon)`w-8 h-8 mx-auto dark:text-white`;

export default ProfileBar;
