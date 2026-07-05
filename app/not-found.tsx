import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 max-w-6xl mx-auto px-6 py-12">
        {/* Left: Text Content */}
        <div className="flex flex-col justify-center space-y-8">
          <div>
            <h1 className="text-8xl md:text-9xl font-light text-amber-700 tracking-tight">404</h1>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 tracking-wide">
              OOPS, SOMETHING BROKE
            </h2>

            <div className="w-12 h-px bg-amber-600"></div>

            <p className="text-gray-700 leading-relaxed font-light">
              Looks like something got lost along the way.
              <br />
              Let us help you get back to something beautiful.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gray-900 text-amber-100 hover:bg-gray-800 transition font-light tracking-wider text-sm"
          >
            RETURN TO HOME
          </Link>
        </div>

        {/* Right: Rose Image */}
        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full aspect-square">
            <Image
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 500'%3E%3Crect fill='%23f5f5f0' width='400' height='500'/%3E%3Cpath fill='%23d4a574' opacity='0.8' d='M200 100 Q250 120 260 180 Q265 220 250 250 Q240 270 200 280 Q160 270 150 250 Q135 220 140 180 Q150 120 200 100'/%3E%3Cpath fill='%23e8c9a0' d='M200 120 Q230 135 235 180 Q238 210 220 240 Q210 260 200 265 Q190 260 180 240 Q162 210 165 180 Q170 135 200 120'/%3E%3Cpath fill='%234a5d3a' opacity='0.9' d='M190 280 L185 350 M210 280 L215 350 M185 350 Q180 370 185 390 M215 350 Q220 370 215 390'/%3E%3Cellipse cx='180' cy='320' rx='8' ry='15' fill='%235a6d4a'/%3E%3Cellipse cx='220' cy='330' rx='8' ry='15' fill='%235a6d4a'/%3E%3C/svg%3E"
              alt="Rose"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
