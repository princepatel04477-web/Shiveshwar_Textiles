'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface City {
  name: string;
  lat: number;
  lon: number;
  region: string;
  transit: string;
}

const cities: City[] = [
  { name: 'Surat (HQ)', lat: 21.1702, lon: 72.8311, region: 'India', transit: 'Manufacturing Center' },
  { name: 'New York', lat: 40.7128, lon: -74.0060, region: 'North America', transit: '5–7 Days (Air)' },
  { name: 'London', lat: 51.5074, lon: -0.1278, region: 'Europe', transit: '5–7 Days (Air)' },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708, region: 'Middle East', transit: '4–6 Days (Air/Sea)' },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198, region: 'Southeast Asia', transit: '4–5 Days (Air)' },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503, region: 'East Asia', transit: '5–6 Days (Air)' },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093, region: 'Oceania', transit: '6–8 Days (Air)' },
  { name: 'Toronto', lat: 43.6532, lon: -79.3832, region: 'North America', transit: '6–7 Days (Air)' },
  { name: 'Frankfurt', lat: 50.1109, lon: 8.6821, region: 'Europe', transit: '5–7 Days (Air)' },
  { name: 'Amsterdam', lat: 52.3676, lon: 4.9041, region: 'Europe', transit: '5–7 Days (Air)' }
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.sin(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.cos(theta)
  );
}

function createTextSprite(text: string, isHQ: boolean): THREE.Sprite {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.Sprite();

  // Set resolution to 4:1 aspect ratio
  canvas.width = 256;
  canvas.height = 64;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.font = isHQ ? 'bold 22px monospace' : '18px monospace';
  ctx.fillStyle = isHQ ? '#faf8f4' : '#d4a96a';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text Shadow for readability
  ctx.shadowColor = 'rgba(0, 0, 0, 0.95)';
  ctx.shadowBlur = 5;
  ctx.shadowOffsetX = 1.5;
  ctx.shadowOffsetY = 1.5;

  ctx.fillText(text, 128, 32);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    depthTest: true
  });

  const sprite = new THREE.Sprite(material);
  const size = isHQ ? 1.7 : 1.35;
  sprite.scale.set(size, size * 0.25, 1.0);
  return sprite;
}

