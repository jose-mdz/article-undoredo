"use client";

import { useUndo } from "@/hooks/useUndo";
import { useEffect, useState } from "react";

type Point = [number, number];
type Line = [Point, Point];
type Document = Line[];

export default function EditorPage() {
  const [isDrawing, setIsDrawing] = useState(false);
  const { document, setDocument, undo, store } = useUndo<Document>([]);

  const handleMouseDown = (e: React.MouseEvent) => {
    const point: Point = [e.clientX, e.clientY];
    setDocument([...document, [point, point]]);
    setIsDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing && document.length > 0) {
      const lastLine = document[document.length - 1];
      const lastLineUpdated: Line = [lastLine[0], [e.clientX, e.clientY]];
      setDocument([...document.slice(0, document.length - 1), lastLineUpdated]);
    }
  };

  useEffect(() => {
    if (!isDrawing) {
      store();
    }
  }, [isDrawing]);

  return (
    <main>
        <button onClick={undo}>Undo</button>
        <svg
            width="100vw"
            height="80vh"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {document.map(([[x1, y1], [x2, y2]]) =>
                <line
                    key={JSON.stringify([x1, y1, x2, y2])}
                    {...{ x1, y1, x2, y2 }}
                />
            )}
        </svg>
    </main>
  )
}
