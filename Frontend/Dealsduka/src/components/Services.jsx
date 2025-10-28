import { FastDeliveryIcon, SecurePaymentIcon, QualityProductsIcon, BestPricesIcon } from '../assets/icons';

const Services = () => {
  const services = [
    {
      icon: FastDeliveryIcon,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly and safely to your doorstep."
    },
    {
      icon: SecurePaymentIcon,
      title: "Secure Payment",
      description: "Your payments are protected with industry-standard security measures."
    },
    {
      icon: QualityProductsIcon,
      title: "Quality Products",
      description: "We offer only the highest quality tech accessories from trusted brands."
    },
    {
      icon: BestPricesIcon,
      title: "Best Prices",
      description: "Enjoy unbeatable deals and discounts on all our products."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-deals-purple/80 via-deals-purple/60 to-deals-orange/60 text-white relative overflow-hidden">
      {/* Glow effect background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 animate-fade-in">
            Why Choose <span className="text-deals-yellow">DealsDuka?</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-white/90 leading-relaxed animate-fade-in-delay">
            We provide exceptional service and quality products to make your shopping experience amazing.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-card hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-delay-2"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex justify-center mb-6">
                  <IconComponent className="text-6xl text-deals-yellow drop-shadow-md" />
                </div>
                <h3 className="text-2xl font-heading font-semibold mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-center text-white/85 leading-relaxed font-medium">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
