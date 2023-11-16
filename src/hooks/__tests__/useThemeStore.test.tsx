import { act, renderHook } from "@testing-library/react";
import useThemeStore, { darkTheme, lightTheme } from "../useThemeStore";

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("useThemeStore hook", () => {
  beforeEach(() => {
    window.localStorage.clear();
    jest.resetModules();
  });

  it("should default to dark theme if no preference is saved", () => {
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.theme).toEqual(darkTheme);
  });

  it("should use dark theme if saved in local storage", () => {
    window.localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useThemeStore());
    expect(result.current.theme).toEqual(darkTheme);
  });

  it("should toggle theme from dark to light", () => {
    const { result } = renderHook(() => useThemeStore());

    expect(result.current.theme).toEqual(darkTheme);

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toEqual(lightTheme);
  });
});
