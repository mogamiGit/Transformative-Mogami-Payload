'use client'

import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Transformative Teal Palette 2026
const COLORS = {
  primary: new THREE.Color('#409E99'), // Transformative Teal
  deep: new THREE.Color('#0A2A2A'), // Dark Green/Blue
  highlight: new THREE.Color('#7ACCC8'), // Light Aqua
  void: new THREE.Color('#051515'), // Almost Black
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uTime;

  void main() {
    vUv = uv;
    vPosition = position;
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorDeep;
  uniform vec3 uColorHighlight;
  uniform vec3 uColorVoid;

  varying vec2 vUv;
  varying vec3 vPosition;

  // Simple noise function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D Noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  // FBM (Fractal Brownian Motion) for cloud-like texture
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 0.0;
    for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    // Coordinate space with movement
    vec2 uv = vUv * 2.0;
    
    // Slow drifting movement
    vec2 movement = vec2(uTime * 0.05, uTime * 0.02);
    
    // Mouse interaction - subtle ripple/distortion
    float distToMouse = distance(vUv, uMouse);
    float mouseEffect = smoothstep(0.5, 0.0, distToMouse) * 0.2;
    
    // Generate organic patterns
    float n1 = fbm(uv + movement - mouseEffect);
    float n2 = fbm(uv * 2.0 - movement + n1); // Domain warping
    
    // Create detailed texture
    float intensity = fbm(uv + n2 * 2.0 + uTime * 0.1);

    // Color mixing
    vec3 color = mix(uColorVoid, uColorDeep, smoothstep(0.0, 0.4, intensity));
    color = mix(color, uColorPrimary, smoothstep(0.3, 0.7, intensity));
    color = mix(color, uColorHighlight, smoothstep(0.6, 1.0, intensity));
    
    // Vignette
    float vignette = 1.0 - length(vUv - 0.5) * 1.5;
    color *= clamp(vignette + 0.5, 0.0, 1.0);

    gl_FragColor = vec4(color, 1.0);
  }
`

const TransformativeSpace = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uColorPrimary: { value: COLORS.primary },
      uColorDeep: { value: COLORS.deep },
      uColorHighlight: { value: COLORS.highlight },
      uColorVoid: { value: COLORS.void },
    }),
    [],
  )

  useFrame((state) => {
    if (!meshRef.current) return

    uniforms.uTime.value = state.clock.getElapsedTime()

    // Smooth mouse follow
    const targetX = (state.pointer.x + 1) / 2
    const targetY = (state.pointer.y + 1) / 2

    // Lerp current value to target for smooth transition
    uniforms.uMouse.value.x += (targetX - uniforms.uMouse.value.x) * 0.05
    uniforms.uMouse.value.y += (targetY - uniforms.uMouse.value.y) * 0.05
  })

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      {/* Plane geometry covering the background */}
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

export default TransformativeSpace
