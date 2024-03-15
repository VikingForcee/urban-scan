import React from 'react';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Introduction Section */}
      <section id="introduction" className="bg-blue-500 text-white flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Urban Scan</h1>
          <p className="text-lg">Empowering communities, one urban issue at a time</p>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="bg-gray-100 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-lg">At Urban Scan, our mission is to provide a platform where citizens can easily report and resolve urban issues, making cities cleaner, safer, and more livable for everyone.</p>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="bg-blue-200 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
          <div className="flex justify-center">
            <div className="flex flex-col items-center mr-8">
              <img src="/team-member-1.jpg" alt="Team Member 1" className="rounded-full w-32 h-32 mb-2" />
              <p className="text-lg font-bold">John Doe</p>
              <p className="text-sm">Founder & CEO</p>
            </div>
            <div className="flex flex-col items-center">
              <img src="/team-member-2.jpg" alt="Team Member 2" className="rounded-full w-32 h-32 mb-2" />
              <p className="text-lg font-bold">Jane Smith</p>
              <p className="text-sm">Head of Operations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Idea Section */}
      <section id="idea" className="bg-gray-300 flex items-center justify-center h-screen">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Our Idea</h2>
          <p className="text-lg">Urban Scan is a one-stop destination for addressing day-to-day urban issues such as potholes, broken roads, and malfunctioning street lights. We not only compile this data but also process it to optimize the citizen experience in their area.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
