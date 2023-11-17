import CityGridFooter from "@/components/city-grid-footer";
import ForecastPeriodSelector from "@/components/forecast-period-selector";
import TopBar from "@/components/top-bar";
import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";

const SettingsModal = React.lazy(() => import("./settings-modal"));

const Root: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading settings...</div>}>
        <SettingsModal />
      </Suspense>
      <TopBar />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
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
