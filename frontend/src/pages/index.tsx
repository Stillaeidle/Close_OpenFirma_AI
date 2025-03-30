// import Head from 'next/head';
// import Card from '../components/Card';
// import Button from '../components/Button';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Head>
//         <title>Next.js with TypeScript and Tailwind</title>
//         <meta name="description" content="Next.js project with TypeScript and Tailwind CSS" />
//         <link rel="icon" href="/favicon.ico" />
//       </Head>

//       <main className="container mx-auto py-12 px-4">
//         <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">
//           Welcome to Next.js with TypeScript and Tailwind CSS
//         </h1>
//         <Button
//           text="Click Me"
//           variant="primary"
//           onClick={() => console.log('Button clicked!')}
//         />
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           <Card
//             title="Next.js 15.2.4"
//             description="A React framework that enables server-side rendering and static site generation."
//           />
//           <Card
//             title="TypeScript"
//             description="A strongly typed programming language that builds on JavaScript."
//           />
//           <Card
//             title="Tailwind CSS"
//             description="A utility-first CSS framework for rapidly building custom designs."
//           />
//         </div>
//       </main>

//       <footer className="bg-gray-800 text-white p-6 text-center">
//         <p>Built with Next.js, TypeScript, and Tailwind CSS</p>
//       </footer>
//     </div>
//   );
// }


import Head from 'next/head';
import Header from '@/components/Header';
import Hero from '@/components/sections/Hero';
import FeaturesGrid from '@/components/sections/FeaturesGrid';
import ValueProposition from '@/components/sections/ValueProposition';
import ProductShowcase from '@/components/sections/ProductShowcase';
import OptimizedSection from '@/components/sections/OptimizedSection';
import TechPlatform from '@/components/sections/TechPlatform';
import ProductDetails from '@/components/sections/ProductDetails';
import UniqueValue from '@/components/sections/UniqueValue';
import CtaSection from '@/components/sections/CtaSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Head>
        <title>OpenFirmaAI - Agricultural Data Platform</title>
        <meta name="description" content="All your agricultural data on one platform. Simple, efficient, yet affordable!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      
      <main>
        <Hero />
        <FeaturesGrid />
        <ValueProposition />
        <ProductShowcase />
        <OptimizedSection />
        <TechPlatform />
        <ProductDetails />
        <UniqueValue />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}