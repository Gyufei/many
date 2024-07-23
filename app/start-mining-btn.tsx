"use client";

export default function StartMiningBtn() {
  function scrollToAnchor() {
    const element = document.getElementById('section2');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="text-block-4" onClick={scrollToAnchor}>
      START MINING
    </div>
  );
}
