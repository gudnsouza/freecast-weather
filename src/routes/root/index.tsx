import TopBar from "@/components/top-bar";
import { Outlet } from "react-router-dom";
import SettingsModal from "./settings-modal";

const Root: React.FC = () => {
  return (
    <>
      <SettingsModal />
      <div>
        <TopBar />
        <Outlet />
      </div>
    </>
  );
};

export default Root;
