import { Edges, Text, TextProps } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import gsap from "gsap";
import { useEffect, useMemo, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import * as THREE from "three";

import { usePortalStore } from "@stores";
import { Project } from "@types";

interface ProjectTileProps {
  project: Project;
  index: number;
  position: [number, number, number];
  rotation: [number, number, number];
  activeId: number | null;
  onClick: () => void;
}

const ProjectTile = ({ project, index, position, rotation, activeId, onClick }: ProjectTileProps) => {
  const projectRef = useRef<THREE.Group>(null);
  const bgMeshRef = useRef<THREE.Mesh>(null);
  const titleRef = useRef<THREE.Object3D>(null);
  const textBoxRef = useRef<THREE.Object3D>(null);
  const singleButtonRef = useRef<THREE.Group>(null);
  const multiButtonRef = useRef<THREE.Group>(null);
  
  const hoverAnimRef = useRef<gsap.core.Timeline | null>(null);
  const [hovered, setHovered] = useState(false);
  const isProjectSectionActive = usePortalStore((state) => state.activePortalId === "projects");

  const titleProps = useMemo(() => ({
    font: "./soria-font.ttf",
    color: "black",
  }), []);

  const subtitleProps: Partial<TextProps> = useMemo(() => ({
    font: "./Vercetti-Regular.woff",
    color: "black",
    anchorX: "left",
    anchorY: "top",
  }), []);

  useEffect(() => {
    if (!projectRef.current) return;
    hoverAnimRef.current?.kill();

    // Use refs directly instead of children indexing
    hoverAnimRef.current = gsap.timeline();
    hoverAnimRef.current
      .to(projectRef.current.position, { y: hovered ? 0.4 : 0 }, 0)
      .to(projectRef.current.scale, {
        x: hovered ? 1.3 : 1,
        y: hovered ? 1.3 : 1,
        z: hovered ? 1.3 : 1,
      }, 0);

    if (titleRef.current) {
      hoverAnimRef.current.to(titleRef.current.position, { y: hovered ? 0.7 : -0.8 }, 0);
    }
    if (textBoxRef.current) {
      hoverAnimRef.current
        .to(textBoxRef.current.position, { y: hovered ? 0.7 : 0 }, 0)
        .to(textBoxRef.current, { fillOpacity: hovered ? 1 : 0, duration: 0.4 }, 0);
    }

    if (bgMeshRef.current) {
      hoverAnimRef.current
        .to(bgMeshRef.current.scale, { y: hovered ? 1.7 : 1 }, 0)
        .to((bgMeshRef.current as THREE.Mesh).material, { opacity: hovered ? 0.95 : 0.3 }, 0)
        .to(bgMeshRef.current.position, { y: hovered ? 0.7 : -0.2 }, 0);
    }

    if (project.url && !project.urls && singleButtonRef.current) {
      hoverAnimRef.current
        .to(singleButtonRef.current.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
        .to(singleButtonRef.current.position, { z: hovered ? 0.3 : 0.1 }, 0);
    }
    
    if (project.urls && multiButtonRef.current) {
      // the multiButton is a group containing the individual buttons
      hoverAnimRef.current
        .to(multiButtonRef.current.scale, { y: hovered ? 1 : 0, x: hovered ? 1 : 0 }, 0)
        .to(multiButtonRef.current.position, { z: hovered ? 0.3 : 0.1 }, 0);
    }
  }, [hovered]);

  useEffect(() => {
    if (isMobile) {
      setHovered(activeId === index);
    }
  }, [isMobile, activeId]);

  useEffect(() => {
    if (projectRef.current) {
      gsap.to(projectRef.current.position, {
        y: isProjectSectionActive ? 0 : -10,
        duration: 1,
        delay: isProjectSectionActive ? index * 0.1 : 0,
      });
    }
  }, [isProjectSectionActive]);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!project.url && !project.urls) return;
    const button = e.eventObject;
    gsap.to(button.position, { z: 0, duration: 0.1 })
      .then(() => gsap.to(button.position, { z: 0.3, duration: 0.3 }));

    // Fallback: This handler is only used for the single URL view.
    // Multiple URLs will have their own inline handlers in the JSX.
    if (project.url) {
      setTimeout(() => window.open(project.url, '_blank'), 50);
    }
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => !isMobile && isProjectSectionActive && setHovered(true)}
      onPointerOut={() => !isMobile && isProjectSectionActive && setHovered(false)}>
      <group ref={projectRef}>
        <mesh ref={bgMeshRef} position={[0, -0.2, 0]}>
          <planeGeometry args={[5.0, 2.8, 1.5]} />
          <meshBasicMaterial 
            color={project.highlightColor || "#FFF"} 
            transparent 
            opacity={project.highlightColor ? 0.45 : 0.3} 
          />
          {/* <meshPhysicalMaterial transmission={1} roughness={0.3} /> */}
          <Edges color="black" lineWidth={1.5} />
        </mesh>
        <Text
          ref={titleRef}
          {...titleProps}
          position={[-1.9, -0.8, 0.101]}
          anchorX="left"
          anchorY="bottom"
          maxWidth={4}
          fontSize={0.8}>
          {project.title}
        </Text>

        <Text
          ref={textBoxRef}
          {...subtitleProps}
          maxWidth={4.4}
          position={[-2.1, 1.8, 0.1]}
          fontSize={0.21}>
          {project.subtext}
        </Text>
        {project.url && !project.urls && (
          <group
            ref={singleButtonRef}
            position={[1.3, -0.6, 0.1]}
            scale={[0, 0, 1]}
            onClick={(e) => {
              handleClick(e);
              setTimeout(() => window.open(project.url, '_blank'), 50);
            }}
            onPointerOver={() => document.body.style.cursor = 'pointer'}
            onPointerOut={() => document.body.style.cursor = 'auto'}>
            <mesh>
              <boxGeometry args={[1.1, 0.4, 0.2]} />
              <meshBasicMaterial color="#111" opacity={1} transparent={false} />
              <Edges color="white" lineWidth={1} />
            </mesh>
            <Text
              {...subtitleProps}
              color="white"
              position={[-0.4, 0.15, 0.2]}
              fontSize={0.25}>
              VIEW ↗
            </Text>
          </group>
        )}

        {project.urls && (
          <group ref={multiButtonRef} position={[0, 0, 0]} scale={[0, 0, 1]}>
            {project.urls.map((u, i) => (
              <group
                key={i}
                position={[1.3 - (i * 1.3), -1.2, 0.1]}
                onClick={(e) => {
                  handleClick(e);
                  setTimeout(() => window.open(u.url, '_blank'), 50);
                }}
                onPointerOver={() => document.body.style.cursor = 'pointer'}
                onPointerOut={() => document.body.style.cursor = 'auto'}>
                <mesh>
                  <boxGeometry args={[1.1, 0.4, 0.2]} />
                  <meshBasicMaterial color="#111" opacity={1} transparent={false} />
                  <Edges color="white" lineWidth={1} />
                </mesh>
                <Text
                  {...subtitleProps}
                  color="white"
                  position={[-0.4, 0.15, 0.2]}
                  fontSize={0.25}>
                  {u.text.toUpperCase()} ↗
                </Text>
              </group>
            ))}
          </group>
        )}
      </group>
    </group>
  );
};

export default ProjectTile;