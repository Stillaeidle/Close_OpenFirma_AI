import Image from 'next/image';

const ProductShowcase = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Level up your farming operations</h2>
        
        <div className="max-w-4xl mx-auto shadow-2xl dark:shadow-gray-900/50 rounded-lg overflow-hidden">
          <Image
            src="/images/dashboard.jpg"
            alt="Dashboard Screenshot"
            width={800}
            height={450}
            className="w-full h-auto"
          />
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            <span className="h-2 w-6 bg-brand-green-600 dark:bg-brand-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-green-200 dark:bg-green-700 rounded-full"></span>
            <span className="h-2 w-2 bg-green-200 dark:bg-green-700 rounded-full"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;