import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Icon } from '../assets/icons';

export const About = () => {
  const benefits = [
    {
      icon: 'heart',
      title: 'Early Detection',
      description: 'Catch blood pressure issues before they become serious health problems.'
    },
    {
      icon: 'utensils',
      title: 'Nutritional Awareness',
      description: 'Understand how your food choices impact your overall health and BP.'
    },
    {
      icon: 'dashboard',
      title: 'Progress Tracking',
      description: 'Monitor trends and see improvements in your health over time.'
    },
    {
      icon: 'download',
      title: 'Medical Records',
      description: 'Generate detailed reports for your healthcare provider visits.'
    }
  ];

  const facts = [
    '1 in 3 adults worldwide has high blood pressure',
    'Diet accounts for 80% of blood pressure management',
    'Regular monitoring can reduce stroke risk by 40%',
    'Early detection saves millions of lives annually'
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Heading level={1} align="center" className="mb-6">
              About <span className="text-[#4CAF50]">BP-Fuel</span>
            </Heading>
            <p className="text-xl text-[#424242] max-w-3xl mx-auto leading-relaxed">
              Empowering individuals to take control of their cardiovascular health through 
              intelligent blood pressure monitoring and nutritional analysis.
            </p>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading level={2} className="mb-6">
              Our <span className="text-[#2196F3]">Mission</span>
            </Heading>
            <p className="text-[#424242] mb-6 leading-relaxed">
              BP-Fuel was created to bridge the gap between healthcare and daily life. We believe 
              that everyone deserves access to tools that help them understand and manage their 
              cardiovascular health effectively.
            </p>
            <p className="text-[#424242] leading-relaxed">
              By combining blood pressure monitoring with nutritional analysis, we provide a 
              comprehensive view of how lifestyle choices directly impact your health outcomes.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img 
              src="https://images.pexels.com/photos/4386339/pexels-photo-4386339.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Health monitoring" 
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </div>

        {/* Why It Matters Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Heading level={2} align="center" className="mb-4">
              Why Blood Pressure <span className="text-[#F44336]">Matters</span>
            </Heading>
            <p className="text-lg text-[#424242] max-w-2xl mx-auto">
              Understanding the critical importance of cardiovascular health monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
              >
                <div className="w-16 h-16 bg-[#4CAF50]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit.icon} className="w-8 h-8 text-[#4CAF50]" />
                </div>
                <h3 className="text-lg font-semibold text-[#212121] mb-3">
                  {benefit.title}
                </h3>
                <p className="text-[#424242]">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-[#F44336] to-[#D32F2F] p-8 rounded-xl text-white">
            <h3 className="text-2xl font-bold mb-6 text-center">Health Facts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-white rounded-full flex-shrink-0" />
                  <p className="text-white/90">{fact}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* How Food Impacts BP */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Heading level={2} align="center" className="mb-4">
              How <span className="text-[#FF9800]">Food</span> Impacts Blood Pressure
            </Heading>
            <p className="text-lg text-[#424242] max-w-2xl mx-auto">
              Understanding the powerful connection between nutrition and cardiovascular health
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-[#4CAF50] mb-3">
                  Foods That Help Lower BP
                </h4>
                <ul className="space-y-2 text-[#424242]">
                  <li>• Leafy green vegetables (spinach, kale)</li>
                  <li>• Berries rich in antioxidants</li>
                  <li>• Oatmeal and whole grains</li>
                  <li>• Bananas high in potassium</li>
                  <li>• Fatty fish with omega-3s</li>
                  <li>• Nuts and seeds</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-semibold text-[#F44336] mb-3">
                  Foods to Limit
                </h4>
                <ul className="space-y-2 text-[#424242]">
                  <li>• High-sodium processed foods</li>
                  <li>• Sugary drinks and desserts</li>
                  <li>• Red meat and processed meats</li>
                  <li>• Trans fats and fried foods</li>
                  <li>• Excessive alcohol</li>
                  <li>• High-caffeine beverages</li>
                </ul>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600" 
                alt="Healthy foods" 
                className="w-full h-full object-cover rounded-xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>

        {/* Educational Content */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Heading level={2} align="center" className="mb-8">
            Understanding <span className="text-[#2196F3]">Blood Pressure</span> Readings
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-[#4CAF50] mb-2">&lt;120/80</div>
              <div className="font-semibold text-[#4CAF50] mb-2">Normal</div>
              <p className="text-sm text-[#424242]">
                Maintain healthy lifestyle choices
              </p>
            </div>

            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-[#FFC107] mb-2">120-129/&lt;80</div>
              <div className="font-semibold text-[#FFC107] mb-2">Elevated</div>
              <p className="text-sm text-[#424242]">
                Consider lifestyle modifications
              </p>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-[#FF9800] mb-2">130-139/80-89</div>
              <div className="font-semibold text-[#FF9800] mb-2">Stage 1 High</div>
              <p className="text-sm text-[#424242]">
                Monitor closely, lifestyle changes
              </p>
            </div>

            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-[#F44336] mb-2">≥140/≥90</div>
              <div className="font-semibold text-[#F44336] mb-2">Stage 2 High</div>
              <p className="text-sm text-[#424242]">
                Consult healthcare provider
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-[#2196F3] text-center font-medium">
              <strong>Remember:</strong> Always consult with your healthcare provider for personalized medical advice. 
              BP-Fuel is a monitoring tool and does not replace professional medical care.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
};