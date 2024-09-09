import React, { useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button'; 
import { MicrophoneIcon } from '@heroicons/react/24/outline';
import '../Style/AvatarBot.css'

const AvatarGenerateComponent: React.FC = () => {
    const [response, setResponse] = useState<string>('');
    const [userMessage, setUserMessage] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [videoId, setVideoId] = useState<string | null>(null);
    const [listening, setListening] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [showFetchButton, setFetchButton] = useState<boolean>(false);

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
        console.error('Speech Recognition API not supported in this browser.');
        return null;
    }
    const recognition = new SpeechRecognition();

    const startListening = () => {
        recognition.start();
        setListening(true);
        setLoading(false); // Stop loading when listening starts
        setVideoUrl('');
        setError(null);
        setVideoId('')

        recognition.onresult = async (event: any) => {
            const spokenText = event.results[0][0].transcript;
            setUserMessage(spokenText);
            try {
                const res = await axios.post('https://chat-bot-webapp-backend.onrender.com/api/generate', { prompt: spokenText });
                // const res = await axios.post('http://localhost:5500/api/generate', { prompt: spokenText });

                if (res.data && res.data.response) {
                    setResponse(res.data.response);
                } else {
                    setError('No response received from the server.');
                }

                if (res.data && res.data.videoId) {
                    setVideoId(res.data.videoId);
                    setFetchButton(true);
                    
                } else {
                    setError('No video ID received from the server.');
                }

            } catch (error) {
                console.error('Error generating response:', error);
                setError('An error occurred while generating the response.');
            } finally {
                setListening(false);
                //   timeout(videoId)
                //   console.log("===",videoId);
            }
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setError(`Speech recognition error: ${event.error}`);
            setListening(false);
        };
    };
    // const timeout = async (videoId: string | null) => {
    //     setTimeout(() => {
    //        getVideoData(videoId)
    //         console.log("time==", videoId); 
    //         setVideoUrl(''); // for removing previous Video url
    //         setVideoId('')
    //     }, 5000);
    // }
    // const getVideoData = async (videoId: string | null) => {
    //     setVideoUrl('')
    //     if (videoId) {
    //         try {
    //             const res = await axios.get(`http://localhost:5500/api/video-status/${videoId}`);
    //             if (res.data && res.data.data.status === 'completed') {
    //                 setVideoUrl(res.data.data.video_url);
    //             }
    //         } catch (error) {
    //             console.error('Error checking video status:', error);
    //             setError('Failed to check video status.');
    //         }
    //     } else {
    //         setError('No video ID available to check status.');
    //     }
    // }
    const fetchVideoUrl = async () => {
        setLoading(true); // Start loading when fetching video URL
        setTimeout(async () => {
            if (videoId) {
                try {
                    const statusRes = await axios.get(`https://chat-bot-webapp-backend.onrender.com/api/video-status/${videoId}`);
                    // const statusRes = await axios.get(`http://localhost:5500/api/video-status/${videoId}`);
                    if (statusRes.data && statusRes.data.data.status === 'completed') {
                        setVideoUrl(statusRes.data.data.video_url);
                        setFetchButton(false);
                        setLoading(false); // Stop loading when video URL is fetched
                    } else if (statusRes.data.data.status !== 'completed') {
                        console.log('Video is still processing');
                        setError('Video is still processing,click get video button for another try!')

                    } else {
                        setError('No video URL received from the server.');
                    }
                } catch (statusError) {
                    console.error('Error checking video status:', statusError);
                    setError('Failed to check video status.');
                    setLoading(false)
                } finally {
                    setLoading(false); // Stop loading when video URL is fetched
                }
            } else {
                setError('No video ID available to check status.');
                setLoading(false);
            }
        }, 120 *1000);
    };


    return (
        <div className="flex flex-col items-center mt-8 p-6 bg-gray-100 shadow-md rounded-lg max-w-lg mx-auto">
            <h1 className="text-3xl font-bold text-center my-4 text-indigo-400">ChatVerse AI Avatar Assistant</h1>
            <button
                onClick={startListening}
                disabled={listening}
                className={`${listening ? 'bg-indigo-400' : 'bg-blue-500 hover:bg-blue-700'
                    } text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105`}
            >
                {listening ? (
                    <div className="flex items-center">
                        <MicrophoneIcon className="h-6 w-6 text-white animate-bounce mr-2" />
                        Listening...
                    </div>
                ) : (
                    <>Speak<i className="fa-solid fa-microphone mx-2"></i></>
                )}
            </button>

            {/* Icon displayed when the user speaks */}
            {listening && (
                <MicrophoneIcon
                    className="h-6 w-6 text-red-500 animate-pulse mt-4 transition transform scale-110"
                    style={{ transition: 'transform 0.3s ease-in-out' }}
                />
            )}

            <div className="mt-4 p-3 bg-white shadow rounded w-full text-left">
                <p className="text-gray-700 font-medium">
                    <strong>You:</strong> {userMessage || 'Say something...'}
                </p>
            </div>

            {response && (
                <div className="mt-4 p-3 bg-green-100 shadow rounded w-full text-left">
                    <p className="text-gray-800 font-medium"><strong>Response:</strong> {response}</p>
                </div>
            )}

            {showFetchButton && (
                <Button
                    onClick={fetchVideoUrl}
                    className="mt-6 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                    Get Avatar Video 
                </Button>
            )}

            {/* Show loading spinner when video is being processed */}
            {loading && (
                <div className="mt-4 flex flex-col items-center">
                    <p className="text-gray-600 font-medium">Video is being processed, please wait for 2 min...</p>
                    <div className="spinner"></div>
                </div>
            )}

            {videoUrl && (
                <div className="mt-6 p-3 bg-gray-200 shadow rounded w-full">
                    <p className="mb-4 text-gray-700 font-semibold">Avatar Response:</p>
                    <video width="640" height="360" controls className="rounded-lg shadow-lg">
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded w-full">
                    <p><strong>Error:</strong> {error}</p>
                </div>
            )}
        </div>
    );
};

export default AvatarGenerateComponent;
