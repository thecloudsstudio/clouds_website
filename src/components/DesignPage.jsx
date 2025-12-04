import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function DesignPage({ onBack }) {
    const sectionsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            },
            { threshold: 0.2 }
        );

        sectionsRef.current.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            className="min-h-screen w-full bg-white text-black font-['Inter'] antialiased"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Fixed Header */}
            <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-black/5 z-50">
                <nav className="max-w-[1400px] mx-auto px-8 h-20 flex items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-black/5 group-hover:bg-black/10 flex items-center justify-center transition-all duration-300">
                            <ArrowLeft className="w-5 h-5 text-black" />
                        </div>
                    </button>
                </nav>
            </header>

            {/* Section 1: Where Vision Finds Its Voice */}
            <section
                ref={el => sectionsRef.current[0] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h1 className="text-5xl md:text-6xl font-extralight mb-16 tracking-tight leading-tight">
                        Where Vision Finds Its Voice
                    </h1>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6">
                        <p className="italic">Every idea begins as a whisper —</p>
                        <p>a quiet shape in the mind,<br />a colour without a name,<br />a story waiting for its first breath.</p>
                        <p className="mt-8">Here, in Creative,<br />we listen to that whisper<br />and give it a world to live in.</p>
                    </div>
                </div>
            </section>

            {/* Section 2: The Art of Making Thought Visible */}
            <section
                ref={el => sectionsRef.current[1] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 bg-[#fafafa] fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                        The Art of Making Thought Visible
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6">
                        <p>To us, creativity is not an act of chance.<br />It is intention,<br />discipline,<br />and the relentless pursuit of clarity.</p>
                        <p className="mt-8">A line becomes identity.<br />A frame becomes emotion.<br />A motion becomes meaning.</p>
                        <p className="mt-8 italic">This is the craft.<br />This is the quiet precision behind the beautiful.</p>
                    </div>
                </div>
            </section>

            {/* Section 3: Designing Moments That Stay */}
            <section
                ref={el => sectionsRef.current[2] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                        Designing Moments That Stay
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6">
                        <p>Before anyone understands your work,<br />they feel it.</p>
                        <p className="mt-8">In the pause before a logo appears,<br />in the glow of a product render,<br />in the breath of a slow pan across a new skyline—</p>
                        <p className="mt-8 italic">Perception is born.</p>
                        <p className="mt-8">We shape that moment with care,<br />so your story is not just seen,<br />but remembered.</p>
                    </div>
                </div>
            </section>

            {/* Section 4: Imagery That Breathes */}
            <section
                ref={el => sectionsRef.current[3] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 bg-[#fafafa] fade-section"
            >
                <div className="max-w-[800px]">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight text-center">
                        Imagery That Breathes
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6 text-center mb-16">
                        <p>Your ideas deserve more than explanation —<br />they deserve presence.</p>
                        <p className="mt-8">We create visuals that carry their own gravity:</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center mt-12">
                        <div className="p-8">
                            <h3 className="text-lg font-medium mb-3 tracking-wide">Identities that feel inevitable</h3>
                        </div>
                        <div className="p-8">
                            <h3 className="text-lg font-medium mb-3 tracking-wide">2D stories that unfold like memory</h3>
                        </div>
                        <div className="p-8">
                            <h3 className="text-lg font-medium mb-3 tracking-wide">3D worlds sculpted with realism and wonder</h3>
                        </div>
                        <div className="p-8">
                            <h3 className="text-lg font-medium mb-3 tracking-wide">Renders that hold the silence of a photograph</h3>
                        </div>
                    </div>

                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-4 text-center mt-16">
                        <p>Every pixel is a decision.<br />Every colour has purpose.<br />Every frame moves with intent.</p>
                    </div>
                </div>
            </section>

            {/* Section 5: Crafted for the Visionaries */}
            <section
                ref={el => sectionsRef.current[4] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                        Crafted for the Visionaries
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6">
                        <p>We build for the ones who see further—<br />the founders shaping tomorrow,<br />the designers forging new forms,<br />the engineers making the impossible work,<br />the dreamers who refuse simplicity.</p>
                        <p className="mt-8">For them, we create clarity.<br />For them, we translate ambition into imagery.</p>
                    </div>
                </div>
            </section>

            {/* Section 6: A Process Rooted in Story */}
            <section
                ref={el => sectionsRef.current[5] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 bg-[#fafafa] fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                        A Process Rooted in Story
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6">
                        <p className="italic">Our craft follows a quiet rhythm:</p>
                        <div className="mt-12 space-y-4">
                            <p>We <strong className="font-medium">listen</strong> — to what is unsaid.</p>
                            <p>We <strong className="font-medium">shape</strong> — what wants to be seen.</p>
                            <p>We <strong className="font-medium">refine</strong> — until the work stands with certainty.</p>
                            <p>We <strong className="font-medium">reveal</strong> — a narrative captured in visuals.</p>
                        </div>
                        <p className="mt-12">Your story becomes a landscape,<br />and we build the view.</p>
                    </div>
                </div>
            </section>

            {/* Section 7: Motion, as a Language */}
            <section
                ref={el => sectionsRef.current[6] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                        Motion, as a Language
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-gray-700 leading-relaxed space-y-6">
                        <p>Some stories ask to move.</p>
                        <p className="mt-8">To unfold,<br />to grow,<br />to carry energy the way words cannot.</p>
                        <p className="mt-8">2D lines that dance,<br />3D worlds that breathe,<br />light and shadow performing in quiet harmony.</p>
                        <p className="mt-8 italic">Your message becomes a film —<br />brief, beautiful, unforgettable.</p>
                    </div>
                </div>
            </section>

            {/* Section 8: CTA */}
            <section
                ref={el => sectionsRef.current[7] = el}
                className="min-h-screen flex items-center justify-center px-8 py-32 bg-black text-white fade-section"
            >
                <div className="max-w-[700px] text-center">
                    <h2 className="text-4xl md:text-5xl font-extralight mb-16 tracking-tight">
                        Let Us Shape the Story You Hold
                    </h2>
                    <div className="text-xl md:text-2xl font-light text-white/80 leading-relaxed space-y-6 mb-16">
                        <p>If you have a vision waiting for form,<br />a message waiting for a moment,<br />a brand waiting for its first heartbeat—</p>
                        <p className="mt-8 italic">We are ready to craft it.</p>
                        <p className="mt-8">Speak the idea.<br />We will give it a voice.</p>
                    </div>
                    <button className="mt-8 px-12 py-4 bg-white text-black text-sm font-light tracking-widest hover:bg-gray-100 transition-all duration-300">
                        → Begin the Creative Journey
                    </button>
                </div>
            </section>

            <style jsx>{`
                .fade-section {
                    opacity: 0;
                    transform: translateY(40px);
                    transition: opacity 1.2s ease-out, transform 1.2s ease-out;
                }
                .fade-section.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
            `}</style>
        </motion.div>
    );
}