export default function GlobalNetworkGlobe() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);

  // References for Three.js objects to update on hover
  const routeLinesRef = useRef<{ [key: string]: THREE.Line }>({});
  const cityNodesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const citySpritesRef = useRef<{ [key: string]: THREE.Sprite }>({});
  const particlesRef = useRef<{ mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number }[]>([]);
  const hoveredCityRef = useRef<string | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    
    // Clear any existing canvas (prevents duplicate rendering in React Strict Mode)
    mountRef.current.innerHTML = '';

    const width = mountRef.current.clientWidth;
    const height = width; // since container is aspect-square

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 13;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xd4a96a, 0.9);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight2.position.set(-5, -5, -5);
    scene.add(dirLight2);

    // 5. Globe Group (holds everything that rotates)
    const globeGroup = new THREE.Group();
    // Start tilted slightly for a natural planetary view
    globeGroup.rotation.x = 0.25;
    globeGroup.rotation.y = -1.2;
    scene.add(globeGroup);

    const radius = 4.2;

    // Base wireframe sphere (ultra-thin, elegant gold)
    const sphereGeo = new THREE.SphereGeometry(radius, 32, 24);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xd4a96a,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Outer dot-grid sphere
    const dotsGeo = new THREE.SphereGeometry(radius, 40, 30);
    const dotsMat = new THREE.PointsMaterial({
      color: 0xd4a96a,
      size: 0.045,
      transparent: true,
      opacity: 0.35,
      depthWrite: false
    });
    const dotsMesh = new THREE.Points(dotsGeo, dotsMat);
    globeGroup.add(dotsMesh);

    // Inner opaque core to block back-side elements and build depth hierarchy
    const coreGeo = new THREE.SphereGeometry(radius - 0.05, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x070706,
      transparent: true,
      opacity: 0.88
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreMesh);

    // 6. Draw City Nodes and Route Arcs (pushing nodes slightly above core surface to radius + 0.12)
    const hqCity = cities.find(c => c.name.includes('HQ'));
    const hqPos = hqCity ? latLonToVector3(hqCity.lat, hqCity.lon, radius + 0.12) : new THREE.Vector3();

    // Store references
    const nodes: { [key: string]: THREE.Mesh } = {};
    const lines: { [key: string]: THREE.Line } = {};
    const sprites: { [key: string]: THREE.Sprite } = {};
    const particleList: { mesh: THREE.Mesh; curve: THREE.QuadraticBezierCurve3; t: number }[] = [];

    cities.forEach((city) => {
      const pos = latLonToVector3(city.lat, city.lon, radius + 0.12);
      const isHQ = city.name.includes('HQ');

      // Node mesh (substantially larger than before so they are visible)
      const nodeGeo = new THREE.SphereGeometry(isHQ ? 0.15 : 0.09, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: isHQ ? 0xffffff : 0xd4a96a, // Use bright gold instead of dark gold
        transparent: true,
        opacity: 0.95
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pos);
      globeGroup.add(nodeMesh);
      nodes[city.name] = nodeMesh;

      // Label Sprite
      const sprite = createTextSprite(city.name, isHQ);
      const normal = pos.clone().normalize();
      sprite.position.copy(pos).add(normal.multiplyScalar(isHQ ? 0.22 : 0.16));
      globeGroup.add(sprite);
      sprites[city.name] = sprite;

      // Draw Arcs from HQ to other cities
      if (!isHQ) {
        const mid = new THREE.Vector3().addVectors(hqPos, pos).multiplyScalar(0.5);
        const distance = hqPos.distanceTo(pos);
        // Push control point outwards for arc height
        const height = distance * 0.22;
        mid.normalize().multiplyScalar(radius + height);

        const curve = new THREE.QuadraticBezierCurve3(hqPos, mid, pos);
        const pathPoints = curve.getPoints(40);

        const curveGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
        const curveMat = new THREE.LineBasicMaterial({
          color: 0xd4a96a,
          transparent: true,
          opacity: 0.4, // increased from 0.2 for clear visibility
          linewidth: 1.5
        });
        const line = new THREE.Line(curveGeo, curveMat);
        globeGroup.add(line);
        lines[city.name] = line;

        // Traveling cargo particle (larger and glowing)
        const particleGeo = new THREE.SphereGeometry(0.06, 8, 8);
        const particleMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9
        });
        const pMesh = new THREE.Mesh(particleGeo, particleMat);
        globeGroup.add(pMesh);

        particleList.push({
          mesh: pMesh,
          curve,
          t: Math.random() // randomized starting offsets
        });
      }
    });

    cityNodesRef.current = nodes;
    routeLinesRef.current = lines;
    citySpritesRef.current = sprites;
    particlesRef.current = particleList;

    // 7. Click-and-Drag Rotation + Mobile Touch Support
    let isDragging = false;
    let isMouseOver = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotY = globeGroup.rotation.y;
    let targetRotX = globeGroup.rotation.x;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      targetRotY += deltaX * 0.006;
      targetRotX += deltaY * 0.006;
      targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX)); // clamp polar rotation to avoid flips

      previousMousePosition = {
        x: e.clientX,
        y: e.clientY
      };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      isDragging = true;
      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.y;

      targetRotY += deltaX * 0.005;
      targetRotX += deltaY * 0.005;
      targetRotX = Math.max(-1.1, Math.min(1.1, targetRotX));

      previousMousePosition = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const onMouseEnter = () => {
      isMouseOver = true;
    };

    const onMouseLeave = () => {
      isMouseOver = false;
      isDragging = false;
      setHoveredCity(null);
    };

    const container = mountRef.current;
    if (container) {
      container.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);

      container.addEventListener('touchstart', onTouchStart, { passive: true });
      window.addEventListener('touchmove', onTouchMove, { passive: true });
      window.addEventListener('touchend', onMouseUp);

      container.addEventListener('mouseenter', onMouseEnter);
      container.addEventListener('mouseleave', onMouseLeave);
    }

    // 8. Animation Loop
    let animId: number;

    const tick = () => {
      const activeHover = isMouseOver || !!hoveredCityRef.current;

      // Continuously rotate Y slowly when not dragging
      if (!isDragging) {
        const rotSpeed = activeHover ? 0.0003 : 0.0012;
        targetRotY += rotSpeed;
      }

      // Smoothly interpolate rotation (inertia decay)
      globeGroup.rotation.y += (targetRotY - globeGroup.rotation.y) * 0.08;
      globeGroup.rotation.x += (targetRotX - globeGroup.rotation.x) * 0.08;

      // Update traveling particles along arcs
      particleList.forEach((p) => {
        p.t += activeHover ? 0.0025 : 0.004;
        if (p.t > 1) p.t = 0;
        const currentPos = p.curve.getPointAt(p.t);
        p.mesh.position.copy(currentPos);
      });

      renderer.render(scene, camera);
      animId = requestAnimationFrame(tick);
    };

    tick();

    // 9. Resize listener
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = w;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container) {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('touchstart', onTouchStart);
        container.removeEventListener('mouseenter', onMouseEnter);
        container.removeEventListener('mouseleave', onMouseLeave);
      }
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onMouseUp);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      // Dispose Geometries/Materials to prevent memory leaks
      sphereGeo.dispose();
      sphereMat.dispose();
      dotsGeo.dispose();
      dotsMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      Object.values(nodes).forEach(n => {
        n.geometry.dispose();
        if (Array.isArray(n.material)) n.material.forEach(m => m.dispose());
        else n.material.dispose();
      });
      Object.values(lines).forEach(l => {
        l.geometry.dispose();
        if (Array.isArray(l.material)) l.material.forEach(m => m.dispose());
        else l.material.dispose();
      });
      particleList.forEach(p => {
        p.mesh.geometry.dispose();
        if (Array.isArray(p.mesh.material)) p.mesh.material.forEach(m => m.dispose());
        else p.mesh.material.dispose();
      });
      Object.values(sprites).forEach(s => {
        s.geometry.dispose();
        s.material.map?.dispose();
        s.material.dispose();
      });
    };
  }, []);

  // Handle updates when hoveredCity changes
  useEffect(() => {
    hoveredCityRef.current = hoveredCity;
    // Reset all lines and nodes to normal opacity/color
    Object.keys(routeLinesRef.current).forEach((cityName) => {
      const line = routeLinesRef.current[cityName];
      const mat = line.material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = 0.4; // Reset to our new visible default
        mat.color.setHex(0xd4a96a);
      }
    });

    Object.keys(cityNodesRef.current).forEach((cityName) => {
      const node = cityNodesRef.current[cityName];
      const mat = node.material as THREE.MeshBasicMaterial;
      const isHQ = cityName.includes('HQ');
      if (mat) {
        mat.color.setHex(isHQ ? 0xffffff : 0xd4a96a); // Reset to bright gold for standard nodes
        node.scale.set(1, 1, 1);
      }
    });

    Object.keys(citySpritesRef.current).forEach((cityName) => {
      const sprite = citySpritesRef.current[cityName];
      const mat = sprite.material as THREE.SpriteMaterial;
      const isHQ = cityName.includes('HQ');
      if (mat) {
        mat.opacity = 0.85;
        const size = isHQ ? 1.7 : 1.35;
        sprite.scale.set(size, size * 0.25, 1.0);
      }
    });

    // Make hovered city glow and stand out
    if (hoveredCity && hoveredCity !== 'Surat (HQ)') {
      const line = routeLinesRef.current[hoveredCity];
      if (line) {
        const mat = line.material as THREE.LineBasicMaterial;
        if (mat) {
          mat.opacity = 0.85;
          mat.color.setHex(0xffffff); // highlight route line to white
        }
      }

      const node = cityNodesRef.current[hoveredCity];
      if (node) {
        const mat = node.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.color.setHex(0xffffff); // node core turns pure white
          node.scale.set(1.6, 1.6, 1.6); // scale node
        }
      }

      // Emphasize the hovered city label and dim others
      Object.keys(citySpritesRef.current).forEach((cityName) => {
        const sprite = citySpritesRef.current[cityName];
        const mat = sprite.material as THREE.SpriteMaterial;
        const isHQ = cityName.includes('HQ');
        if (mat) {
          if (cityName === hoveredCity) {
            mat.opacity = 1.0;
            const size = (isHQ ? 1.7 : 1.35) * 1.3;
            sprite.scale.set(size, size * 0.25, 1.0);
          } else {
            mat.opacity = 0.3; // dim others
          }
        }
      });
    }
  }, [hoveredCity]);



  return (
    <section className="relative w-full bg-[#070706] py-24 border-t border-[#b8924a]/10 overflow-hidden">
      {/* Subtle luxury ambient glows */}
      <div className="absolute top-[10%] left-[20%] w-[350px] h-[350px] bg-[#d4a96a]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[15%] w-[400px] h-[400px] bg-[#b8924a]/3 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Premium Editorial Content */}
        <div className="lg:col-span-5 space-y-8 select-none">
          <div className="space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.35em] text-[#d4a96a] block">
              GLOBAL TEXTILE NETWORK
            </span>
            <h2 className="font-serif text-3xl uppercase tracking-wide text-white md:text-5xl leading-tight">
              Connecting Surat <br />
              <span className="text-[#d4a96a] font-light italic">to the World.</span>
            </h2>
            <p className="text-sm leading-relaxed text-[#f5f0e8]/70 font-light font-sans max-w-lg">
              Our waterjet and power loom production lines feed international distribution channels, supplying export-grade cotton, polyester, and custom-engineered blends to major B2B apparel hubs.
            </p>
          </div>

          {/* Interactive Editorial City Listing */}
          <div className="space-y-2.5 max-w-md pt-4">
            <div className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] border-b border-[#b8924a]/15 pb-2 mb-1">
              Select Distribution Hub
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {cities.filter(c => !c.name.includes('HQ')).map((c) => (
                <button
                  key={c.name}
                  onMouseEnter={() => {
                    setHoveredCity(c.name);
                  }}
                  onMouseLeave={() => {
                    setHoveredCity(null);
                  }}
                  className={`w-full text-left py-2.5 px-3 border transition-all duration-300 font-mono text-xs uppercase tracking-wider cursor-pointer rounded-xs ${
                    hoveredCity === c.name
                      ? 'bg-[#d4a96a]/10 border-[#d4a96a] text-[#d4a96a] shadow-[inset_0_0_12px_rgba(212,169,106,0.08)]'
                      : 'bg-black/40 border-[#b8924a]/12 text-white/60 hover:border-[#d4a96a]/40 hover:text-white'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span>{c.name}</span>
                    <span className="text-[8px] opacity-40">{c.region}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Clean hover transit info card */}
          <div className="h-16 flex items-center">
            {hoveredCity ? (
              <div className="w-full bg-[#121110]/80 border border-[#b8924a]/20 p-3 flex justify-between items-center animate-fade-in rounded-xs">
                <div>
                  <span className="text-[8px] font-mono text-white/40 uppercase block">Transit Corridor</span>
                  <span className="text-xs font-mono text-[#d4a96a] uppercase">Surat ➔ {hoveredCity}</span>
                </div>
                <div className="text-right">
                  <span className="text-[8px] font-mono text-white/40 uppercase block">Delivery Framework</span>
                  <span className="text-xs font-mono text-white font-medium">{cities.find(c => c.name === hoveredCity)?.transit}</span>
                </div>
              </div>
            ) : (
              <p className="text-[10px] font-mono text-white/30 italic">
                * Hover over a distribution hub to view transit times and active routing.
              </p>
            )}
          </div>
        </div>

        {/* Right Column: 3D Three.js Interactive Wireframe Globe */}
        <div className="lg:col-span-7 flex justify-center items-center w-full relative">
          <div 
            ref={mountRef}
            className="w-full max-w-[620px] aspect-square relative cursor-grab active:cursor-grabbing"
            style={{ minHeight: '400px' }}
          >
            {/* Minimal coordinate label markers around the canvas frame */}
            <div className="absolute top-2 left-2 pointer-events-none font-mono text-[9px] text-[#d4a96a]/40 uppercase tracking-widest">
              SYSTEM: THREEJS.ACTIVE
            </div>
            <div className="absolute top-2 right-2 pointer-events-none font-mono text-[9px] text-white/20">
              AXIS: TILTED_23.5
            </div>
            <div className="absolute bottom-2 left-2 pointer-events-none font-mono text-[9px] text-white/20">
              RAD: 4.2 // GRID: VERTEX_40
            </div>
            <div className="absolute bottom-2 right-2 pointer-events-none font-mono text-[9px] text-[#d4a96a]/40 uppercase tracking-widest">
              FOB CODES: ACTIVE
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
