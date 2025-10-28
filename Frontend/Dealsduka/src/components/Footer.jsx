import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-deals-purple/80 via-deals-purple/60 to-deals-orange/70 text-white py-16 border-t border-white/20 backdrop-blur-md">
      {/* Overlay for glassy effect */}
      <div className="absolute inset-0 bg-black/20 mix-blend-multiply"></div>

      <div className="relative container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="animate-fade-in">
            <h3 className="text-3xl font-heading font-bold mb-4 tracking-tight text-deals-yellow">
              DealsDuka
            </h3>
            <p className="text-white/90 font-medium leading-relaxed max-w-xs">
              Your one-stop shop for unbeatable tech deals and quality accessories delivered fast.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-fade-in-delay">
            <h4 className="text-xl font-heading font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-white/90 font-medium">
              <li><a href="/" className="hover:text-deals-cyan transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-deals-cyan transition-colors">Products</a></li>
              <li><a href="/cart" className="hover:text-deals-cyan transition-colors">Cart</a></li>
              <li><a href="/orders" className="hover:text-deals-cyan transition-colors">Orders</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="animate-fade-in-delay-2">
            <h4 className="text-xl font-heading font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-white/90 font-medium">
              <li><a href="#" className="hover:text-deals-cyan transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-deals-cyan transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-deals-cyan transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-deals-cyan transition-colors">Returns</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="animate-fade-in-delay-2" style={{ animationDelay: '0.9s' }}>
            <h4 className="text-xl font-heading font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-5">
              <a href="#" className="hover:text-deals-cyan transition-all duration-300 transform hover:scale-110">
                <Facebook size={28} />
              </a>
              <a href="#" className="hover:text-deals-cyan transition-all duration-300 transform hover:scale-110">
                <Twitter size={28} />
              </a>
              <a href="#" className="hover:text-deals-cyan transition-all duration-300 transform hover:scale-110">
                <Instagram size={28} />
              </a>
              <a href="#" className="hover:text-deals-cyan transition-all duration-300 transform hover:scale-110">
                <Linkedin size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider + Bottom Note */}
        <div className="border-t border-white/30 mt-12 pt-8 text-center animate-fade-in">
          <p className="text-white/80 font-medium tracking-wide">
            &copy; {new Date().getFullYear()} <span className="text-deals-yellow font-semibold">DealsDuka</span>. All rights reserved.
          </p>
        </div>
      </div>

      {/* Decorative glows */}
      <div className="absolute -top-20 left-10 w-48 h-48 bg-deals-yellow/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-10 w-72 h-72 bg-deals-cyan/20 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;
