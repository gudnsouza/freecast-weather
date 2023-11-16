import { act, renderHook } from "@testing-library/react";
import { useModalStore } from "../useModalStore";

describe("useModalStore hook", () => {
  it("should start with modal closed", () => {
    const { result } = renderHook(() => useModalStore());
    expect(result.current.isModalOpen).toBe(false);
  });

  it("should open the modal", () => {
    const { result } = renderHook(() => useModalStore());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isModalOpen).toBe(true);
  });

  it("should close the modal", () => {
    const { result } = renderHook(() => useModalStore());

    act(() => {
      result.current.openModal();
    });

    act(() => {
      result.current.closeModal();
    });

    expect(result.current.isModalOpen).toBe(false);
  });
});
