import { Settings } from "lucide-react";

const ProfileBar = () => {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <img
          src="/fake-user-icon.png"
          alt="user icon"
          className="w-[50px] h-[50px]"
        />
        <h1 className="text-[#545871] text-[16px] font-[700]">James Ronald</h1>
      </div>

      <Settings className="w-[32px] h-[32px] text-[#6A6CE0]" />
    </div>
  );
};

export default ProfileBar;
