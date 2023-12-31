"use client";

import { useUndoRedo } from "@/hooks/useUndoRedo";
import { useEffect, useRef, useState } from "react";

type Point = [number, number];
type Line = [Point, Point];
type Document = Line[];

export default function Home() {

  const [isDrawing, setIsDrawing] = useState(false);
  const { document, setDocument, undo, redo, store } = useUndoRedo<Document>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const rect = svgRef.current?.getBoundingClientRect();

  const getPoint = (e: React.MouseEvent): Point => [e.clientX - (rect?.left || 0), e.clientY - (rect?.top || 0)];

  const handleMouseDown = (e: React.MouseEvent) => {
    const point: Point = getPoint(e);
    setDocument([...document, [point, point]]);
    setIsDrawing(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    setIsDrawing(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDrawing && document.length > 0) {
      const point: Point = getPoint(e);
      const lastLine = document[document.length - 1];
      const lastLineUpdated: Line = [lastLine[0], point];
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
        <button onClick={redo}>Redo</button>
        <span>{' '}Click and drag to draw lines</span>
        <svg
            style={{
                width: '100vw',
                height: 'calc(100vh - 30px)',
                cursor: 'crosshair',
            }}
            ref={svgRef}
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
