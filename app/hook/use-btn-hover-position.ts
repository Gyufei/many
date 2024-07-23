import { useEffect, useState } from 'react';

export function useBtnHoverPosition() {
  const [isHovered, setIsHovered] = useState(false);
  const [blockPosition, setBlockPosition] = useState(0);

  useEffect(() => {
    let timeoutId: any;

    if (!isHovered) {
      timeoutId = setTimeout(() => {
        setBlockPosition(0);
      }, 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isHovered]);

  const handleMouseMove = (event: any) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    console.log(buttonRect);
    const x = event.clientX - buttonRect.left;
    setBlockPosition(x);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return {
    blockPosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  };
}
