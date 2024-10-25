'use client'

import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Result from '../components/Result';

export default function Home() {
  const [result, setResult] = useState<boolean | null>(null);

  const handleFileUpload = async (file: File) => {
    console.log(`Uploading file: ${file.name}, Size: ${file.size} bytes`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate a response based on file size
    const response = { result: file.size < 1000000 }; // True if file is smaller than 1MB
    setResult(response.result);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Image/Video Analyzer</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {result !== null && <Result isTrue={result} />}
    </main>
  );
}