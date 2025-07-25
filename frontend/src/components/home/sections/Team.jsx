import React from 'react';
import { Container } from '../../shared/layout/Container';
import { Heading } from '../../shared/common/Heading';
import { TeamCard } from '../../shared/common/TeamCard';
import { teamData } from '../../../data';

export const Team = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Ahmad Raza */}
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Ahmad Raza"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#212121] mb-2">Ahmad Raza</h3>
            <div className="text-[#4CAF50] font-semibold mb-4">MERN Stack Developer</div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-[#212121] mb-2">Skills:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-[#2196F3] rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-green-100 text-[#4CAF50] rounded-full text-sm">Node.js</span>
                <span className="px-3 py-1 bg-yellow-100 text-[#FF9800] rounded-full text-sm">MongoDB</span>
                <span className="px-3 py-1 bg-purple-100 text-[#9C27B0] rounded-full text-sm">TypeScript</span>
              </div>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-[#212121] mb-2">Achievements:</h4>
              <ul className="text-sm text-[#424242] space-y-1">
                <li>• 5+ Years Experience</li>
                <li>• 50+ Projects Completed</li>
                <li>• Health Tech Specialist</li>
                <li>• AI Integration Expert</li>
              </ul>
            </div>
          </div>
          {/* Muhammad Shehzaib Amin */}
          <div className="text-center bg-white p-8 rounded-xl shadow-lg">
            <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400" 
                alt="Muhammad Shehzaib Amin"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#212121] mb-2">Muhammad Shehzaib Amin</h3>
            <div className="text-[#2196F3] font-semibold mb-4">Media Manager</div>
            
            <div className="mb-6">
              <h4 className="font-semibold text-[#212121] mb-2">Skills:</h4>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="px-3 py-1 bg-blue-100 text-[#2196F3] rounded-full text-sm">Digital Marketing</span>
                <span className="px-3 py-1 bg-green-100 text-[#4CAF50] rounded-full text-sm">Content Strategy</span>
                <span className="px-3 py-1 bg-red-100 text-[#F44336] rounded-full text-sm">Brand Management</span>
                <span className="px-3 py-1 bg-orange-100 text-[#FF9800] rounded-full text-sm">Analytics</span>
              </div>
            </div>
            
            <div className="text-left">
              <h4 className="font-semibold text-[#212121] mb-2">Achievements:</h4>
              <ul className="text-sm text-[#424242] space-y-1">
                <li>• Marketing Expert</li>
                <li>• Brand Strategist</li>
                <li>• Content Creator</li>
                <li>• Growth Specialist</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};