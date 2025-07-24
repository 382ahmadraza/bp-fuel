import React from 'react';
import { Container } from '../../shared/layout/Container';
import { Icon } from '../../../assets/icons';

export const Stats = () => {
  return (
    <section className="py-20 bg-[#FAFAFA]">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Icon name="heart" className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <div className="text-4xl font-bold text-[#4CAF50] mb-2">1M+</div>
            <div className="text-[#424242] font-medium">BP Readings Analyzed</div>
            <p className="text-sm text-[#9E9E9E] mt-2">
              Accurate camera-based blood pressure monitoring
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">

            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Icon name="utensils" className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <div className="text-4xl font-bold text-[#4CAF50] mb-2">500K+</div>
            <div className="text-[#424242] font-medium">Meals Analyzed</div>
            <p className="text-sm text-[#9E9E9E] mt-2">
              AI-powered food recognition and nutrition analysis
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Icon name="users" className="w-8 h-8 text-[#4CAF50]" />
            </div>
            <div className="text-4xl font-bold text-[#4CAF50] mb-2">98%</div>
            <div className="text-[#424242] font-medium">User Satisfaction</div>
            <p className="text-sm text-[#9E9E9E] mt-2">
              Happy and healthy users worldwide
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}