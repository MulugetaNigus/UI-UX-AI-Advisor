import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, CheckCircle, Loader2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { analyzeFeedback } from '../services/mistralApi';
import MarkdownDisplay from '../services/MarkdownDisplay';

export function UploadSection() {
  const [preview, setPreview] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFeedback(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 1,
  });

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setIsAnalyzing(true);
    try {
      const result = await analyzeFeedback(selectedFile);
      setFeedback(result.feedback);
    } catch (error) {
      console.error('Error:', error);
      setFeedback('An error occurred while analyzing the image.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section className="py-14 mb-24 bg-whitee dark:bg-grayy-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
            Upload Your Website Screenshot
          </h2>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${isDragActive 
                ? 'border-indigo-600 bg-indigo-50 dark:border-indigo-400 dark:bg-indigo-900/20' 
                : 'border-gray-300 hover:border-indigo-400 dark:border-gray-700 dark:hover:border-indigo-400'}`}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div className="space-y-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <p className="text-lg text-gray-600 dark:text-gray-300">Screenshot uploaded successfully!</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-96 mx-auto rounded-lg shadow-lg"
                />
              </div>
            ) : (
              <div className="space-y-4">
                {isDragActive ? (
                  <ImageIcon className="w-12 h-12 text-indigo-600 dark:text-indigo-400 mx-auto" />
                ) : (
                  <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                )}
                <div className="space-y-2">
                  <p className="text-xl font-medium text-gray-700 dark:text-gray-200">
                    {isDragActive
                      ? 'Drop your screenshot here'
                      : 'Drag and drop your screenshot here'}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    or click to select a file from your computer
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {preview && (
            <div className="mt-8 space-y-6">
              <button
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing Screenshot...
                  </>
                ) : (
                  'Analyze Screenshot'
                )}
              </button>
              
              {feedback && (
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4 dark:text-white">AI Feedback</h3>
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {/* {feedback} */}
                       <MarkdownDisplay markdownText={feedback} />
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}