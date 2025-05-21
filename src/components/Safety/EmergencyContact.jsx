import React from "react";
import { PhoneCall } from "lucide-react";

const EmergencyContact = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-10 bg-white dark:bg-[#0F172A] text-black dark:text-white">
      <div className="max-w-3xl mx-auto flex items-center gap-6 bg-[#FEF2F2] dark:bg-[#231922] border border-red-300 dark:border-red-500 rounded-xl p-8 sm:p-10 min-h-[180px] sm:min-h-[200px]">
        {/* Icon */}
        <div className="bg-red-900 p-4 sm:p-5 rounded-full">
          <PhoneCall className="text-red-400 w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* Text Content */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-start">Emergency Contact</h3>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-2">
            In case of an emergency, please call our 24/7 safety helpline:
          </p>
          <p className="text-red-600 dark:text-red-400 font-bold  text-2xl text-start">
            1-800-SAFE-RIDE (1-800-723-3743)
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmergencyContact;
