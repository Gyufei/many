'use client';

import { useBtnHoverPosition } from './hook/use-btn-hover-position';

export default function StartMiningBtn() {
  const { blockPosition, handleMouseEnter, handleMouseLeave, handleMouseMove } = useBtnHoverPosition();

  function scrollToAnchor() {
    const element = document.getElementById('section2');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className="div-block-5 mt-80">
      <div className="text-block-4" style={{ zIndex: '10' }} onClick={scrollToAnchor}>
        START MINING
      </div>
      <img src="images/arrow-right.svg" style={{ zIndex: '10' }} loading="lazy" width="16" height="16" alt="" className="image-3" />
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
