import { IconType } from 'react-icons';
import { FaMobileAlt, FaNetworkWired, FaCloudSun, FaMapMarkedAlt } from 'react-icons/fa';

// Tech item component
const TechItem = ({ icon: Icon, title }: { icon: IconType, title: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-16 h-16 bg-white dark:bg-gray-700 rounded-lg shadow-md dark:shadow-gray-800/20 flex items-center justify-center mb-4">
      <Icon className="text-2xl text-brand-green-600 dark:text-brand-green-400" />
    </div>
    <h3 className="font-medium text-gray-900 dark:text-white">{title}</h3>
  </div>
);

const TechPlatform = () => {
  const techItems = [
    { icon: FaMobileAlt, title: 'Field Mobile' },
    { icon: FaNetworkWired, title: 'IoT Sensors' },
    { icon: FaCloudSun, title: 'Weather Station' },
    { icon: FaMapMarkedAlt, title: 'Drone Mapping' },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">All the tech in one platform</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {techItems.map((item, index) => (
            <TechItem 
              key={`tech-${index}`}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechPlatform;