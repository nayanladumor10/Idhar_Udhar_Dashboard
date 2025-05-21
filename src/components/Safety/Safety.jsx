import React from 'react'

const Safety = () => {
    return (
        // bg-gradient-to-r from-green-800 to-green-500
       <div className="bg-[#169B47] text-white text-center py-20 px-4">
    <h1 className="text-3xl md:text-5xl font-bold mb-6">Your Safety is Our Priority</h1>
    <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
        GreenGlide is committed to ensuring safe and secure rides for all our users. Discover the safety features we've built into every journey.
    </p>
    <div className="flex flex-wrap justify-center gap-4">
        <button className="w-auto bg-white text-green-700 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition">
            Safety Features
        </button>
        <button className="w-auto bg-black border border-white text-white font-semibold px-6 py-3 rounded-md transition duration-300 cursor-pointer hover:bg-[#2E9153]">
            Emergency Help
        </button>
    </div>
</div>

    )
}

export default Safety
