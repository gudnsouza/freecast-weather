import CityGridFooter from "@/components/city-grid-footer";
import ForecastPeriodSelector from "@/components/forecast-period-selector";
import TopBar from "@/components/top-bar";
import { Outlet } from "react-router-dom";
import SettingsModal from "./settings-modal";

const Root: React.FC = () => {
  return (
    <>
      <SettingsModal />
      <TopBar />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <Outlet />
        <ForecastPeriodSelector />
      </div>
      <CityGridFooter />
    </>
  );
};

export default Root;
