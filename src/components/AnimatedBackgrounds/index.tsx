'use client'

import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import TransformativeSpace from './TransformativeSpace'

const SpaceBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: 'radial-gradient(ellipse at center, #0A4D4D 0%, #042F2F 60%, #000000 100%)',
      }}
    >
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <TransformativeSpace />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default SpaceBackground
