import React, { useState, useRef, useEffect } from 'react';
import { Container } from '../components/shared/layout/Container';
import { Heading } from '../components/shared/common/Heading';
import { Button } from '../components/shared/common/Button';
import { CustomInput } from '../components/shared/common/CustomInput';
import { BPDetectionModal } from '../components/bp/BPDetectionModal';
import { Icon } from '../assets/icons';
import { storage } from '../utils/storage';
import { getBPLevel } from '../utils/health';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const BPCheck = () => {
  const navigate = useNavigate();
  
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const [pulse, setPulse] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!systolic || !diastolic) {
      toast.error('Please enter both systolic and diastolic values');
      return;
    }

    const systolicNum = parseInt(systolic);
    const diastolicNum = parseInt(diastolic);
    const pulseNum = pulse ? parseInt(pulse) : null;

    if (systolicNum < 70 || systolicNum > 250 || diastolicNum < 40 || diastolicNum > 150) {
      toast.error('Please enter valid BP values');
      return;
    }

    const bpLevel = getBPLevel(systolicNum, diastolicNum);
    const now = new Date();
    
    const reading = {
      id: Date.now().toString(),
      systolic: systolicNum,
      diastolic: diastolicNum,
      pulse: pulseNum,
      date: now.toISOString().split('T')[0],
      time: now.toTimeString().split(' ')[0].slice(0, 5),
      level: bpLevel.level
    };

    storage.addBPReading(reading);
    setResult({ reading, bpLevel });
    toast.success('BP reading saved successfully!');
  };

  const handleModalResult = (resultData) => {
    setResult(resultData);
  };

  if (result) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] py-8">
        <Container>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-8">
              <div 
                className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center ${
                  result.bpLevel.level === 'normal' ? 'bg-green-100' : 
                  result.bpLevel.level === 'elevated' ? 'bg-yellow-100' :
                  result.bpLevel.level === 'high1' ? 'bg-orange-100' :
                  result.bpLevel.level === 'high2' ? 'bg-red-100' : 'bg-red-100'
                }`}
              >
                <Icon 
                  name="heart" 
                  className={`w-12 h-12 ${
                    result.bpLevel.level === 'normal' ? 'text-[#4CAF50]' : 
                    result.bpLevel.level === 'elevated' ? 'text-[#FFC107]' :
                    result.bpLevel.level === 'high1' ? 'text-[#FF9800]' :
                    result.bpLevel.level === 'high2' ? 'text-[#F44336]' : 'text-[#D32F2F]'
                  }`} 
                />
              </div>
              
              <Heading level={2} align="center" className="mb-2">
                BP Reading Result
              </Heading>
              
              <div className="text-4xl font-bold text-[#212121] mb-2">
                {result.reading.systolic}/{result.reading.diastolic}
              </div>
              
              <div 
                className={`inline-block px-4 py-2 rounded-full text-lg font-semibold ${
                  result.bpLevel.level === 'normal' ? 'bg-green-100 text-[#4CAF50]' : 
                  result.bpLevel.level === 'elevated' ? 'bg-yellow-100 text-[#FFC107]' :
                  result.bpLevel.level === 'high1' ? 'bg-orange-100 text-[#FF9800]' :
                  result.bpLevel.level === 'high2' ? 'bg-red-100 text-[#F44336]' : 'bg-red-100 text-[#D32F2F]'
                }`}
              >
                {result.bpLevel.label}
              </div>
            </div>

            {result.reading.pulse && (
              <div className="text-center mb-6">
                <div className="text-[#424242]">Pulse Rate</div>
                <div className="text-2xl font-bold text-[#212121]">
                  {result.reading.pulse} BPM
                </div>
              </div>
            )}

            <div className="bg-[#FAFAFA] p-4 rounded-lg mb-6">
              <h4 className="font-semibold text-[#212121] mb-2">Recommendations:</h4>
              <ul className="text-[#424242] space-y-1">
                {result.bpLevel.level === 'normal' && (
                  <>
                    <li>• Maintain your healthy lifestyle</li>
                    <li>• Continue regular exercise</li>
                    <li>• Keep monitoring regularly</li>
                  </>
                )}
                {result.bpLevel.level === 'elevated' && (
                  <>
                    <li>• Consider lifestyle modifications</li>
                    <li>• Reduce sodium intake</li>
                    <li>• Increase physical activity</li>
                  </>
                )}
                {(result.bpLevel.level === 'high1' || result.bpLevel.level === 'high2') && (
                  <>
                    <li>• Consult with your healthcare provider</li>
                    <li>• Monitor daily and keep records</li>
                    <li>• Follow prescribed medications</li>
                  </>
                )}
                {result.bpLevel.level === 'crisis' && (
                  <>
                    <li>• Seek immediate medical attention</li>
                    <li>• This requires urgent care</li>
                    <li>• Contact emergency services if needed</li>
                  </>
                )}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="primary" 
                className="flex-1"
                onClick={() => navigate('/dashboard')}
              >
                View Dashboard
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => {
                  setResult(null);
                  setSystolic('');
                  setDiastolic('');
                  setPulse('');
                }}
              >
                Take Another Reading
              </Button>
            </div>
          </div>
        </Container>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAFA] py-8">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Heading level={1} align="center" className="mb-4">
              Blood <span className="text-[#F44336]">Pressure</span> Detection
            </Heading>
            <p className="text-[#424242]">
              Monitor your blood pressure using camera detection or manual entry
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Camera Detection */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-[#212121] mb-4">Camera Detection</h3>
                <div className="bg-[#FAFAFA] p-6 rounded-lg border-2 border-dashed border-[#E0E0E0] mb-4">
                  <div>
                    <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Icon name="camera" className="w-8 h-8 text-[#F44336]" />
                    </div>
                    <p className="text-[#424242] mb-4">
                      Use your camera for AI-powered BP detection through facial analysis
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={() => setShowModal(true)}
                    >
                      <Icon name="camera" className="w-4 h-4 mr-2" />
                      Start Camera Detection
                    </Button>
                  </div>
                </div>
              </div>

              {/* Manual Entry */}
              <div>
                <h3 className="text-lg font-semibold text-[#212121] mb-4">Manual Entry</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <CustomInput
                    label="Systolic (mmHg)"
                    type="number"
                    placeholder="120"
                    value={systolic}
                    onChange={(e) => setSystolic(e.target.value)}
                    required
                  />
                  
                  <CustomInput
                    label="Diastolic (mmHg)"
                    type="number"
                    placeholder="80"
                    value={diastolic}
                    onChange={(e) => setDiastolic(e.target.value)}
                    required
                  />
                  
                  <CustomInput
                    label="Pulse Rate (optional)"
                    type="number"
                    placeholder="72"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                  />
                  
                  <Button type="submit" className="w-full">
                    Save Reading
                  </Button>
                </form>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#2196F3] mb-2">How Camera Detection Works:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-[#424242]">
                <div>• Analyzes facial blood flow patterns</div>
                <div>• Detects micro-changes in skin color</div>
                <div>• Uses AI algorithms for BP estimation</div>
                <div>• Non-contact measurement technology</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* BP Detection Modal */}
        <BPDetectionModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onResult={handleModalResult}
        />
      </Container>
    </main>
  );
};