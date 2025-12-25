import Link from 'next/link';
import { FaCloud, FaShieldAlt, FaCogs, FaServer, FaUsers } from 'react-icons/fa';

const services = [
  {
    icon: FaCogs,
    title: 'Professional Services',
    description: 'Comprehensive IT consulting including system design, implementation, testing, and automation across multiple platforms.',
    href: '/services/professional-services',
    color: 'text-blue-500'
  },
  {
    icon: FaCloud,
    title: 'Cloud & Infrastructure',
    description: 'Full lifecycle management on AWS, Azure, and GCP. Expert migrations, datacenter operations, and DevOps solutions.',
    href: '/services/cloud-infrastructure',
    color: 'text-cyan-500'
  },
  {
    icon: FaShieldAlt,
    title: 'Cyber Security',
    description: 'Robust defense strategies, compliance management (SOX, PCI DSS, ISO 27001), and comprehensive risk assessments.',
    href: '/services/cyber-security',
    color: 'text-red-500'
  },
  {
    icon: FaServer,
    title: 'Business Continuity',
    description: 'Strategic planning for disruptions, comprehensive BCP/DR solutions, regular testing, and resilience building.',
    href: '/services/business-continuity',
    color: 'text-green-500'
  },
  {
    icon: FaUsers,
    title: 'Virtual Office Support',
    description: 'Secure remote work solutions with centralized security, access controls, and disaster recovery capabilities.',
    href: '/services/virtual-office',
    color: 'text-purple-500'
  },
];

export default function ServicesOverview() {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="heading-lg text-primary mb-6">Our Services</h2>
          <p className="text-xl text-gray-600">
            Our mission is to deliver top-notch professional services tailored to your needs. 
            We combine technical expertise with business understanding to drive your success.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-8 hover:-translate-y-2"
              >
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className={`text-5xl ${service.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon />
                  </div>

                  {/* Title */}
                  <h3 className="heading-sm text-primary mb-4 group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Learn More Link */}
                  <div className="text-accent font-semibold group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                    Learn More 
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Services Link */}
        <div className="text-center mt-12">
          <Link href="/services" className="btn-primary text-lg">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
