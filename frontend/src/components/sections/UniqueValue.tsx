import { FaCheckCircle } from 'react-icons/fa';

// Value item component
const ValueItem = ({ title, description }: { title: string, description: string }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md dark:shadow-gray-800/20 transition-colors">
    <div className="flex items-start mb-4">
      <FaCheckCircle className="text-brand-green-600 dark:text-brand-green-400 mt-1 mr-3" />
      <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
    </div>
    <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>
  </div>
);

const UniqueValue = () => {
  const valueItems = [
    {
      title: 'Complete Solution',
      description: 'All agricultural processes in a single platform'
    },
    {
      title: 'Data Agricultural Expertise',
      description: 'Made by farmers, for farmers'
    },
    {
      title: 'Open Source Core',
      description: 'Freedom from vendor lock-in'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">A unique value proposition</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valueItems.map((item, index) => (
            <ValueItem 
              key={`value-${index}`}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UniqueValue;