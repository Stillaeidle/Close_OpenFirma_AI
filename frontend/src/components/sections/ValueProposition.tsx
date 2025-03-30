import Image from 'next/image';
import { IconType } from 'react-icons';
import { FaLeaf, FaGithub, FaPlug, FaBook } from 'react-icons/fa';

// Benefit item component
const BenefitItem = ({ icon: Icon, title, description }: { 
  icon: IconType, 
  title: string, 
  description: string 
}) => (
  <div className="flex">
    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-green-50 dark:bg-brand-green-900/30 mr-4">
      <Icon className="text-brand-green-600 dark:text-brand-green-400" />
    </div>
    <div>
      <h3 className="font-medium mb-1 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  </div>
);

const ValueProposition = () => {
  const benefits = [
    {
      icon: FaGithub,
      title: 'GitHub',
      description: 'Contribute code, report issues, or suggest new features'
    },
    {
      icon: FaPlug,
      title: 'Integrations',
      description: 'APIs, webhooks, and more, with connect with other apps'
    },
    {
      icon: FaBook,
      title: 'Documentation',
      description: 'Well-organized user guides and technical documentation'
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/2 pr-0 md:pr-10">
            <div className="flex items-center text-sm text-brand-green-600 dark:text-brand-green-400 font-medium mb-4">
              <FaLeaf className="mr-2" />
              <span>Open Source Project</span>
            </div>
            
            <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
              Be part of the agricultural technology revolution
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              OpenFirmaAI brings together developers, agricultural experts, and growers to create the next 
              generation of farming intelligence. Join us in this exciting journey.
            </p>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <BenefitItem 
                  key={`benefit-${index}`}
                  icon={benefit.icon}
                  title={benefit.title}
                  description={benefit.description}
                />
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl dark:shadow-gray-800/20">
              <Image
                src="/images/hands-planting.jpg"
                alt="Hands planting a seedling"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;