import Image from 'next/image';
import Button from '@/components/Button';

const ProductDetails = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-2 text-center text-gray-900 dark:text-white">Agricultural software done right</h2>
        
        <div className="border-b border-gray-200 dark:border-gray-700 pb-16 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12">
            {/* Open Source */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Open source</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We&apos;re powered by a community of developers collaborating worldwide. We&apos;re perfect 
                for farms of all sizes, from a small startup to a massive farming enterprise 
                pushing boundaries.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                OpenFirmaAI is available in two editions:
              </p>
              <ul className="list-disc pl-5 mb-4 text-gray-600 dark:text-gray-300">
                <li>Community Edition: Free</li>
                <li>Enterprise Edition: Offers more features and private services</li>
              </ul>
              <Button href="/compare" variant="primary">
                Compare Editions
              </Button>
            </div>
            
            {/* No vendor lock-in */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">No vendor lock-in</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                With an open-source core and standard databases, you own your data. No software lock-in: 
                you can export data, connect to other services, and use the flexibility to build on your 
                infrastructure, on or off-premise.
              </p>
              <Button href="/try-free" variant="primary">
                Try for free
              </Button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Fair pricing */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Fair pricing</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We have simple pricing: no feature upselling, no long-term contracts, no hosting limits, 
              no surprise fees. Just $5 per user, per year — all-inclusive.
            </p>
            <Button href="/pricing" variant="primary">
              View Pricing
            </Button>
          </div>
          
          {/* Highly customizable */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Highly customizable</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              You can deploy tools to create custom dashboards, automated alerts, custom reports, 
              or integrate with other systems using our flexible API.
            </p>
            <div className="rounded-lg overflow-hidden shadow-md dark:shadow-gray-800/20 mt-6">
              <Image
                src="/images/dashboard-custom.jpg"
                alt="Customizable Dashboard"
                width={500}
                height={250}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;