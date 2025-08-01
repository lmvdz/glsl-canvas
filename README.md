# 🌊 GLSL Canvas - Interactive Shader Art

A stunning interactive GLSL shader canvas built with React, TypeScript, and Vite. Features dynamic colormap transitions, organic flow effects, mouse-responsive gravity warping, and sophisticated texture displacement.

![GLSL Canvas Demo](https://img.shields.io/badge/GLSL-Interactive%20Shaders-purple?style=for-the-badge&logo=opengl)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0.4-646CFF?style=for-the-badge&logo=vite)

## ✨ Features

### 🎨 **Advanced Shader Effects**
- **Dynamic Colormap Cycling**: Smooth transitions between 45+ scientific colormaps
- **Organic Flow Patterns**: Multi-octave noise-based fluid dynamics
- **Mouse-Responsive Gravity**: Exponential falloff warping effects
- **Texture Displacement**: Dual-mode bounded/unbounded pixel sampling
- **Exponential Alpha Falloff**: Smooth center-to-edge transparency gradients

### 🎛️ **Interactive Controls**
- **Mouse Tracking**: Real-time cursor position affects gravity and warping
- **Control Overlay**: Toggle-able UI panel for real-time parameter adjustment
- **Colormap Switching**: Live selection from 44+ scientific colormaps
- **Texture Switching**: Dynamic texture loading and swapping
- **Effect Toggles**: Enable/disable displacement and warp effects independently
- **Responsive Design**: Full viewport coverage with proper aspect ratio handling
- **Live Uniform Updates**: Dynamic shader parameter modification

### 🔬 **Technical Highlights**
- **45+ Colormaps**: Complete scientific colormap library (viridis, plasma, inferno, etc.)
- **Multi-layered Noise**: Fractal noise with multiple octaves for organic patterns
- **Bounded Sampling**: Smart texture coordinate handling prevents edge artifacts
- **Exponential Functions**: Smooth mathematical transitions and falloffs

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd glsl-canvas

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Build for Production

```bash
# Build optimized bundle
pnpm build

# Preview production build
pnpm preview
```

## 🎯 Usage

1. **Launch the app** - Open your browser to the development server
2. **Access controls** - Click the ⚙️ button in the top-right corner
3. **Customize visuals**:
   - **Select colormap**: Choose from viridis, plasma, inferno, and 40+ others
   - **Switch texture**: Toggle between available logo textures
   - **Enable effects**: Turn displacement and warp effects on/off
4. **Interact with mouse** - Move cursor to create gravity wells and warping
5. **Hide controls** - Click × to hide UI and enjoy the full visual experience

## 🛠️ Technical Architecture

### Core Technologies
- **React 19.1.0** - Modern React with latest features
- **TypeScript 5.8.3** - Type-safe development
- **Vite 7.0.4** - Lightning-fast build tool
- **GLSL** - OpenGL Shading Language for GPU-accelerated graphics

### Key Dependencies
- **glslify** - GLSL module system for shader composition
- **glsl-colormap** - Scientific colormap library
- **vite-plugin-glsl** - GLSL file loading and processing

### Shader Pipeline
```
Fragment Shader Pipeline:
├── Time-based colormap selection
├── Multi-octave noise generation
├── Mouse position gravity calculation
├── Organic flow displacement
├── Texture sampling (bounded/unbounded)
├── Exponential alpha falloff
└── Final color composition
```

## 📁 Project Structure

```
glsl-canvas/
├── src/
│   ├── assets/
│   │   ├── base-warp.frag          # Main fragment shader
│   │   └── colormaps/              # 45+ scientific colormaps
│   │       ├── viridis.glsl
│   │       ├── plasma.glsl
│   │       ├── inferno.glsl
│   │       └── ...
│   ├── App.tsx                     # Main React component
│   ├── App.css                     # Styling
│   └── main.tsx                    # Entry point
├── public/
│   ├── GlslCanvas.js              # GLSL Canvas library
│   ├── chroma.png                 # Logo texture
│   └── fetch.js                   # Utility functions
├── package.json
├── vite.config.ts
└── README.md
```

## 🎨 Shader Features Deep Dive

### 🌈 **Colormap System**
The shader includes a comprehensive collection of scientific colormaps:

**Perceptually Uniform**: `viridis`, `plasma`, `inferno`, `magma`
**Scientific**: `temperature`, `salinity`, `chlorophyll`, `oxygen`
**Classic**: `jet`, `rainbow`, `hot`, `cool`
**Specialized**: `bathymetry`, `earth`, `blackbody`, `cubehelix`

### 🌊 **Flow Dynamics**
- **Multi-octave Noise**: Combines multiple noise frequencies for natural patterns
- **Time Evolution**: Continuous animation with configurable speed
- **Amplitude Control**: Adjustable flow intensity and scale
- **Organic Movement**: Fluid-like motion patterns

### 🎯 **Mouse Interaction**
- **Gravity Wells**: Mouse position creates attraction/repulsion effects
- **Exponential Falloff**: Smooth distance-based influence
- **Real-time Response**: Immediate visual feedback to cursor movement
- **Configurable Intensity**: Adjustable gravity strength and range

### 🖼️ **Texture Effects**
- **Dual Sampling Modes**: Bounded (safe) and unbounded (creative) sampling
- **Displacement Blending**: Multiple sampling points for rich distortion
- **Alpha Compositing**: Proper transparency handling
- **Edge Softening**: Exponential falloff from center point

## 🔧 Customization

### Shader Parameters
Edit `src/assets/base-warp.frag` to modify:

```glsl
// Colormap transition speed
float colormapCycle = u_time * 0.1;

// Flow animation speed
float flowSpeed = u_time * 0.05;

// Gravity strength
float gravityStrength = 0.1;

// Alpha falloff rate
float falloffRate = 1.0;
```

### Adding New Colormaps
1. Add your colormap GLSL file to `src/assets/colormaps/`
2. Import it in the main shader
3. Add it to the colormap selection logic
4. Update the `COLOR_MAP` object in `App.tsx`

### Adding New Textures
1. Place texture files in the `public/` directory
2. Add texture names to the `TEXTURES` array in `App.tsx`
3. Ensure textures follow the requirements in **Important Notes** below

## ⚠️ Important Notes

### 🖼️ **Texture Requirements**
When adding custom textures/logos, **CRITICAL REQUIREMENT**:

- **1-pixel transparent border**: All textures MUST have a 1-pixel fully transparent border around the entire image
- **Why**: Prevents `GL_CLAMP_TO_EDGE` from bleeding edge pixels during displacement effects
- **Without this**: You'll see harsh lines and color bleeding at texture edges
- **Example**: If your logo is 200x100, make the final texture 202x102 with transparent padding

### 🎨 **Texture Preparation Steps**
1. **Create your logo/image** with desired content
2. **Add 1-pixel transparent padding** on all sides
3. **Save as PNG** with alpha channel
4. **Place in `public/` directory**
5. **Add to `TEXTURES` array** in `App.tsx`

### 🔧 **Shader Behavior**
- **Bounded sampling**: Logo only appears where original UV coordinates are valid
- **Unbounded displacement**: Displacement effects can sample outside texture bounds
- **Exponential falloff**: Alpha fades smoothly from center (0.5, 0.5) outward
- **Mouse interaction**: Effects activate based on distance from cursor position

### 🎛️ **Control Interface**
- **Toggle button**: Click ⚙️ in top-right to show/hide controls
- **Real-time updates**: All changes apply immediately to the shader
- **Responsive design**: Interface adapts to screen size
- **Keyboard accessible**: All controls support keyboard navigation

## 🚀 Performance

- **GPU Accelerated**: All effects run on the graphics card
- **Optimized Sampling**: Smart texture coordinate handling
- **Efficient Noise**: Fast pseudo-random number generation
- **Smooth Animations**: 60fps target with proper frame timing
- **Memory Efficient**: Textures loaded once and cached by WebGL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-effect`)
3. Commit your changes (`git commit -m 'Add amazing effect'`)
4. Push to the branch (`git push origin feature/amazing-effect`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **GlslCanvas** - WebGL shader rendering library
- **glsl-colormap** - Scientific colormap collection
- **Vite** - Next generation frontend tooling
- **React** - User interface library

---

**Made with ❤️ and GLSL magic** ✨
