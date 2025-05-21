import React from 'react';

const partners = [
    { id: 1, name: "Safety Partner 1", image: "partner1.png" },
    { id: 2, name: "Safety Partner 2", image: "partner2.png" },
    { id: 3, name: "Safety Partner 3", image: "https://images.unsplash.com/photo-1589188056053-28910dc61d38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fHNhZmV0eSUyMGFzc29jaWF0aW9uJTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=200&q=80" },
    { id: 4, name: "Safety Partner 4", image: "partner4.png" },
];

const SafetyPartners = () => {
    return (
        <div className="bg-[#F9FAFB] dark:bg-[#1a2532]  flex flex-col items-center justify-center p-6">
            <h2 className="text-black dark:text-white text-3xl font-bold mb-10">Our Safety Partners</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 w-full max-w-7xl">
                {partners.map(partner => (
                    <div
                        key={partner.id}
                        className="bg-white dark:bg-[#3d4755] rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition"
                    >
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className="h-24 object-contain mb-4"
                        />
                    </div>
                ))}
            </div>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition">
                Learn About Our Partnerships
            </button>
        </div>
    );
};

export default SafetyPartners;
