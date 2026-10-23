import { photoAlt, useCases } from "@/content/landing";
import { cn } from "@/lib/cn";
import { Picture } from "./picture";
import { UseCaseRail } from "./use-case-rail";

const tones = {
  forest: "bg-forest text-white",
  sky: "bg-sky text-ink",
  lime: "bg-lime text-ink",
  yellow: "bg-yellow text-ink",
} as const;

type UseCase = (typeof useCases.items)[number];

/** Photo card with a coloured caption bar (Figma 4:5–4:20 / 8:91–8:102). */
function UseCaseCard({ item }: { item: UseCase }) {
  return (
    <article className="relative h-[360px] w-[260px] overflow-hidden rounded-[20px] md:h-[400px] md:w-[282px] md:rounded-[22px] xl:aspect-[282/400] xl:h-auto xl:w-full">
      {/* The photo covers the whole card; the caption bar sits over its lower third, as in Figma. */}
      <Picture
        name={item.photo}
        alt={photoAlt[item.photo]}
        width={282}
        height={400}
        sizes="(min-width: 1280px) 25vw, 282px"
        className="absolute inset-0 size-full object-cover"
      />
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-[120px] px-[18px] pt-4 md:h-[130px] md:px-5 md:pt-[18px]",
          tones[item.tone],
        )}
      >
        <h3 className="text-xl font-semibold tracking-[-0.02em] md:text-[22px]">{item.title}</h3>
        <p className="mt-[5px] text-sm leading-[1.45] md:mt-[7px]">{item.body}</p>
      </div>
    </article>
  );
}

export function UseCases() {
  return (
    <section
      id="customers"
      aria-labelledby="customers-title"
      className="container-page pt-[clamp(3.5rem,2.014rem+6.095vw,7.5rem)]"
    >
      <div className="reveal">
        <h2 id="customers-title" className="text-h2 font-medium lg:text-center">
          <span className="lg:block">{useCases.title[0]}</span>{" "}
          <span className="lg:block">{useCases.title[1]}</span>
        </h2>
        <p className="mt-3 text-sub text-soft lg:mt-[22px] lg:text-center lg:leading-[1.3]">
          {useCases.lead}
        </p>
      </div>
      <div className="mt-6 reveal [--reveal-i:1] lg:mt-[59px]">
        <UseCaseRail label="Who Kòbò is for">
          {useCases.items.map((item) => (
            <UseCaseCard key={item.title} item={item} />
          ))}
        </UseCaseRail>
      </div>
    </section>
  );
}
