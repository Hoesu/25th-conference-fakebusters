import React, { useState, useCallback } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
  }
  
  const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);
    const [isPreviewShown, setIsPreviewShown] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
const [isProcessing, setIsProcessing] = useState(false);
  
    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    }, []);
  
    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      // Only set isDragging to false if we're leaving the main drop area
      if (e.currentTarget === e.target) {
        setIsDragging(false);
      }
    }, []);
  
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    }, []);
  
    const handleFile = useCallback((file: File) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setIsPreviewShown(true);
        setSelectedFile(file);
      };
      reader.readAsDataURL(file);
    }, []);
    
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
    
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    }, [handleFile]);
    
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        handleFile(files[0]);
      }
    }, [handleFile]);
  
    const handleUpload = useCallback(() => {
      if (selectedFile) {
        setIsProcessing(true);
        
        // Simulate processing delay
        setTimeout(() => {
          // Here you would normally send the file to the server
          console.log('Processing file:', selectedFile.name);
          
          setIsProcessing(false);
          setPreview(null);
          setIsPreviewShown(false);
          setSelectedFile(null);
          onFileUpload(selectedFile);
        }, ); 
      }
    }, [selectedFile]);
  
    const handleClear = useCallback(() => {
      setPreview(null);
      setIsPreviewShown(false);
    }, []);

    return (
      <div 
        className={`${styles.dropArea} ${isDragging ? styles.dragging : ''} ${isPreviewShown ? styles.previewShown : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className={styles.previewContainer}>
            <img src={preview} alt="Preview" className={styles.preview} />
            <div className={styles.buttonContainer}>
              <button onClick={handleClear} className={styles.clearButton}>Clear</button>
              <button onClick={handleUpload} className={styles.uploadButton}>Upload</button>
            </div>
          </div>
        ) : (
          <form className={styles.uploadForm}>
            <div className={styles.uploadIconContainer}>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#ebebeb" 
                className={`${styles.uploadIcon} bi bi-image`}
                viewBox="0 0 16 16"
              >							  
                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"></path>
                <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"></path>
              </svg>
            </div>
            <input 
              type="file" 
              id="fileElem" 
              className={styles.fileInput} 
              accept="image/*,video/*" 
              onChange={handleFileChange}
            />
            <label className={styles.button} htmlFor="fileElem">Upload Image/Video</label>
          </form>
        )}
      </div>
    );
  };

export default FileUpload;