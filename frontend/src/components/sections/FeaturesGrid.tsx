import Link from 'next/link';
import { IconType } from 'react-icons';
import { 
  FaChartLine, FaSeedling, FaCloudSunRain, FaTint, 
  FaRobot, FaLeaf, FaCloud, FaMobileAlt, FaTh, 
  FaFileAlt, FaUsers, FaExchangeAlt, FaChevronRight 
} from 'react-icons/fa';

// Feature item component
const FeatureItem = ({ icon: Icon, title }: { icon: IconType, title: string }) => (
  <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-10 rounded-lg p-4 text-center transition-all hover:transform hover:-translate-y-1 shadow-sm dark:shadow-md">
    <div className="mx-auto w-12 h-12 flex items-center justify-center mb-3">
      <Icon className="text-2xl text-brand-green-600 dark:text-brand-green-400" />
    </div>
    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{title}</p>
  </div>
);

const FeaturesGrid = () => {
  const features = [
    { icon: FaChartLine, title: 'Performance Monitoring' },
    { icon: FaSeedling, title: 'Crop Management' },
    { icon: FaCloudSunRain, title: 'Weather Analytics' },
    { icon: FaTint, title: 'Irrigation Control' },
    { icon: FaRobot, title: 'Automation' },
    { icon: FaLeaf, title: 'Sustainability' },
    { icon: FaCloud, title: 'Cloud Storage' },
    { icon: FaMobileAlt, title: 'Mobile Access' },
    { icon: FaTh, title: 'Field Mapping' },
    { icon: FaFileAlt, title: 'Reports' },
    { icon: FaUsers, title: 'Team Collaboration' },
    { icon: FaExchangeAlt, title: 'Data Integration' },
  ];

  return (
    <section className="bg-brand-green-600 dark:bg-brand-green-800 relative overflow-hidden transition-colors">
      <div className="absolute inset-0 opacity-10 bg-[url('/images/bg-pattern.jpg')] bg-cover"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {features.slice(0, 6).map((feature, index) => (
            <FeatureItem key={`feature-top-${index}`} icon={feature.icon} title={feature.title} />
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.slice(6).map((feature, index) => (
            <FeatureItem key={`feature-bottom-${index}`} icon={feature.icon} title={feature.title} />
          ))}
        </div>

        <div className="flex items-center justify-between mt-8 text-white">
          <div className="flex items-center">
            <span className="h-3 w-3 bg-white rounded-full inline-block mr-2"></span>
            <span className="text-sm">Integrate without OpenFirmaAI</span>
          </div>
          <Link href="/apps" className="text-sm flex items-center hover:text-gray-200 transition-colors">
            View all apps <FaChevronRight className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;