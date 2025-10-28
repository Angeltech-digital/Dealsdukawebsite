const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-deals-purple via-deals-orange to-deals-cyan text-white py-24 md:py-32">
      {/* Overlay effects */}
      <div className="absolute inset-0 bg-black/30 mix-blend-multiply"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15)_0%,transparent_70%)]"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 leading-tight tracking-tight drop-shadow-lg animate-fade-in">
          Welcome to <span className="text-deals-yellow">DealsDuka</span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-3xl leading-relaxed font-medium animate-fade-in-delay">
          Discover unbeatable deals on premium tech accessories — top quality, trusted brands, and fast delivery right to your door.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-fade-in-delay-2">
          <button className="bg-deals-yellow text-deals-black px-10 py-4 rounded-lg font-heading font-semibold text-lg shadow-lg hover:shadow-xl hover:bg-yellow-400 transition-all duration-300 transform hover:-translate-y-1">
            Shop Now
          </button>
          <button className="border-2 border-white text-white px-10 py-4 rounded-lg font-heading font-semibold text-lg shadow-lg hover:bg-white hover:text-deals-purple transition-all duration-300 transform hover:-translate-y-1">
            Learn More
          </button>
        </div>
      </div>

      {/* Decorative gradients / shapes */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-deals-yellow/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-deals-purple/20 rounded-full blur-3xl animate-pulse-slower"></div>
    </section>
  );
};

export default HeroSection;
