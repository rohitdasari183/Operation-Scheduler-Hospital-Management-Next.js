import Image from "next/image";

export default function Home() {
  const images = Array.from({ length: 10 }, (_, i) => `m${i + 1}.jpg`);

  return (
    <main className="min-h-screen bg-black-100 px-6 py-16">
  <section className="text-center mb-16">
    <h1 className="text-5xl font-extrabold text-blue-800 mb-6">Hospital Operation Scheduler</h1>
    <p className="text-lg text-gray-700 max-w-3xl mx-auto">
      Streamline surgical planning and resource management using our advanced and user-friendly operation scheduling system.
    </p>
  </section>

  <section className="max-w-7xl mx-auto">
    <h2 className="text-3xl font-semibold text-gray-800 mb-10 text-center">Surgical Instruments</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      {images.map((src, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
        >
          <img
            src={src}
            alt={`Instrument ${i + 1}`}
            className="w-full h-64 object-cover"
          />
        </div>
      ))}
    </div>
  </section>
</main>

);
  
}
