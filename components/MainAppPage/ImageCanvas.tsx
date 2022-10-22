import denormalizeLandmarks from "@/utils/denormalizeLandmarks";
import landmarksToCoordinates from "@/utils/landmarksToCoordinates";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import getLandmarks from "services/getLandmarks";
import { useStore } from "store";

const ImageCanvas = () => {
  const selectedFile = useStore((state) => state.selectedFile);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef() as MutableRefObject<CanvasRenderingContext2D>;

  const [landmarks, setLandmarks] = useState<number[][]>();
  const drawSettings = useStore((state) => state.drawSettings);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // null check
    if (!selectedFile) return; // null check

    canvas.width = selectedFile.width;
    canvas.height = selectedFile.height;

    const context = canvas.getContext("2d");
    if (!context) return;
    ctx.current = context;

    initialize();
  }, []);

  useEffect(() => {
    if (drawSettings && selectedFile && ctx && landmarks) {
      drawImage();
      drawLandmarks({
        points: landmarks,
        drawSettings: drawSettings,
      });
    }
  }, [drawSettings]);

  async function initialize() {
    drawImage();
    if (!selectedFile) return;
    const res: any = await getLandmarks(selectedFile);
    const landmarks = res.data.landmarks;

    const points = denormalizeLandmarks(
      landmarks,
      selectedFile.width,
      selectedFile.height
    );

    setLandmarks(points);
    // Start Drawing
    drawLandmarks({
      points: points,
      drawSettings: drawSettings,
    });
  }

  function drawImage() {
    // Draw background
    if (!selectedFile || !canvasRef) return;
    ctx.current.fillRect(0, 0, selectedFile.width, selectedFile.height); // DO NOT RELY ON getBoundingBox for height and width because it's unreliable.

    // Draw Image
    ctx.current.drawImage(
      selectedFile.img,
      0,
      0,
      selectedFile.width,
      selectedFile.height
    );
  }

  function drawLandmarks({
    points,
    drawSettings,
  }: {
    points: number[][];
    drawSettings: DrawSettingsType;
  }) {
    ctx.current.fillStyle = drawSettings.landmarkColor[0];
    points.forEach((point, i) => {
      drawCircle(point[0], point[1], drawSettings.landmarkSize);
    });
  }

  function drawCircle(x: number, y: number, radius: number) {
    ctx.current.beginPath();
    ctx.current.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.current.fill();
  }

  function drawHouse() {
    // Set line width
    ctx.current.lineWidth = 10;
    ctx.current.strokeStyle = "green";
    ctx.current.fillStyle = "green";

    // Wall
    ctx.current.strokeRect(75, 140, 150, 110);

    // Door
    ctx.current.fillRect(130, 190, 40, 60);

    // Roof
    ctx.current.beginPath();
    ctx.current.moveTo(50, 140);
    ctx.current.lineTo(150, 60);
    ctx.current.lineTo(250, 140);
    ctx.current.closePath();
    ctx.current.stroke();
  }
  return <canvas ref={canvasRef} className="w-full h-full object-contain" />;
};

export default ImageCanvas;

// Loading an image from a URL in Canvas
// https://stackoverflow.com/questions/4773966/drawing-an-image-from-a-data-url-to-a-canvas

//   context.lineCap = "round";
//   context.lineWidth = 5;
//   context.strokeStyle = "darkGray";

// let url = "https://scoliovis-demo.vercel.app/example_images/3.jpg";
// let img = new Image();
// await new Promise((r) => (img.onload = r), (img.src = url));
// context.context.drawImage();
