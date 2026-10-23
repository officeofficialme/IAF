
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Gate.css";

gsap.registerPlugin(ScrollTrigger)

export default function Gate() {

    useEffect(() => {
        const section = document.querySelector(".gate-section");

        if (!section) return;

        const leftDoor = section.querySelector(".left-gate");
        const rightDoor = section.querySelector(".right-gate");

        if (!leftDoor || !rightDoor) return;
        const ctx = gsap.context(() => {
            const gateTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=1200",
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                },
            });
            gateTimeline
                .to(
                    leftDoor,
                    {
                        rotationY: -105,
                        ease: "none",
                    },
                    0
                )
                .to(
                    rightDoor,
                    {
                        rotationY: 105,
                        ease: "none",
                    },
                    0
                );
        }, section);



        return () => ctx.revert();

    }, [])


    return (
        <section className="gate-section" aria-label="Museum entrance">
            <div className="gate-background" />

            <div className="gate-heading">
                <p className="gate-eyebrow">A WORLD OF MEMORIES</p>
                <h1>HER</h1>
                <p className="gate-subtitle">
                    Every memory leads back to you.
                </p>
            </div>

            <div className="gate-doorway">
                <div className="gate-door left-gate">
                    <div className="gate-panel">
                        <span className="gate-ornament">✦</span>
                    </div>
                </div>

                <div className="gate-door right-gate">
                    <div className="gate-panel">
                        <span className="gate-ornament">✦</span>
                    </div>
                </div>
            </div>

            <div className="gate-instruction">
                <span className="gate-line" />
                SCROLL TO ENTER
                <span className="gate-line" />
            </div>
        </section>
    );
}
