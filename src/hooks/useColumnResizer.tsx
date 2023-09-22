import { useState } from "react";

interface ColumnResizerHook {
  width: number;
  handleResizeStart: (e: React.MouseEvent) => void;
}

function useColumnResizer(
  initialWidth: number,
  minWidth: number | undefined,
  maxWidth: number | undefined
): ColumnResizerHook {
  const [width, setWidth] = useState<number>(initialWidth);

  function handleResizeStart(e: React.MouseEvent) {
    e.preventDefault();

    const startX: number = e.clientX;
    let newWidth: number = width;

    const handleResizing = (e: MouseEvent) => {
      const offsetX: number = e.clientX - startX;
      newWidth = width + offsetX;

      if (minWidth !== undefined && newWidth < minWidth) {
        newWidth = minWidth;
      }

      if (maxWidth !== undefined && newWidth > maxWidth) {
        newWidth = maxWidth;
      }

      setWidth(newWidth);
    };

    const handleResizeEnd = () => {
      document.removeEventListener("mousemove", handleResizing);
      document.removeEventListener("mouseup", handleResizeEnd);
    };

    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", handleResizeEnd);
  }

  return { width, handleResizeStart };
}

export default useColumnResizer;
