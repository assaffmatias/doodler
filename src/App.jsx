import React, { useRef, useEffect, useState } from 'react';
import brush from './assets/cursor-pen.png';
import Header from './components/Header/Header';
import Selector from './components/Selector/Selector';

const PEN_TYPES = {
  SOLID: 'solid',
  BRUSH: 'brush', // nuevo tipo
};

function App() {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const [ctx, setCtx] = useState(null);
  const historyRef = useRef([]);
  const baseImageDataRef = useRef(null);
  // Start with an empty canvas state
  const [isEmpty, setIsEmpty] = useState(true);
  // Track if user has drawn anything
  const hasDrawnRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const didDrawRef = useRef(false);
  const [hideSelector, setHideSelector] = useState(false);

  const [selectedColor, setSelectedColor] = useState('#444444');
  const [selectedThickness, setSelectedThickness] = useState(2);
  const [selectedPenType, setSelectedPenType] = useState(PEN_TYPES.SOLID);

  const paintBackgroundAndPattern = (context, width, height) => {
    context.fillStyle = '#fff';
    context.fillRect(0, 0, width, height);

    const patternSpacing = 30;
    const dotRadius = 0.8;

    context.fillStyle = 'rgba(128, 128, 128, 0.43)';

    for (let x = 0; x < width; x += patternSpacing) {
      for (let y = 0; y < height; y += patternSpacing) {
        context.beginPath();
        context.arc(x, y, dotRadius, 0, Math.PI * 2);
        context.fill();
      }
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = selectedColor;
    context.lineWidth = selectedThickness;

    // Draw the background and pattern first
    paintBackgroundAndPattern(context, canvas.width, canvas.height);

    // Restaurar estilo para dibujo
    context.strokeStyle = selectedColor;
    context.lineWidth = selectedThickness;

    // Store the base image data (with background and pattern) as our reference
    // for what an "empty" canvas looks like
    baseImageDataRef.current = context.getImageData(0, 0, canvas.width, canvas.height);

    setCtx(context);
    // Reset drawing state
    hasDrawnRef.current = false;
    // We start with an empty canvas
    setIsEmpty(true);
  }, []);

  // Actualizar color y grosor cuando cambien
  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = selectedColor;
      ctx.fillStyle = selectedColor;
      ctx.lineWidth = selectedThickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      ctx.globalAlpha = selectedPenType === PEN_TYPES.BRUSH ? 0.4 : 1.0;
    }
  }, [selectedColor, selectedThickness, ctx, selectedPenType]);

  // This function is now simpler - we just use the hasDrawnRef to determine if canvas is empty
  const checkIfCanvasIsEmpty = () => {
    // If user has drawn something and not undone everything, canvas is not empty
    const isEmpty = !hasDrawnRef.current;
    setIsEmpty(isEmpty);
    return isEmpty;
  };

  const startDrawing = (e) => {
    if (!ctx) return;

    const canvas = canvasRef.current;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current.push(imageData);

    isDrawingRef.current = true;

    const { offsetX, offsetY } = e.nativeEvent;
    ctx.beginPath();
    ctx.arc(offsetX, offsetY, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fill();

    lastPosRef.current = { x: offsetX, y: offsetY };
    didDrawRef.current = false;

    // Mark that user has drawn something
    hasDrawnRef.current = true;
    // As soon as we start drawing, canvas is no longer empty
    setIsEmpty(false);
  };
  const draw = (e) => {
    if (!isDrawingRef.current || !ctx) return;

    const currentX = e.nativeEvent.offsetX;
    const currentY = e.nativeEvent.offsetY;
    const { x: lastX, y: lastY } = lastPosRef.current;

    const dx = currentX - lastX;
    const dy = currentY - lastY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const steps = Math.max(1, Math.floor(distance / 2));
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const x = lastX + dx * t;
      const y = lastY + dy * t;
      ctx.beginPath();
      ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPosRef.current = { x: currentX, y: currentY };
    didDrawRef.current = true;
  };

  const stopDrawing = () => {
    if (!ctx) return;
    isDrawingRef.current = false;

    if (!didDrawRef.current) {
      const { x, y } = lastPosRef.current;
      ctx.beginPath();
      ctx.arc(x, y, ctx.lineWidth / 2, 0, Math.PI * 2);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.fill();
      ctx.closePath();
    } else {
      ctx.closePath();
    }

    checkIfCanvasIsEmpty();
  };

  const undoLast = () => {
    if (!ctx || historyRef.current.length === 0) return;

    const canvas = canvasRef.current;
    const last = historyRef.current.pop();

    if (last) {
      ctx.putImageData(last, 0, 0);

      // If we've undone all the way back to the beginning
      if (historyRef.current.length === 0) {
        // We've undone everything, so canvas is empty
        hasDrawnRef.current = false;
        setIsEmpty(true);
      } else {
        // If we still have history, we know there are still user drawings
        setIsEmpty(false);
      }
    } else {
      // If there's no previous state, reset to the background pattern
      paintBackgroundAndPattern(ctx, canvas.width, canvas.height);
      hasDrawnRef.current = false;
      setIsEmpty(true);
    }
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const imageURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imageURL;
    link.download = 'mi_dibujo.png';
    link.click();
  };

  const handleSelector = () => {
    setHideSelector(!hideSelector)
  }

  const getTouchPos = (touchEvent) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const touch = touchEvent.touches[0] || touchEvent.changedTouches[0];
    return {
      offsetX: touch.clientX - rect.left,
      offsetY: touch.clientY - rect.top,
    };
  };

  const startTouchDrawing = (e) => {
    e.preventDefault();
    const pos = getTouchPos(e);
    startDrawing({ nativeEvent: pos });
  };

  const touchDraw = (e) => {
    e.preventDefault();
    const pos = getTouchPos(e);
    draw({ nativeEvent: pos });
  };

  const endTouchDrawing = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  return (
    <>
      <Header
        undoLast={undoLast}
        isEmpty={isEmpty}
        downloadImage={downloadImage}
        hideSelector={hideSelector}
        handleSelector={handleSelector}
      />
      <canvas
        ref={canvasRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'block',
          cursor: `url(${brush}) 0 0, auto`,
          backgroundColor: '#fff',
          touchAction: 'none', // 👈 Previene el scroll en móviles al tocar
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startTouchDrawing}
        onTouchMove={touchDraw}
        onTouchEnd={endTouchDrawing}
        onTouchCancel={endTouchDrawing}
      />
      <Selector
        selectedColor={selectedColor}
        onChangeColor={setSelectedColor}
        selectedThickness={selectedThickness}
        onChangeThickness={setSelectedThickness}
        selectedPenType={selectedPenType}
        onChangePenType={setSelectedPenType}
        hideSelector={hideSelector}
      />
    </>
  );
}

export default App;
