// src/app/page.tsx
'use client'

import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Result from '../components/Result';
import ProcessingOverlay from '../components/ProcessingOverlay';

function simulateLongProcess(file: File): Promise<boolean> {
  return new Promise((resolve) => {
    console.log(`Processing file: ${file.name}, Size: ${file.size} bytes`);
    
    // Simulate a longer processing time (e.g., 5 seconds)
    const processingTime = 5000; // 5 seconds

    setTimeout(() => {
      console.log(`Finished processing: ${file.name}`);
      // Simulate a response based on file size
      const result = file.size < 1000000; // True if file is smaller than 1MB
      resolve(result);
    }, processingTime);
  });
}

export default function Home() {
  const [result, setResult] = useState<boolean | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file: File) => {
    setIsProcessing(true);
    setResult(null); // Reset previous result

    try {
      const processedResult = await simulateLongProcess(file);
      setResult(processedResult);
    } catch (error) {
      console.error("Error processing file:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Deepfake Detector</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {result !== null && <Result isTrue={result} />}
      {isProcessing && <ProcessingOverlay />}
    </main>
  );
}