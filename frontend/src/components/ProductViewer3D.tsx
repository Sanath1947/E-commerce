import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { Box, CircularProgress } from '@mui/material';

interface ModelProps {
  modelUrl: string;
}

function Model({ modelUrl }: ModelProps) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} scale={1} />;
}

interface ProductViewer3DProps {
  modelUrl: string;
  height?: string | number;
}

export default function ProductViewer3D({ modelUrl, height = '500px' }: ProductViewer3DProps) {
  return (
    <Box sx={{ width: '100%', height, position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{ background: '#f5f5f5' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          
          <Model modelUrl={modelUrl} />
          
          <Environment preset="city" />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            autoRotate={true}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
      
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={<CircularProgress />}>
          <div style={{ width: 0, height: 0 }} /> {/* Hidden loader container */}
        </Suspense>
      </Box>
    </Box>
  );
} 