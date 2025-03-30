import Button from '@/components/Button';

const CtaSection = () => {
  return (
    <section className="py-16 bg-brand-green-600 dark:bg-brand-green-800 text-white text-center transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-6">
          Unleash your growth potential
        </h2>
        <p className="mb-8">Your farm deserves the best technology</p>
        
        <Button 
          href="/try-free" 
          variant="secondary" 
          size="lg"
          className="mb-6"
        >
          Start Free - Try Free
        </Button>
        
        <p className="text-sm opacity-75">No credit card required</p>
      </div>
    </section>
  );
};

export default CtaSection;