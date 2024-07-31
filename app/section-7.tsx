import StartMiningBtn from './start-mining-btn'
import Link from 'next/link'

export default function Section7() {
    return (
        <section className="section-7">
            <div className="div-block-58">
                <div className="text-block-41">ride on the powfi wave</div>
                <div className="text-block-42">
                    Unlock the future of productivity with Many. <br />
                    Remember, this journey is just getting started.
                </div>
                <StartMiningBtn />
            </div>
            <div className="div-block-59">
                <div className="div-block-60">
                    <div className="text-block-43">Copyright @ Many Protocol 2024. All Rights Reserved.</div>
                    <div>
                        <Link href="https://x.com/many_pow" target="_blank">
                            <img src="images/twitter.svg" loading="lazy" alt="" className="image-17" />
                        </Link>
                        <img src="images/github.svg" loading="lazy" alt="" className="image-18" />
                        <img src="images/telegram.svg" loading="lazy" alt="" className="image-19" />
                    </div>
                </div>
            </div>
        </section>
    )
}
