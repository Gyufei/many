import RateChart from './chart';
import { LearnMoreBtn } from './learn-more-btn';

export default function Section1() {
  return (
    <section className="section">
      <div className="div-block">
        <img src="images/Many.svg" loading="lazy" alt="" className="image" />
        <div className="div-block-2">
          <img src="images/圆形-3.svg" loading="lazy" alt="" className="image-2" />
          <div className="text-block">EN</div>
          <img src="images/下1_down-one-2.svg" loading="lazy" alt="" className="image-4" />
        </div>
      </div>
      <div className="div-block-4">
        <div className="div-block-3">
          <div className="text-block-2">
            REPLAY THE ART <br />
            OF POW
          </div>
          <div className="text-block-3">
            Many, an omen-so one platserves as an all-in-one replacement of Linear, Jira,
            <br />
            Slack, and Notion.
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
          {/* <img
            src="images/折线图4x.png"
            loading="lazy"
            sizes="(max-width: 479px) 83vw, 100vw"
            height="594"
            alt=""
            srcSet="images/折线图4x-p-500.png 500w, images/折线图4x-p-800.png 800w, images/折线图4x-p-1080.png 1080w, images/折线图4x-p-1600.png 1600w, images/折线图4x-p-2000.png 2000w, images/折线图4x-p-2600.png 2600w, images/折线图4x-p-3200.png 3200w, images/折线图4x.png 4096w"
            className="image-6"
          /> */}
        </div>
      </div>
      <div className="div-block-8">
        <div className="text-block-5">fair launch · barrier-free · immutable code · Inbox</div>
      </div>
    </section>
  );
}
