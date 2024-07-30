import Link from 'next/link';

export default function Section4() {
  return (
    <section className="section-4">
      <div className="div-block-36">
        <div className="text-block-22">How Many works?</div>
        <div className="text-block-23">
          {/* Many is a process, project, time, and knowledge management platform that provides amazing collaboration */}
          <br />
        </div>
        <div className="div-block-38">
          <Link href="" className="div-block-37">
            <div className="div-block-39">
              <div className="text-block-24">Fair launch.</div>
              <div className="text-block-25">Immutable code.</div>
            </div>
          </Link>
          <Link href="" className="div-block-41">
            <div className="div-block-42">
              <div className="text-block-26">mining guard. </div>
              <div className="text-block-27">
                {' '}
                has no insider token allocation nor pre-mined supply. The smart contract has been frozen and open-sourced to prevent
                tampering or removal.
              </div>
            </div>
          </Link>
        </div>
        <div className="text-block-28">Tokenomics</div>
        <div className="div-block-44">
          <div>
            <div className="text-block-29">Circulating supply</div>
            <div className="text-block-30">10,000</div>
          </div>
          <div>
            <div className="text-block-29">Total Supply</div>
            <div className="text-block-30">210,000,000</div>
          </div>
        </div>
      </div>
    </section>
  );
}
