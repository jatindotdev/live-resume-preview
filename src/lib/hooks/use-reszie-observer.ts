import { useEffect, useMemo, useState } from 'react';

export const useResizeObserver = (options?: ResizeObserverOptions) => {
  const element = document.documentElement;

  const [width, setWidth] = useState<number>(element.clientWidth);
  const [height, setHeight] = useState<number>(element.clientHeight);

  const observer = useMemo(
    () =>
      new ResizeObserver(entries => {
        const entry = entries[0];
        setWidth(entry.contentRect.width);
        setHeight(entry.contentRect.height);
      }),
    []
  );

  useEffect(() => {
    if (element) {
      observer.observe(element, options);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [element, observer, options]);

  return {
    width,
    height,
  };
};
