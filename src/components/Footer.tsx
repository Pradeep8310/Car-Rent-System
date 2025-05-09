import { Car, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <Car className="h-8 w-8 text-emerald-400" />
              <span className="ml-2 text-xl font-bold">DriveEasy</span>
            </div>
            <p className="mt-2 text-gray-400">
              Premium car rentals for your travel needs. Drive in style and comfort.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-emerald-400" />
                <span>+1 (555) 123-4567</span>
              </p>
              <p className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-emerald-400" />
                <span>support@driveeasy.com</span>
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Operating Hours</h3>
            <p className="text-gray-400">Monday - Friday: 8am - 8pm</p>
            <p className="text-gray-400">Saturday - Sunday: 9am - 5pm</p>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} DriveEasy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;