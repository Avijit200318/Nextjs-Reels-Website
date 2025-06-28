"use client";
import React from 'react'
import VideoUploadForm from '../components/VideoUploadForm';

export default function VideoUpload() {
  return (
      <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload New Reel</h1>
        <VideoUploadForm />
      </div>
    </div>
  )
}
