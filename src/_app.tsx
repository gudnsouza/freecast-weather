import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global-style";
import useThemeStore from "./hooks/useThemeStore";
import CurrentForecast from "./routes/current-forecast";
import ErrorPage from "./routes/error-page";
import Root from "./routes/root/index";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
