'use client';

import React, { useState, useEffect, useRef } from 'react';

const OnekoCat = () => {
  const [isSleeping, setIsSleeping] = useState(true);
  const [bedPosition, setBedPosition] = useState({ x: 0, y: 0 });
  const bedRef = useRef<HTMLDivElement>(null);
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isSleepingRef = useRef(isSleeping);
  const bedPositionRef = useRef(bedPosition);
  const catCreatedRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    isSleepingRef.current = isSleeping;
  }, [isSleeping]);

  useEffect(() => {
    bedPositionRef.current = bedPosition;
  }, [bedPosition]);

  // Calculate bed position - fixed in bottom-left corner
  useEffect(() => {
    const updateBedPosition = () => {
      setBedPosition({
        x: 50,
        y: 40,
      });
    };

    updateBedPosition();
    window.addEventListener('resize', updateBedPosition);

    return () => {
      window.removeEventListener('resize', updateBedPosition);
    };
  }, []);

  // Custom oneko implementation
  useEffect(() => {
    const isReducedMotion = window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;
    if (isReducedMotion) return;

    if (!bedPosition.x || bedPosition.x === 0) return;
    if (catCreatedRef.current) return;
    catCreatedRef.current = true;

    // Remove existing oneko if it exists
    const existingOneko = document.getElementById('oneko');
    if (existingOneko) existingOneko.remove();

    const cleanup = createCat();

    function createCat() {
      const currentBedX = bedPosition.x;
      const currentBedY = bedPosition.y;
      bedPositionRef.current = { x: currentBedX, y: currentBedY };

      const nekoEl = document.createElement("div");
      nekoEl.id = "oneko";
      nekoEl.ariaHidden = "true";
      nekoEl.style.width = "32px";
      nekoEl.style.height = "32px";
      nekoEl.style.position = "fixed";
      nekoEl.style.pointerEvents = "auto";
      nekoEl.style.imageRendering = "pixelated";
      nekoEl.style.zIndex = "999999";
      nekoEl.style.backgroundImage = "url('/oneko.gif')";
      nekoEl.style.backgroundRepeat = "no-repeat";
      nekoEl.style.backgroundSize = "auto";
      nekoEl.style.cursor = "pointer";
      nekoEl.style.transition = "left 0.1s linear, top 0.1s linear";

      let nekoPosX = currentBedX;
      let nekoPosY = currentBedY;
      let mousePosX = currentBedX;
      let mousePosY = currentBedY;
      let frameCount = 0;

      const nekoSpeed = 10;
      const spriteSets: Record<string, number[][]> = {
        idle: [[-3, -3]],
        alert: [[-7, -3]],
        scratchSelf: [[-5, 0], [-6, 0], [-7, 0]],
        scratchWallN: [[0, 0], [0, -1]],
        scratchWallS: [[-7, -1], [-6, -2]],
        scratchWallE: [[-2, -2], [-2, -3]],
        scratchWallW: [[-4, 0], [-4, -1]],
        tired: [[-3, -2]],
        sleeping: [[-2, 0], [-2, -1]],
        N: [[-1, -2], [-1, -3]],
        NE: [[0, -2], [0, -3]],
        E: [[-3, 0], [-3, -1]],
        SE: [[-5, -1], [-5, -2]],
        S: [[-6, -3], [-7, -2]],
        SW: [[-5, -3], [-6, -1]],
        W: [[-4, -2], [-4, -3]],
        NW: [[-1, 0], [-1, -1]],
      };

      nekoEl.style.left = `${nekoPosX - 16}px`;
      nekoEl.style.top = `${nekoPosY - 16}px`;

      if (isSleepingRef.current) {
        const [x, y] = spriteSets.sleeping[0];
        nekoEl.style.backgroundPosition = `${x * 32}px ${y * 32}px`;
      }
      let idleTime = 0;
      let idleAnimation: string | null = null;
      let idleAnimationFrame = 0;

      function setSprite(name: string, frame: number) {
        const sprite = spriteSets[name][frame % spriteSets[name].length];
        nekoEl.style.backgroundPosition = `${sprite[0] * 32}px ${sprite[1] * 32}px`;
      }

      function resetIdleAnimation() {
        idleAnimation = null;
        idleAnimationFrame = 0;
      }

      function idle() {
        idleTime += 1;

        // Every ~20 seconds, pick a random idle animation
        if (idleTime > 10 && Math.floor(Math.random() * 200) === 0 && idleAnimation === null) {
          const available: string[] = ["sleeping", "scratchSelf"];
          if (nekoPosX < 32) available.push("scratchWallW");
          if (nekoPosY < 32) available.push("scratchWallN");
          if (nekoPosX > window.innerWidth - 32) available.push("scratchWallE");
          if (nekoPosY > window.innerHeight - 32) available.push("scratchWallS");
          idleAnimation = available[Math.floor(Math.random() * available.length)];
        }

        switch (idleAnimation) {
          case "sleeping":
            if (idleAnimationFrame < 8) {
              setSprite("tired", 0);
              break;
            }
            setSprite("sleeping", Math.floor(idleAnimationFrame / 4));
            if (idleAnimationFrame > 192) resetIdleAnimation();
            break;
          case "scratchWallN":
          case "scratchWallS":
          case "scratchWallE":
          case "scratchWallW":
          case "scratchSelf":
            setSprite(idleAnimation, idleAnimationFrame);
            if (idleAnimationFrame > 9) resetIdleAnimation();
            break;
          default:
            setSprite("idle", 0);
            return;
        }
        idleAnimationFrame += 1;
      }

      function updateNekoState() {
        // Sleeping mode - walk to bed then sleep
        if (isSleepingRef.current) {
          const bedDeltaX = bedPositionRef.current.x - nekoPosX;
          const bedDeltaY = (bedPositionRef.current.y - 8) - nekoPosY;
          const bedDistance = Math.sqrt(bedDeltaX * bedDeltaX + bedDeltaY * bedDeltaY);

          if (bedDistance > 12) {
            // Walk to bed with 8-directional movement
            idleAnimation = null;
            idleAnimationFrame = 0;
            idleTime = 0;

            let direction = "";
            direction = bedDeltaY / bedDistance > 0.5 ? "N" : "";
            direction += bedDeltaY / bedDistance < -0.5 ? "S" : "";
            direction += bedDeltaX / bedDistance > 0.5 ? "W" : "";
            direction += bedDeltaX / bedDistance < -0.5 ? "E" : "";
            // Fix: deltaX/Y are inverted (nekoPosX - targetX)
            const dbx = nekoPosX - bedPositionRef.current.x;
            const dby = nekoPosY - (bedPositionRef.current.y - 8);
            const dd = Math.sqrt(dbx * dbx + dby * dby);
            direction = dby / dd > 0.5 ? "N" : "";
            direction += dby / dd < -0.5 ? "S" : "";
            direction += dbx / dd > 0.5 ? "W" : "";
            direction += dbx / dd < -0.5 ? "E" : "";
            if (direction) setSprite(direction, frameCount);

            const speed = Math.min(nekoSpeed / bedDistance, 0.12);
            nekoPosX += bedDeltaX * speed;
            nekoPosY += bedDeltaY * speed;
            return;
          } else {
            nekoPosX = bedPositionRef.current.x;
            nekoPosY = bedPositionRef.current.y - 8;
            setSprite("sleeping", Math.floor(frameCount / 30));
            return;
          }
        }

        // Awake mode - full oneko behavior
        const diffX = nekoPosX - mousePosX;
        const diffY = nekoPosY - mousePosY;
        const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

        // Close to mouse - go idle with random animations
        if (distance < nekoSpeed || distance < 48) {
          idle();
          return;
        }

        // Was idle, now need to chase - show alert first
        idleAnimation = null;
        idleAnimationFrame = 0;

        if (idleTime > 1) {
          setSprite("alert", 0);
          idleTime = Math.min(idleTime, 7);
          idleTime -= 1;
          return;
        }

        // Chase mouse with 8-directional movement
        let direction = "";
        direction = diffY / distance > 0.5 ? "N" : "";
        direction += diffY / distance < -0.5 ? "S" : "";
        direction += diffX / distance > 0.5 ? "W" : "";
        direction += diffX / distance < -0.5 ? "E" : "";
        setSprite(direction, frameCount);

        nekoPosX -= (diffX / distance) * nekoSpeed;
        nekoPosY -= (diffY / distance) * nekoSpeed;

        nekoPosX = Math.min(Math.max(16, nekoPosX), window.innerWidth - 16);
        nekoPosY = Math.min(Math.max(16, nekoPosY), window.innerHeight - 16);
      }

      let lastFrameTimestamp = 0;

      function animate(timestamp: number) {
        if (!nekoEl.isConnected) return;

        if (timestamp - lastFrameTimestamp > 100) {
          lastFrameTimestamp = timestamp;
          frameCount++;
          updateNekoState();
          nekoEl.style.left = `${nekoPosX - 16}px`;
          nekoEl.style.top = `${nekoPosY - 16}px`;
        }
        requestAnimationFrame(animate);
      }

      function handleMouseMove(e: MouseEvent) {
        if (!isSleepingRef.current) {
          mousePosX = e.clientX;
          mousePosY = e.clientY;
          mousePosRef.current = { x: e.clientX, y: e.clientY };
        }
      }

      function handleCatClick() {
        setIsSleeping(prev => !prev);
      }

      document.body.appendChild(nekoEl);
      window.addEventListener('mousemove', handleMouseMove);
      nekoEl.addEventListener('click', handleCatClick);
      requestAnimationFrame(animate);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        nekoEl.removeEventListener('click', handleCatClick);
        if (nekoEl.parentNode) {
          nekoEl.parentNode.removeChild(nekoEl);
        }
        catCreatedRef.current = false;
      };
    }

    return cleanup;
  }, [bedPosition.x, bedPosition.y]);

  const toggleCatMode = () => {
    setIsSleeping(!isSleeping);
  };

  return (
    <>
      {/* Cat Couch */}
      <div
        ref={bedRef}
        className="fixed z-50 cursor-pointer group"
        style={{
          left: `${bedPosition.x}px`,
          top: `${bedPosition.y}px`,
          transform: 'translate(-50%, -50%)'
        }}
        onClick={toggleCatMode}
        title={isSleeping ? "Click to wake up the cat" : "Click to send cat to sleep"}
      >
        <div className="relative">
          {/* Interactive Companion Prompt */}
          <div
            className={`absolute left-full top-1/2 -translate-y-[40%] ml-4 flex items-center gap-1.5 whitespace-nowrap transition-opacity duration-300 pointer-events-none ${isSleeping ? 'opacity-100' : 'opacity-0'}`}
          >
            <span className="text-white/70 animate-pulse text-sm leading-none mb-[4px]">←</span>
            <span className="text-[11px] uppercase font-medium tracking-widest text-white/50 flex items-center">
              He&apos;s sleeping on the job, <span className="text-white/90 font-bold ml-1.5">Poke him!</span>
            </span>
          </div>

          {/* Cloud Couch - CSS Box-Shadow Technique */}
          <div className="relative" style={{ width: '40px', height: '20px' }}>
            <div
              className={`group-hover:scale-110 transition-all duration-500 ${isSleeping ? 'animate-pulse' : ''}`}
              style={{
                position: 'absolute',
                width: '40px',
                height: '14px',
                bottom: 0,
                background: 'white',
                borderRadius: '30px',
                filter: 'blur(0.5px)',
                boxShadow: `
                  0 0 5px rgba(255,255,255,0.8),
                  0 0 12px rgba(255,255,255,0.3),
                  -10px -5px 0 -2px white,
                  -10px -5px 4px rgba(255,255,255,0.6),
                  10px -5px 0 -2px white,
                  10px -5px 4px rgba(255,255,255,0.6),
                  -3px -10px 0 -3px white,
                  -3px -10px 5px rgba(255,255,255,0.5),
                  5px -9px 0 -2px white,
                  5px -9px 5px rgba(255,255,255,0.5),
                  0px -7px 0 1px white,
                  0px -7px 6px rgba(255,255,255,0.4)
                `,
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OnekoCat;
