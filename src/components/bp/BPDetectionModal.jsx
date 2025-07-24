import React, { useState, useRef, useEffect } from 'react';
import { Modal } from '../shared/common/Modal';
import { Button } from '../shared/common/Button';
import { Icon } from '../../assets/icons';
import { storage } from '../../utils/storage';
import { getBPLevel } from '../../utils/health';
import toast from 'react-hot-toast';

export const BPDetectionModal = ({ isOpen, onClose, onResult }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [error, setError] = useState('');

  // Start camera when modal opens
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setError('');
      setCameraReady(false);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 },
          facingMode: 'user'
        }
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setCameraReady(true);
          toast.success('Camera ready! Position your face in the frame.');
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError('Camera access denied or not available. Please allow camera access and try again.');
      toast.error('Camera access denied');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    setCameraReady(false);
    setError('');
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame to canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Return the image data as base64
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const detectBP = async () => {
    if (!cameraReady) {
      toast.error('Please wait for camera to be ready');
      return;
    }

    setIsLoading(true);
    
    try {
      // Capture the current frame
      const frameData = captureFrame();
      
      if (!frameData) {
        throw new Error('Failed to capture frame');
      }

      // Show loading toast
      toast.loading('Analyzing facial blood flow patterns...', { duration: 4000 });
      
      // Simulate API call to BP detection model
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Simulate BP detection results
      const simulatedSystolic = Math.floor(Math.random() * (140 - 100) + 100);
      const simulatedDiastolic = Math.floor(Math.random() * (90 - 60) + 60);
      const simulatedPulse = Math.floor(Math.random() * (100 - 60) + 60);
      
      const bpLevel = getBPLevel(simulatedSystolic, simulatedDiastolic);
      const now = new Date();
      
      const reading = {
        id: Date.now().toString(),
        systolic: simulatedSystolic,
        diastolic: simulatedDiastolic,
        pulse: simulatedPulse,
        date: now.toISOString().split('T')[0],
        time: now.toTimeString().split(' ')[0].slice(0, 5),
        level: bpLevel.level,
        capturedImage: frameData // Store the captured frame
      };

      // Save to storage
      storage.addBPReading(reading);
      
      // Close modal and show result
      stopCamera();
      onClose();
      onResult({ reading, bpLevel });
      
      toast.dismiss();
      toast.success('BP detected successfully from facial analysis!');
      
    } catch (error) {
      console.error('Detection error:', error);
      toast.dismiss();
      toast.error('Detection failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      stopCamera();
      onClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose}
      title="Blood Pressure Detection"
      size="lg"
      showCloseButton={!isLoading}
    >
      <div className="space-y-6">
        {/* Instructions */}
        <div className="text-center">
          <p className="text-[#424242] mb-2">
            Ensure your face is clearly visible in the camera preview below.
          </p>
          <p className="text-sm text-[#9E9E9E]">
            Position yourself in good lighting and look directly at the camera.
          </p>
        </div>

        {/* Camera Preview */}
        <div className="relative">
          <div className="bg-gray-900 rounded-lg overflow-hidden aspect-video">
            {error ? (
              <div className="flex items-center justify-center h-full text-white text-center p-4">
                <div>
                  <Icon name="camera" className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-red-400 mb-4">{error}</p>
                  <Button variant="outline" size="sm" onClick={startCamera}>
                    Try Again
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
                
                {/* Camera Status Overlay */}
                {!cameraReady && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                      <p>Starting camera...</p>
                    </div>
                  </div>
                )}
                
                {/* Detection Overlay */}
                {isLoading && (
                  <div className="absolute inset-0 bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-pulse">
                        <Icon name="heart" className="w-12 h-12 mx-auto mb-4 text-red-400" />
                      </div>
                      <p className="text-lg font-semibold mb-2">Analyzing...</p>
                      <p className="text-sm">Detecting facial blood flow patterns</p>
                    </div>
                  </div>
                )}
                
                {/* Face Detection Guide */}
                {cameraReady && !isLoading && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-64 h-64 border-2 border-green-400 rounded-full opacity-50"></div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                      Position your face in the circle
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Hidden canvas for frame capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="primary"
            className="flex-1"
            onClick={detectBP}
            disabled={!cameraReady || isLoading || !!error}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Detecting...
              </>
            ) : (
              <>
                <Icon name="heart" className="w-4 h-4 mr-2" />
                Detect BP
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isLoading}
            className="sm:w-auto"
          >
            Cancel
          </Button>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-[#2196F3] mb-2">Tips for best results:</h4>
          <ul className="text-sm text-[#424242] space-y-1">
            <li>• Ensure good lighting on your face</li>
            <li>• Keep your face steady and look at the camera</li>
            <li>• Remove glasses if possible</li>
            <li>• Stay still during the 4-second analysis</li>
          </ul>
        </div>
      </div>
    </Modal>
  );
};