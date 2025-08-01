import { useEffect, useState } from 'react'
import './App.css'

import baseWarpFragment from './assets/base-warp.frag';

const COLOR_MAP = {
  alpha: 0,
  autumn: 1,
  bathymetry: 2,
  blackbody: 3,
  bluered: 4,
  bone: 5,
  cdom: 6,
  chlorophyll: 7,
  cool: 8,
  copper: 9,
  cubehelix: 10,
  density: 11,
  earth: 12,
  electric: 13,
  freesurface_blue: 14,
  freesurface_red: 15,
  greens: 16,
  greys: 17,
  hot: 18,
  hsv: 19,
  inferno: 20,
  jet: 21,
  magma: 22,
  oxygen: 23,
  par: 24,
  phase: 25,
  picnic: 26,
  plasma: 27,
  portland: 28,
  rainbow_soft: 29,
  rainbow: 30,
  rdbu: 31,
  salinity: 32,
  spring: 33,
  summer: 34,
  temperature: 35,
  turbidity: 36,
  velocity_blue: 37,
  velocity_green: 38,
  viridis: 39,
  warm: 40,
  winter: 41,
  yignbu: 42,
  yiorrd: 43,
} as const;

// Available textures
const TEXTURES = ['chroma.png', 'tealstreet.png'] as const;

// Get colormap names for UI
const COLORMAP_NAMES = Object.keys(COLOR_MAP) as (keyof typeof COLOR_MAP)[];

function App() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const [sandbox, setSandbox] = useState<any>(null)
  const [currentColormap, setCurrentColormap] = useState<keyof typeof COLOR_MAP>('autumn')
  const [currentTexture, setCurrentTexture] = useState<typeof TEXTURES[number]>('tealstreet.png')
  const [displaceEnabled, setDisplaceEnabled] = useState(false)
  const [warpEnabled, setWarpEnabled] = useState(false)
  const [showControls, setShowControls] = useState(true)

  

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
      glslSandbox.uniform("1i", "int", "i_colormap", COLOR_MAP[currentColormap]);
      glslSandbox.setUniform("u_texture", currentTexture);
      glslSandbox.setUniform("b_displace", displaceEnabled);
      glslSandbox.setUniform("b_warp", warpEnabled);
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

  // Update shader uniforms when controls change
  useEffect(() => {
    if (sandbox) {
      sandbox.uniform("1i", "int", "i_colormap", COLOR_MAP[currentColormap]);
    }
  }, [sandbox, currentColormap])

  useEffect(() => {
    if (sandbox) {
      sandbox.setUniform("u_texture", currentTexture);
    }
  }, [sandbox, currentTexture])

  useEffect(() => {
    if (sandbox) {
      sandbox.setUniform("b_displace", displaceEnabled);
    }
  }, [sandbox, displaceEnabled])

  useEffect(() => {
    if (sandbox) {
      sandbox.setUniform("b_warp", warpEnabled);
    }
  }, [sandbox, warpEnabled])

  return (
    <>
        <canvas id="glslCanvas" width="800" height="600"></canvas>

        {/* Control Overlay */}
        <div className={`controls-overlay ${showControls ? 'visible' : 'hidden'}`}>
          <div className="controls-panel">
            <h3>Shader Controls</h3>

            {/* Colormap Selection */}
            <div className="control-group">
              <label>Colormap:</label>
              <select
                value={currentColormap}
                onChange={(e) => setCurrentColormap(e.target.value as keyof typeof COLOR_MAP)}
              >
                {COLORMAP_NAMES.map(name => (
                  <option key={name} value={name}>
                    {name.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>

            {/* Texture Selection */}
            <div className="control-group">
              <label>Texture:</label>
              <select
                value={currentTexture}
                onChange={(e) => setCurrentTexture(e.target.value as typeof TEXTURES[number])}
              >
                {TEXTURES.map(texture => (
                  <option key={texture} value={texture}>
                    {texture.replace('.png', '')}
                  </option>
                ))}
              </select>
            </div>

            {/* Effect Toggles */}
            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={displaceEnabled}
                  onChange={(e) => setDisplaceEnabled(e.target.checked)}
                />
                Enable Displacement
              </label>
            </div>

            <div className="control-group">
              <label>
                <input
                  type="checkbox"
                  checked={warpEnabled}
                  onChange={(e) => setWarpEnabled(e.target.checked)}
                />
                Enable Warp
              </label>
            </div>
          </div>
        </div>

        {/* Toggle Button */}
        <button
          className="toggle-controls"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? '×' : '⚙️'}
        </button>
    </>
  )
}

export default App
