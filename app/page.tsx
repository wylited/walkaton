import { RouteForm } from "@/components/route-form"

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Walkaton</h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
              Because why do we always only take the shortest routes?
            </p>
          </div>

          {/* data entry */}
          <RouteForm />

          {/* footer */}
          <div className="text-center mt-8 md:mt-12">
            <p className="text-sm text-gray-500">Explore your neighbourhood today.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
