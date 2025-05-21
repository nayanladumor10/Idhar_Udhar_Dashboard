import React from 'react';

const blogs = [
  {
    id: 1,
    title: '5 Essential Safety Tips for Every Rider',
    desc: 'Learn the fundamental safety practices that every rider should follow for a secure journey.',
    image: 'https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
  {
    id: 2,
    title: 'Understanding Our Driver Verification Process',
    desc: 'Dive deep into how GreenGlide ensures that only qualified drivers join our platform.',
    image: 'blog2.png',
  },
  {
    id: 3,
    title: 'New Safety Features Coming in 2025',
    desc: 'Explore the upcoming safety enhancements that will make your rides even more secure.',
    image: 'https://images.unsplash.com/photo-1542410613-d073472c3135?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
  },
];

const SafetyBlog = () => {
  return (
    <div className=" bg-white dark:bg-[#0f172a] py-16 px-6 text-black dark:text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Safety Blog</h2>
          <button className="bg-[#1e293b] px-4 py-2 rounded-md text-sm transition hover:bg-green-900 text-white">
            View All Articles
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-md transform transition duration-300 hover:scale-105"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-60 object-cover"
                />
              )}
              <div className="p-5">
    <h3 className="font-semibold text-lg mb-2 text-start">{blog.title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-start">{blog.desc}</p>
    <a
        href="#"
        onClick={(e) => {
            e.preventDefault();
        }}
        className="text-green-500 font-medium hover:underline text-start block" // Added "text-center" and "block"
    >
        Read More
    </a>
</div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SafetyBlog;
