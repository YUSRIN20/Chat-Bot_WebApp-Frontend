import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MicrophoneIcon } from '@heroicons/react/24/outline';


const ChatBotComponent: React.FC = () => {
    const allowedTopics = ['Technology', 'Daily News', 'Personal Finance', 'Fun Facts'];
    const [response, setResponse] = useState<string>('');
    const [listening, setListening] = useState<boolean>(false);
    const [userMessage, setUserMessage] = useState<string>('');
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false); // Track if the bot is speaking

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    const startListening = () => {
        recognition.start();
        setListening(true);
        
        recognition.onresult = async (event: any) => {
            const spokenText = event.results[0][0].transcript;
            setUserMessage(spokenText);

            // Stop the current response if any
            if (isSpeaking) {
                window.speechSynthesis.cancel();
            }

            // Send user message to backend
            try {
                const res = await axios.post('https://chat-bot-webapp-backend.onrender.com/api/generate-content', {
                // const res = await axios.post('http://localhost:5500/api/generate-content', {
                    prompt: spokenText
                });
                setResponse(res.data.response);
            } catch (error) {
                console.error('Error generating response:', error);
                setResponse(`Please ask questions related to: ${allowedTopics.join(', ')}.`);
            }

            setListening(false);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            setListening(false);
        };
    };

    const handleResponse = (text: string) => {
        // Remove emojis from text
    const filteredText = text.replace(/[\p{Emoji_Presentation}|\p{Extended_Pictographic}]/gu, '');

        const utterance = new SpeechSynthesisUtterance(filteredText);
        utterance.onstart = () => {
            setIsSpeaking(true); // Bot starts speaking
        };
        utterance.onend = () => {
            setIsSpeaking(false); // Bot finished speaking
        };
        window.speechSynthesis.speak(utterance);

        // Add animation or sync code 
        const avatarElement = document.getElementById('avatar');
        if (avatarElement) {
            avatarElement.classList.add('speaking'); // Add animation class

            utterance.onend = () => {
                avatarElement.classList.remove('speaking'); // Remove animation class
            };
        }
    };

    useEffect(() => {
        if (response) {
            handleResponse(response);
        }
    }, [response]);

    return (
       
            <div className="flex flex-col items-center mt-2 p-6 max-w-lg mx-auto">
            <button
                onClick={startListening}
                disabled={listening}
                className={`${
                    listening ? 'bg-indigo-400' : 'bg-blue-500 hover:bg-blue-700'
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
                    <p className="text-gray-700 font-medium"><strong>You:</strong> {userMessage || 'Say something...'}</p>
                </div>

                {response && (
                    <div className="mt-4 p-3 bg-green-100 shadow rounded w-full text-left">
                        <p className="text-gray-800 font-medium"><strong>ChatBot:</strong> {response}</p>
                    </div>
                )}
            </div>
    );
};

export default ChatBotComponent;
