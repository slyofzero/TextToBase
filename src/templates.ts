interface TemplateDescription {
  id: number;
  name: string;
  category: string;
  estimatedTime: string;
  details: string;
}

export const templateDescriptions: TemplateDescription[] = [
  {
    id: 1,
    name: "template1",
    category: "Business, Crypto",
    estimatedTime: "5 minutes",
    details:
      "Perfect for tokens. Features: Dynamic visual design with contrasting shades. Intuitive navigation with a clear home button and menu. Central globe-themed graphic ideal for tech or global businesses. Adaptable 'Title' and 'Description' sections. Mobile-responsive, SEO-friendly, and optimized for fast loading.",
  },
  {
    id: 2,
    name: "template2",
    category: "Crypto",
    estimatedTime: "5 minutes",
    details:
      "Modern aesthetics with a deep blue palette. Fluid abstract shapes convey a sense of movement and innovation. Central content placement with clearly defined 'Title' and 'Description' sections. Two distinct call-to-action buttons for varied user engagement. Minimalistic footer with essential social icons. Sleek and contemporary design ideal for tech companies or creative agencies.",
  },
];
