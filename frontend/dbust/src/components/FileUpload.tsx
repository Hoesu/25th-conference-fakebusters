import React, { useState, useCallback } from 'react';
import styles from './FileUpload.module.css';

interface FileUploadProps {
    onFileUpload: (file: File) => void;
  }
  
  const FileUpload: React.FC<FileUploadProps> = ({ onFileUpload }) => {
    const [isDragging, setIsDragging] = useState(false);
  
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
  
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
  
      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        onFileUpload(files[0]);
      }
    }, [onFileUpload]);
  
    const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onFileUpload(files[0]);
      }
    }, [onFileUpload]);

  return (
    <div 
      className={`${styles.dropArea} ${isDragging ? styles.dragging : ''}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <form className={styles.uploadForm}>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 16 16" 
          fill="currentColor" 
          className={styles.uploadIcon}
        >
          <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
        </svg>
        <input 
          type="file" 
          id="fileElem" 
          className={styles.fileInput} 
          accept="image/*" 
          onChange={handleFileChange}
        />
        <label className={styles.button} htmlFor="fileElem">Upload Image/Video</label>
      </form>
    </div>
  );
};

export default FileUpload;