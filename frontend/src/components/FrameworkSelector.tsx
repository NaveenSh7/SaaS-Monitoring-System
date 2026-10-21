import { FRAMEWORKS } from "@/config/frameworks"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FrameworkSelector() {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-xl text-white">Integration Guide</CardTitle>
        <p className="text-zinc-400 text-sm">
          Choose your framework to open its integration docs in a new tab
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {FRAMEWORKS.map(({ id, name, Icon, color, docsUrl }) => (
            <a
              key={id}
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 p-6 rounded-lg border-2 border-zinc-700 bg-zinc-800
                         hover:border-emerald-600 hover:bg-emerald-900/20 transition-all
                         focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <Icon size={44} color={color} aria-hidden />
              <span className="font-medium text-white text-sm text-center">{name}</span>
            </a>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}