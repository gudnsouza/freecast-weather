import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global-style";
import useThemeStore from "./hooks/useThemeStore";
import CurrentForecast from "./routes/current-forecast";
import ErrorPage from "./routes/error-page";
import Root from "./routes/root/index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <CurrentForecast />,
      },
    ],
  },
]);

const App: React.FC = () => {
  const { theme } = useThemeStore();
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
