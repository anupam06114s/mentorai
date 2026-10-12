import { TextShimmer } from "@/components/ui/text-shimmer";

export default function TextShimmerDemo() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <TextShimmer
        text="Generating your response..."
        as="h2"
        className="text-3xl font-semibold"
      />
    </div>
  );
}
