import gsap from "gsap";
import Image from "next/image";
import { useEffect, useState } from "react";

import { usePortalStore, useScrollStore } from "@stores";

const SCROLL_TOP_THRESHOLD = 0.02;
const EXPERIENCE_GRID_START = 0.78;
const EXPERIENCE_GRID_END = 0.95;

export const ScrollHint = () => {
  const [hintText, setHintText] = useState('');
  const [showScrollHint, setShowScrollHint] = useState(false);
  const portal = usePortalStore((state) => state.activePortalId);
  const scrollProgress = useScrollStore((state) => state.scrollProgress);

  useEffect(() => {
    if (!portal) {
      if (scrollProgress < SCROLL_TOP_THRESHOLD) {
        setHintText('SCROLL');
        setShowScrollHint(true);
      } else if (
        scrollProgress >= EXPERIENCE_GRID_START &&
        scrollProgress < EXPERIENCE_GRID_END
      ) {
        setHintText('PAN');
        setShowScrollHint(true);
      } else {
        setShowScrollHint(false);
      }
    } else if (portal === 'work') {
      setHintText('SCROLL');
      setShowScrollHint(scrollProgress < SCROLL_TOP_THRESHOLD);
    } else {
      setHintText('PAN');
      setShowScrollHint(true);
    }
  }, [portal, scrollProgress]);

  useEffect(() => {
    if (showScrollHint) {
      gsap.to('.scroll-hint', {
        opacity: 1,
        duration: 1.5,
        delay: 1.5,
      });
    } else {
      gsap.killTweensOf('.scroll-hint');
      gsap.to('.scroll-hint', {
        opacity: 0,
        duration: 0.5,
      });
    }
  }, [showScrollHint]);

  const svgSrc = hintText === 'PAN' ? 'icons/chevrons-left-right.svg' : 'icons/chevrons-up-down.svg';

  return (
    <div className="fixed w-full bottom-5 scroll-hint" style={{ opacity: 0 }}>
      {showScrollHint && (
        <div className="flex items-center justify-center gap-1 animate-pulse">
          <Image src={svgSrc} width={18} height={18} alt="" loading="lazy" />
          <span className="text-white">{hintText}</span>
        </div>
      )}
    </div>
  );
}
