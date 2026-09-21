import Image from "next/image";
import { PageHeading } from "@/components/editorial";
import { siteConfig } from "@/lib/site-config";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
export default function GalleryPage() {
  const photos = [
    ...siteConfig.about.gallery,
    ...siteConfig.about.hobbies.map((h) => ({
      src: h.image,
      caption: h.description,
    })),
  ];
  return (
    <div className="site-container page-space">
      <PageHeading
        label="A visual journal"
        title="Away from"
        accent="the keyboard."
        description="Hackathon nights, new places, and the people who make the journey interesting. A few moments from my camera roll."
      />
      <div className="photo-grid">
        {photos.map((photo, i) => (
          <ScrollReveal key={photo.src + i}>
            <figure>
              <a
                href={photo.src}
                target="_blank"
                rel="noopener noreferrer"
                className="gallery-image"
                aria-label={"Open full photo: " + photo.caption}
              >
                <Image
                  src={photo.src}
                  alt={photo.caption}
                  fill
                  sizes="(max-width: 767px) 90vw, 550px"
                  className="object-cover"
                />
              </a>
              <figcaption>
                <span className="eyebrow">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {photo.caption}
              </figcaption>
            </figure>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
