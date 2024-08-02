import RateChart from './chart';
import { LearnMoreBtn } from './learn-more-btn';

export default function Section1() {
  return (
    <section className="section">
      <div className="div-block">
        <img src="images/Many.svg" loading="lazy" alt="" className="image" />
        <div className="div-block-2">
          <img src="images/circle-3.svg" loading="lazy" alt="" className="image-2" />
          <div className="text-block">EN</div>
          <img src="images/down-one-2.svg" loading="lazy" alt="" className="image-4" />
        </div>
      </div>
      <div className="div-block-4">
        <div className="div-block-3">
          <div className="text-block-2">
            REPLAY THE ART <br />
            OF POW
          </div>
          <div className="text-block-3">
            Many, replay the art of PoW on qualified chains.
            <br />
          </div>
          <LearnMoreBtn />
        </div>
      </div>
      <div className="div-block-413">
        <div className="div-block-7">
          <video id="video" playsInline muted loop autoPlay className="video-1" src="images/first-page-bg.mp4"></video>
          <div className="image-6">
            <RateChart />
          </div>
        </div>
      </div>
      <div className="div-block-8">
        <ul className="carousel-container">
          <li className="carousel-item no-before">FAIR LAUNCH</li>
          <li className="carousel-item">NO VC</li>
          <li className="carousel-item">NO TEAM ALLOCATION</li>
          <li className="carousel-item">NO PRE-SALE</li>
          <li className="carousel-item">SYBIL DISINCENTIVE</li>
        </ul>

        <ul className="carousel-container-hidden carousel-container">
          <li className="carousel-item">FAIR LAUNCH</li>
          <li className="carousel-item">NO VC</li>
          <li className="carousel-item">NO TEAM ALLOCATION</li>
          <li className="carousel-item">NO PRE-SALE</li>
          <li className="carousel-item">SYBIL DISINCENTIVE</li>
        </ul>
        {/* <div className="text-block-5"></div> */}
      </div>
    </section>
  );
}
