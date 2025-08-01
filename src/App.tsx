import { useEffect, useState } from 'react'
import './App.css'

import baseWarpFragment from './assets/base-warp.frag';

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)


  useEffect(() => {
    setCanvas(document.getElementById("glslCanvas") as HTMLCanvasElement)
  }, [])

  useEffect(() => {
    if (canvas) {
      const shader = baseWarpFragment;
      canvas.setAttribute('data-fragment', shader);
      const sandbox = new window.GlslCanvas(canvas);
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      sandbox.setUniform("u_texture", "chroma.png")
    }
  }, [canvas])

  return (
    <>
      <canvas id="glslCanvas" width="800" height="600"></canvas>
    </>
  )
}

export default App
