import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { RollText } from "@/components/motion/roll-text";
export function WhoAmI() {
  return (
    <div className="site-container section-space about-preview">
      <ScrollReveal className="about-photo">
        <Image
          src="/myimage1.jpg"
          alt="Nehil Chandrakar"
          fill
          sizes="(max-width: 767px) 85vw, 360px"
          className="object-cover"
        />
        <span className="photo-caption">The person behind the pixels.</span>
      </ScrollReveal>
      <ScrollReveal className="about-copy">
        <p className="eyebrow">
          <span>01</span> A little context
        </p>
        <h2 className="display-heading">
          An engineer’s mind.
          <br />
          <em>A builder’s curiosity.</em>
        </h2>
        <p>
          I’m Nehil, a full stack engineer drawn to the space where thoughtful
          design meets dependable engineering.
        </p>
        <p>
          Beyond the code, you’ll find me at hackathons, building communities,
          or looking for a good frame through my camera. Always learning.
          Usually building something.
        </p>
        <Link className="text-link" href="/about">
          <RollText>More about me</RollText>
          <ArrowUpRight size={17} />
        </Link>
      </ScrollReveal>
    </div>
  );
}
