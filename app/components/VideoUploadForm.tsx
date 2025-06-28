"use client";

import React, { useState } from "react";
import FileUpload from "./FileUpload";

const VideoUploadForm = () => {
    const [uploadProgress, setUploadProgress] = useState<number | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [thumbnailUrl, setThumbnailUrl] = useState("do it latter on your own");


    const handleSuccess = (res: any) => {
        setVideoUrl(res.url);
        setMessage("Video uploaded successfully!");
        console.log("Upload response:", res);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/video", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    videoUrl,
                    thumbnailUrl
                })
            });

            const data = await res.json();
            if(!data.ok){
                console.log(data);
                return;
            }
            console.log("video save success fully ",data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="upload-container">
            <h2>Upload Your Video</h2>

            <FileUpload
                fileType="video"
                onProgress={(p) => setUploadProgress(p)}
                onSuccess={handleSuccess}
            />

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
                <input type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
                {/* img tag for thumbnail url */}
                <button type="submit">Submit</button>
            </form>

            {uploadProgress !== null && (
                <p>Uploading: {uploadProgress}%</p>
            )}

            {videoUrl && (
                <video controls width="400">
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default VideoUploadForm;
