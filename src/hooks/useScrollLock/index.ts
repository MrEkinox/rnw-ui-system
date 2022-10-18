import { useCallback, useMemo, useState } from "react";

export const useScrollLock = () => {
  const body = document.body;
  const [isScrollLock, setLock] = useState(body.style.overflow === "hidden");

  const setScrollLocked = useCallback(
    (state: boolean) => {
      if (state) {
        body.style.overflow = "hidden";
        setLock(true);
      } else {
        body.style.overflow = "visible";
        setLock(false);
      }
    },
    [body.style]
  );

  return useMemo(
    () => ({ isScrollLock, setScrollLocked }),
    [isScrollLock, setScrollLocked]
  );
};
