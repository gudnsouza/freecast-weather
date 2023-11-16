import CityGridFooter from "@/components/city-grid-footer";
import ForecastPeriodSelector from "@/components/forecast-period-selector";
import TopBar from "@/components/top-bar";
import { Outlet } from "react-router-dom";
import SettingsModal from "./settings-modal";

const Root: React.FC = () => {
  return (
    <>
      <SettingsModal />
      <div
        style={{
          paddingLeft: "1rem",
          paddingRight: "1rem",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <TopBar />
        <Outlet />
        <ForecastPeriodSelector />
        <CityGridFooter />
      </div>
    </>
  );
};

export default Root;
