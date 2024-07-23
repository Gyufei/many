'use client';

import { useEffect, useState } from 'react';
import { useBtnHoverPosition } from './hook/use-btn-hover-position';

export function LearnMoreBtn() {
  const { blockPosition, handleMouseEnter, handleMouseLeave, handleMouseMove } = useBtnHoverPosition();
  return (
    <div onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="div-block-5">
      <div style={{ zIndex: 1 }} className="text-block-4">
        Learn More About Powfi
      </div>
      <img style={{ zIndex: 1 }} src="images/箭头右_arrow-right.svg" loading="lazy" width="16" height="16" alt="" className="image-3" />
      <div
        style={{
          left: blockPosition ? `${blockPosition}px` : 'auto',
          right: blockPosition ? 'auto' : '0%',
        }}
        className="div-block-6"
      ></div>
    </div>
  );
}
