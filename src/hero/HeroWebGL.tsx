import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createScene, updateScene, destroyScene } from './scene';

interface HeroWebGLProps {
  onBgProgress?: (progress: number) => void;
}

const HeroWebGL: React.FC<HeroWebGLProps> = ({ onBgProgress }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = createScene(canvas);
    ctx.onBgChange = (p: number) => onBgProgress?.(p);

    const clock = new THREE.Clock();
    let raf = 0;

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      // Use actual scrollable distance so progress reaches 1.0
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollP = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
      updateScene(ctx, elapsed, scrollP);
      ctx.renderer.render(ctx.scene, ctx.camera);
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.renderer.setSize(w, h);
      ctx.camera.aspect = w / h;
      ctx.camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      destroyScene(ctx);
    };
  }, [onBgProgress]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};

export default HeroWebGL;
