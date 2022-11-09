import denormalizeLandmarks from "@/utils/denormalizeLandmarks";
import generatePathFromPoints from "@/utils/generatePathFromPoints";
import landmarksToCoordinates from "@/utils/landmarksToCoordinates";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useStore } from "store";

const ImageCanvas = () => {
  // From Global State
  const scoliovisAPIResponse = useStore((state) => state.scoliovisAPIResponse);
  const selectedFile = useStore((state) => state.selectedFile);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useRef() as MutableRefObject<CanvasRenderingContext2D>;

  // State for drawing
  const [points, setPoints] = useState<number[][]>();
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
  }, [scoliovisAPIResponse]);

  // Redraw everytime a setting changes
  useEffect(() => {
    if (drawSettings && selectedFile && ctx && points && scoliovisAPIResponse) {
      drawImage();
      drawLandmarks({
        points: points,
        drawSettings: drawSettings,
      });
      drawDetections({
        detections: scoliovisAPIResponse.detections,
        drawSettings: drawSettings,
      });
    }
  }, [drawSettings]);

  async function initialize() {
    drawImage();
    if (!selectedFile || !scoliovisAPIResponse) return;
    // const res: any = await getLandmarks(selectedFile);
    // const landmarks = res.data.landmarks;
    const points = denormalizeLandmarks(
      scoliovisAPIResponse.landmarks,
      selectedFile.width,
      selectedFile.height
    );

    setPoints(points);
    drawLandmarks({
      points: points,
      drawSettings: drawSettings,
    });
    drawDetections({
      detections: scoliovisAPIResponse.detections,
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

  function drawDetections({
    detections,
    drawSettings,
  }: {
    detections: DetectionType[];
    drawSettings: DrawSettingsType;
  }) {
    if (!drawSettings.showDetections) return;

    // Drawing Bboxes
    detections.forEach((detection, i) => {
      let width = detection.xmax - detection.xmin;
      let height = detection.ymax - detection.ymin;

      // Drawing Rects
      ctx.current.lineWidth = 2 * drawSettings.detectionsScale;
      ctx.current.strokeStyle = "blue";
      ctx.current.strokeRect(detection.xmin, detection.ymin, width, height);
    });

    // Draw BBox Labels
    if (!drawSettings.showDetectionLabels) return;
    detections.forEach((detection, i) => {
      let fontSize = 30 + drawSettings.detectionsScale * 0.8;
      // Drawing Text
      ctx.current.fillStyle = "white";
      ctx.current.font = `${fontSize}px sans-serif`;
      ctx.current.textBaseline = "top";

      let padding = 10; // in px
      let text = `vert: ${(detection.confidence * 100).toFixed(0)}%`;
      let tm = ctx.current.measureText(text);

      ctx.current.fillStyle = `rgba(0,0,255,0.5)`;
      ctx.current.fillRect(
        detection.xmin,
        detection.ymin,
        tm.width + padding,
        fontSize
      );

      ctx.current.fillStyle = "white";
      ctx.current.fillText(
        text,
        detection.xmin + padding * 0.5,
        detection.ymin
      );
    });
  }

  function drawLandmarks({
    points,
    drawSettings,
  }: {
    points: number[][];
    drawSettings: DrawSettingsType;
  }) {
    if (!drawSettings.showLandmarks) return;
    // DRAW POINTS
    ctx.current.lineWidth = 5;
    ctx.current.fillStyle = drawSettings.landmarkColor[0];
    let currVertPoint = 0;
    points.forEach((point, i) => {
      // Top Verts
      if ([0, 1].includes(currVertPoint))
        ctx.current.fillStyle = drawSettings.landmarkColor[0];
      if ([2, 3].includes(currVertPoint))
        ctx.current.fillStyle = drawSettings.landmarkColor[1];

      drawCircle(point[0], point[1], drawSettings.landmarkSize);

      currVertPoint = currVertPoint + 1;
      if (currVertPoint >= 4) currVertPoint = 0;
    });

    // DRAW PATHS
    const paths = generatePathFromPoints(
      points,
      drawSettings.landmarkDisplayType
    );
    // const paths = generatePathFromPoints(points, "no_lines");
    ctx.current.lineWidth = 8;
    switch (drawSettings.landmarkDisplayType) {
      case "all_lines":
        ctx.current.strokeStyle = "aqua";
        break;
      case "top_lines":
        ctx.current.strokeStyle = drawSettings.landmarkColor[0];
        break;
      case "bottom_lines":
        ctx.current.strokeStyle = drawSettings.landmarkColor[1];
        break;
      default:
        break;
    }

    paths.forEach((path) => {
      path.forEach((point, i) => {
        if (i === 0) {
          ctx.current.beginPath();
          ctx.current.moveTo(point[0], point[1]);
        } else ctx.current.lineTo(point[0], point[1]);

        if (i === path.length - 1) ctx.current.stroke();
      });
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
