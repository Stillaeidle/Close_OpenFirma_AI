import Button from '@/components/Button';
import { FaChevronDown } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors">
          All your agricultural data on one platform.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 transition-colors">
          Simple, efficient, yet affordable!
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Button href="/signup" variant="primary" size="lg">
            Get Started
          </Button>
          <Button href="/demo" variant="outline" size="lg">
            Try for Free
          </Button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 flex items-center justify-center transition-colors">
          Need an advisor? <FaChevronDown className="ml-1" />
        </p>
      </div>
    </section>
  );
};

export default Hero;