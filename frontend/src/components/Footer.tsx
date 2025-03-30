import Link from 'next/link';
import { 
  FaLeaf, FaGithub, FaTwitter, FaLinkedin, FaYoutube
  // FaGlobe removed as it's unused
} from 'react-icons/fa';

// Footer column component
const FooterColumn = ({ title, links }: { 
  title: string, 
  links: { text: string, href: string }[] 
}) => (
  <div>
    <h4 className="font-medium mb-4 text-white">{title}</h4>
    <ul className="space-y-2 text-gray-400">
      {links.map((link, index) => (
        <li key={`footer-link-${index}`}>
          <Link href={link.href} className="hover:text-white transition-colors">
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const Footer = () => {
  const columns = [
    {
      title: 'Community',
      links: [
        { text: 'Features', href: '/features' },
        { text: 'Documentation', href: '/docs' },
        { text: 'Forum', href: '/forum' },
        { text: 'Marketplace', href: '/marketplace' }
      ]
    },
    {
      title: 'Open Source',
      links: [
        { text: 'Download', href: '/download' },
        { text: 'GitHub', href: 'https://github.com' },
        { text: 'Contribution', href: '/contribute' },
        { text: 'Development', href: '/development' }
      ]
    },
    {
      title: 'Services',
      links: [
        { text: 'Cloud Hosting', href: '/cloud' },
        { text: 'Implementation', href: '/implementation' },
        { text: 'Support Center', href: '/support' },
        { text: 'Find a Partner', href: '/partners' }
      ]
    },
    {
      title: 'About Us',
      links: [
        { text: 'Our Structure', href: '/about' },
        { text: 'Contact Us', href: '/contact' },
        { text: 'Careers', href: '/careers' },
        { text: 'Blog', href: '/blog' },
        { text: 'Legal', href: '/legal' }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {columns.map((column, index) => (
            <FooterColumn 
              key={`footer-col-${index}`}
              title={column.title}
              links={column.links}
            />
          ))}
        </div>
        
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <FaLeaf className="text-brand-green-400 mr-2" />
            <span className="font-bold text-xl">OpenFirmaAI</span>
          </div>
          
          <div className="flex space-x-4 mb-4 md:mb-0">
            <a href="https://github.com" className="text-gray-400 hover:text-white transition-colors">
              <FaGithub />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-white transition-colors">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-white transition-colors">
              <FaLinkedin />
            </a>
            <a href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">
              <FaYoutube />
            </a>
          </div>
          
          <div>
            <select className="bg-gray-800 text-white text-sm px-3 py-1 rounded">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
          </div>
        </div>
        
        <div className="mt-8 text-xs text-gray-500 text-center">
          <p>OpenFirmaAI is part of open-source agricultural apps that can use in your farming needs. Feel beautiful. Seriously awesome.</p>
          <p className="mt-2">Copyright © 2023-2025 OpenFirmaAI LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;