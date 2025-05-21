import React from 'react';
import { ShieldCheck, PhoneCall, MapPin, Car, User, Bell } from 'lucide-react';

const SafetyFeatures = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-green-500" />,
      title: 'Verified Drivers',
      description:
        'All our drivers undergo rigorous background checks, document verification, and regular performance reviews to ensure your safety.',
    },
    {
      icon: <PhoneCall className="w-8 h-8 text-green-500" />,
      title: 'SOS Button',
      description:
        'Immediate emergency assistance is just a tap away with our in-app SOS button that connects to local authorities and our safety team.',
    },
    {
      icon: <MapPin className="w-8 h-8 text-green-500" />,
      title: 'Real-time Tracking',
      description:
        'Share your ride details and real-time location with trusted contacts so they can follow your journey.',
    },
    {
      icon: <Car className="w-8 h-8 text-green-500" />,
      title: 'Vehicle Inspection',
      description:
        'All vehicles on our platform undergo regular safety inspections to ensure they meet our quality and safety standards.',
    },
    {
      icon: <User className="w-8 h-8 text-green-500" />,
      title: 'Anonymous Contact',
      description:
        'Your personal contact details remain protected with our anonymous communication system between riders and drivers.',
    },
    {
      icon: <Bell className="w-8 h-8 text-green-500" />,
      title: 'Ride Check',
      description:
        'Our system automatically detects unusual stops or route deviations and checks in to ensure everything is okay.',
    },
  ];

  return (
    <div className="bg-white dark:bg-[#0e1726] text-black dark:text-white py-16 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        Safety Features in Every Ride
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#0b121f] rounded-xl p-6 text-center shadow-md hover:shadow-lg transition"
          >
          <div className="flex items-center justify-center mb-4">
    <div className="bg-green-100 p-4 rounded-full shadow-sm shadow-green-300/50 flex items-center justify-center text-green-500">
       {feature.icon}
    </div>
</div>

            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SafetyFeatures;
