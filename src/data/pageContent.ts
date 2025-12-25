// Page content configuration
// This file stores editable content for all pages

export const pageContent = {
  home: {
    hero: {
      title: "We Just Do IT",
      subtitle: "Professional IT Consulting & Business Solutions Since 1994",
      description: "Transform your business with expert IT consulting, cloud infrastructure, cyber security, and business continuity services.",
      cta: {
        primary: "Get Started",
        secondary: "Learn More"
      }
    },
    services: {
      title: "Our Services",
      subtitle: "Comprehensive IT solutions tailored to your business needs"
    },
    about: {
      title: "About RHC Solutions",
      description: "Since 1994, we've been delivering exceptional IT consulting and business solutions."
    }
  },
  aboutUs: {
    hero: {
      title: "About Us",
      subtitle: "Since 1994, RHC Solutions has been at the forefront of IT innovation"
    },
    mission: {
      title: "Our Mission",
      content: "To deliver innovative IT solutions that drive business success and digital transformation."
    },
    vision: {
      title: "Our Vision",
      content: "To be the trusted technology partner for businesses worldwide, enabling growth through cutting-edge IT solutions."
    }
  },
  services: {
    hero: {
      title: "Our Services",
      subtitle: "Comprehensive IT Solutions for Modern Businesses"
    },
    description: "From cloud infrastructure to cyber security, we provide end-to-end IT services that keep your business running smoothly and securely."
  },
  contact: {
    hero: {
      title: "Contact Us",
      subtitle: "Let's discuss how we can help transform your IT infrastructure"
    },
    info: {
      email: "info@rhcsolutions.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, Tech City, TC 12345"
    }
  }
};

export type PageContent = typeof pageContent;
