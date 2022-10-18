import { useCallback, useMemo, useState } from "react";

export const useHover = () => {
  const [isActive, setIsActive] = useState(false);

  const handlers = useMemo(
    () => ({
      onTouchStart: () => setIsActive(true),
      onTouchEnd: () => setIsActive(false),
      onHoverIn: () => setIsActive(true),
      onHoverOut: () => setIsActive(false),
    }),
    []
  );

  return { handlers, isActive };
};

export const useHoverIndex = () => {
  const [index, setIndex] = useState<number>(-1);

  const handlers = useCallback(
    (itemIndex: number) => ({
      onTouchStart: () => setIndex(itemIndex),
      onTouchEnd: () => setIndex(-1),
      onHoverIn: () => setIndex(itemIndex),
      onHoverOut: () => setIndex(-1),
    }),
    []
  );

  return useMemo(() => ({ handlers, index }), [handlers, index]);
};
