'use client';

import DitheredLogo from './DitheredLogo';

export default function DitheredLogoDemoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Dithered Logo Effect</h1>
        <p className="text-slate-400 mb-12">
          Recreating Linear&apos;s dithered canvas effect with Floyd-Steinberg and Ordered Dithering algorithms
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Floyd-Steinberg Dithering */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Floyd-Steinberg Dithering
              </h2>
              <p className="text-sm text-slate-400">
                Higher quality but slower. Distributes error across neighboring pixels.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-center">
              <DitheredLogo
                image="/image.png"
                algorithm="floyd-steinberg"
                className="h-[400px] w-[400px]"
              />
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <p>• Width: 400px</p>
              <p>• Height: 400px</p>
              <p>• Color Levels: 3</p>
            </div>
          </div>

          {/* Ordered Dithering */}
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">
                Ordered Dithering
              </h2>
              <p className="text-sm text-slate-400">
                Faster with regular pattern using Bayer matrix.
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg p-4 flex items-center justify-center">
              <DitheredLogo
                image="/linear-logo.png"
                algorithm="bayer"
                className="h-[400px] w-[400px]"
              />
            </div>
            <div className="space-y-2 text-sm text-slate-400">
              <p>• Width: 400px</p>
              <p>• Height: 400px</p>
              <p>• Color Levels: 3</p>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-16 bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Usage Example</h2>
          <pre className="bg-slate-900 p-4 rounded overflow-x-auto text-slate-300">
{`import DitheredLogo from '@/components/DitheredLogo';

export default function MyPage() {
  return (
    <DitheredLogo
      image="/your-image.png"
      algorithm="floyd-steinberg" // 'floyd-steinberg' | 'bayer' | 'blue-noise'
      className="h-[400px] w-[400px]"
    />
  );
}`}
          </pre>
        </div>

        {/* Configuration Guide */}
        <div className="mt-12 space-y-6 text-slate-300">
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Configuration</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-white">colorLevels</h3>
                <p className="text-sm">
                  • 2 = High contrast (black & white)<br />
                  • 3-4 = Most dithered look (like Linear)<br />
                  • 8+ = More colors, less dithering<br />
                  • 256 = Almost no dithering
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">algorithm</h3>
                <p className="text-sm">
                  • floydSteinberg: Better quality, slower<br />
                  • ordered: Faster, creates regular pattern
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white">Image Requirements</h3>
                <p className="text-sm">
                  • PNG or JPG format<br />
                  • CORS enabled for external images<br />
                  • Recommended: Square aspect ratio
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
