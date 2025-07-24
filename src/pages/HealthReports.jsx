import React from 'react';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { Icon } from '../assets/icons';
import { useNavigate } from 'react-router-dom';

export const HealthReports = () => {
  const navigate = useNavigate();

  const reportTypes = [
    {
      title: "Weekly Health Summary",
      description: "Comprehensive overview of your BP readings and meals from the past week",
      icon: "fileText",
      color: "#4CAF50",
      action: () => navigate('/reports')
    },
    {
      title: "Monthly Progress Report",
      description: "Track your health trends and improvements over the past month",
      icon: "dashboard",
      color: "#2196F3",
      action: () => navigate('/reports')
    },
    {
      title: "Medical Consultation Report",
      description: "Detailed report formatted for healthcare provider consultations",
      icon: "heart",
      color: "#F44336",
      action: () => navigate('/reports')
    },
    {
      title: "Nutrition Analysis Report",
      description: "In-depth analysis of your dietary patterns and nutritional intake",
      icon: "utensils",
      color: "#FF9800",
      action: () => navigate('/reports')
    }
  ];

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-12">
      <Container>
        <div className="text-center mb-12">
          <Heading level={1} align="center" className="mb-4">
            Health <span className="text-[#2196F3]">Reports</span>
          </Heading>
          <p className="text-xl text-[#424242] max-w-2xl mx-auto">
            Generate comprehensive health reports to track your progress and share with healthcare providers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {reportTypes.map((report, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${report.color}20` }}
                >
                  <Icon name={report.icon} className="w-6 h-6" style={{ color: report.color }} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#212121] mb-2">
                    {report.title}
                  </h3>
                  <p className="text-[#424242] mb-4">
                    {report.description}
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={report.action}
                  >
                    Generate Report
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h3 className="text-2xl font-semibold text-[#212121] mb-6">Report Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="download" className="w-8 h-8 text-[#4CAF50]" />
              </div>
              <h4 className="font-semibold text-[#212121] mb-2">Downloadable PDF</h4>
              <p className="text-[#424242] text-sm">Export reports as PDF for easy sharing and printing</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="dashboard" className="w-8 h-8 text-[#2196F3]" />
              </div>
              <h4 className="font-semibold text-[#212121] mb-2">Visual Charts</h4>
              <p className="text-[#424242] text-sm">Interactive charts and graphs for better understanding</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Icon name="heart" className="w-8 h-8 text-[#FF9800]" />
              </div>
              <h4 className="font-semibold text-[#212121] mb-2">Medical Format</h4>
              <p className="text-[#424242] text-sm">Professional format suitable for healthcare consultations</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};