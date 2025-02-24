import Link from 'next/link';
import Image from 'next/image';

const WomenPage = () => {
  return (
    <div className="bg-red-100 container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-6">Women&apos;s Wear</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/women/stitch">
          <div className="cursor-pointer border rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
            <Image
              src="/stitch.png"
              alt="Stitched"
              width={400}
              height={300}
              className="w-full h-64 object-contain transition-opacity duration-300 hover:opacity-80"
            />
            <h2 className="text-xl font-semibold p-4 bg-gray-100">Stitched</h2>
          </div>
        </Link>
        <Link href="/women/unstitch">
          <div className="cursor-pointer border rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105">
            <Image
              src="/unstitch.png"
              alt="Unstitched"
              width={400}
              height={300}
              className="w-full h-64 object-contain transition-opacity duration-300 hover:opacity-80"
            />
            <h2 className="text-xl font-semibold p-4 bg-gray-100">Unstitched</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WomenPage;
