import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="relative h-screen w-full">
        <div className="relative w-full h-full">
          <Image
            src="/images/luxury-home.jpg"
            alt="Luxury Home"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Dream Home Awaits
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Hassle-free rental experience with cutting-edge technology
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-semibold">
              Explore Properties
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}