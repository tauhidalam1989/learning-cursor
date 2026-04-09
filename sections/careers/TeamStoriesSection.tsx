import { Container } from '@/components/ui/Container';
import { MarketingSectionHeader } from '@/components/shared/MarketingSectionHeader';
import { TEAM_STORIES } from '@/data/careersData';

export function TeamStoriesSection() {
  return (
    <section
      id="careers-stories"
      aria-labelledby="careers-stories-heading"
      className="border-t border-corematrix-border bg-corematrix-bg2 py-24"
    >
      <Container>
        <MarketingSectionHeader
          label="TEAM STORIES"
          title="Hear It From the People Who Work Here"
          titleId="careers-stories-heading"
          description="Real experiences from engineers and leaders who chose to build at Corematrix."
        />

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {TEAM_STORIES.map((story) => (
            <div
              key={story.name}
              className="reveal overflow-hidden rounded-2xl border border-corematrix-border bg-corematrix-card transition-all duration-300 hover:-translate-y-1 hover:border-corematrix-border2"
            >
              <div className="relative h-28 overflow-hidden border-b border-corematrix-border bg-gradient-to-br from-corematrix-green900/60 to-corematrix-card2">
                {/* TODO: Replace with <Image src={story.avatar} alt={story.name} fill className="object-cover" /> */}
                <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-extrabold text-corematrix-green700">
                  {story.initials}
                </span>
              </div>
              <div className="p-6">
                <p className="font-display text-sm font-bold text-corematrix-textPrimary">
                  {story.name}
                </p>
                <p className="text-xs text-corematrix-textDim">
                  {story.role} · Joined {story.joinedYear}
                </p>
                <blockquote className="mt-4 border-l-4 border-corematrix-green700 pl-4 text-sm italic text-corematrix-textSecondary">
                  &quot;{story.quote}&quot;
                </blockquote>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-corematrix-border bg-corematrix-card2 px-2.5 py-0.5 font-mono text-[0.68rem] text-corematrix-textDim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
