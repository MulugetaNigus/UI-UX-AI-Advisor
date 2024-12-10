import React from 'react';
import { Zap, Eye, LineChart, Clock } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Analysis',
    description: 'Get instant, intelligent suggestions to improve your website\'s UI/UX.',
  },
  {
    icon: Eye,
    title: 'Visual Feedback',
    description: 'See exactly where and how to make improvements with visual annotations.',
  },
  {
    icon: LineChart,
    title: 'Detailed Reports',
    description: 'Receive comprehensive reports with actionable insights.',
  },
  {
    icon: Clock,
    title: 'Real-time Processing',
    description: 'Get results within seconds of uploading your screenshot.',
  },
];

export function Features() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">
          Powerful Features for Better Design
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-indigo-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}