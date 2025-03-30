import Image from 'next/image';
import Link from 'next/link';
import { FaPlayCircle } from 'react-icons/fa';

const OptimizedSection = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">Optimized for productivity</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="rounded-lg overflow-hidden shadow-md dark:shadow-gray-800/20">
            <Image
              src="/images/farmer-field.jpg"
              alt="Farmer in field"
              width={400}
              height={200}
              className="w-full h-40 object-cover"
            />
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md dark:shadow-gray-800/20">
            <Image
              src="/images/field-grid.jpg"
              alt="Field grid view"
              width={400}
              height={200}
              className="w-full h-40 object-cover"
            />
          </div>
          
          <div className="rounded-lg overflow-hidden shadow-md dark:shadow-gray-800/20">
            <Image
              src="/images/agricultural-land.jpg"
              alt="Agricultural land"
              width={400}
              height={200}
              className="w-full h-40 object-cover"
            />
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Experience true speed. OpenFirmaAI loads in only about 25-34% of the time from 
          new or cold starts. All operations are on average less than 300ms - faster than a blink.
        </p>
        
        <div className="flex justify-center">
          <Link 
            href="/demo-video" 
            className="flex items-center text-brand-green-600 dark:text-brand-green-400 font-medium hover:text-brand-green-700 dark:hover:text-brand-green-300 transition-colors"
          >
            <FaPlayCircle className="mr-2" /> See it in action
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OptimizedSection;