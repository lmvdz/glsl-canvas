import { useEffect, useState } from 'react'
import './App.css'

import baseWarpFragment from './assets/base-warp.frag';

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [_sandbox, setSandbox] = useState<any>(null)

  

  useEffect(() => {
    setCanvas(document.getElementById("glslCanvas") as HTMLCanvasElement)
  }, [])

  useEffect(() => {
    if (canvas) {
      const shader = baseWarpFragment;
      canvas.setAttribute('data-fragment', shader);
      const glslSandbox = new window.GlslCanvas(canvas);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      glslSandbox.setUniform("u_texture", "chroma.png")
      setSandbox(glslSandbox)

      // Add mouse tracking
      const handleMouseMove = (event: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = rect.height - (event.clientY - rect.top); // Flip Y coordinate
        glslSandbox.setUniform("u_mouse", [x, y]);
      };

      canvas.addEventListener('mousemove', handleMouseMove);

      // Cleanup
      return () => {
        canvas.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [canvas])

  return (
    <>
        <canvas id="glslCanvas" width="800" height="600"></canvas>
    </>
  )
}

export default App
