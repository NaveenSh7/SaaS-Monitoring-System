import { notFound } from "next/navigation";
import { FRAMEWORKS } from "@/config/frameworks";

export function generateStaticParams() {
  return FRAMEWORKS.map((f) => ({ framework: f.id }));
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ framework: string }>;
}) {
  const { framework } = await params;
  const fw = FRAMEWORKS.find((f) => f.id === framework);
  if (!fw) notFound();

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{fw.name} Integration</h1>
      {/* Steps: install, setup, example */}
    </main>
  );
}