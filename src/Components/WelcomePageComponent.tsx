import { Link } from "react-router-dom";
import React from 'react';

const WelcomePageComponent: React.FC = () => {
    return (
        <div className="container mx-auto p-8 min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Welcome to ChatVerse!</h1>
                
                <p className="text-lg text-center text-gray-700 mb-6">
                    ChatVerse is an advanced AI chatbot offering two amazing features: <strong>Text-based Chatbot with Avatar</strong> and <strong>Avatar-Video Based Chatbot</strong>. Dive into the world of conversational AI and get assistance with a wide range of topics like Technology, Daily News, Personal Finance, Fun Facts, and more!
                </p>

                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-8">
                    <h2 className="text-xl font-semibold mb-2">How to Use the ChatBot:</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Click on the "Speak" button and start speaking your question.</li>
                        <li>The chatbot will process your question and respond in a natural, conversational manner.</li>
                        <li>Wait a moment if you are asking for avatar-based responses, as video generation may take time.</li>
                        <li>You can ask about <span className="font-semibold">Technology, Daily News, Personal Finance, Fun Facts</span>, or start a casual conversation.</li>
                        <li>Make sure your microphone is enabled for voice interactions.</li>
                    </ul>
                </div>

                <div className="flex flex-col md:flex-row justify-center gap-10 mb-8">
                    {/* Chatbot with Avatar */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center w-full md:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Text-based Chatbot with Avatar</h2>
                        <p className="text-md mb-4">
                            Our text-based chatbot provides responses in real-time with a unique avatar to make interactions more engaging. Simply ask your question, and get informative responses with a personalized touch.
                        </p>
                        <p className="text-md mb-4">
                            <strong>How to Use:</strong> 
                            Just type your question, and the chatbot will not only respond but also use its avatar to interact visually!
                        </p>
                        <Link to="/text-chatbot" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Try the Avatar Chatbot
                        </Link>
                    </div>

                    {/* Video Avatar Chatbot */}
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md text-center w-full md:w-1/2">
                        <h2 className="text-2xl font-semibold mb-4">Video Avatar Chatbot</h2>
                        <p className="text-md mb-4">
                            Want to see your chatbot come to life in a video? Our video avatar chatbot generates a video response based on your query, making the interaction more dynamic and lively!
                        </p>
                        <p className="text-md mb-4">
                            <strong>How to Use:</strong>
                            Ask a question, and after processing, you'll receive a video where the avatar responds to your query.
                        </p>
                        <Link to="/video-chatbot" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Try the Video Avatar Chatbot
                        </Link>
                    </div>
                </div>

                <div className="text-lg text-gray-700 mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-center">Features & Capabilities:</h2>
                    <ul className="list-inside list-disc space-y-2">
                        <li>
                            <strong>Topic Assistance:</strong> Ask questions related to technology, news, or finance, and get informative responses.
                        </li>
                        <li>
                            <strong>Conversational Mode:</strong> Engage the chatbot in casual conversations, like saying "hello" or asking it to tell you a joke.
                        </li>
                        <li>
                            <strong>Avatar Responses:</strong> For some queries, our chatbot generates avatar-based video responses for a more immersive experience.
                        </li>
                        <li>
                            <strong>Voice Interaction:</strong> Simply click "Speak", and the chatbot will understand your spoken questions or commands.
                        </li>
                    </ul>
                </div>

                {/* <div className="text-center">
                    <p className="text-sm text-gray-500">To get started, click on the "Speak" button and ask away!</p>
                    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Start Chatting
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default WelcomePageComponent;
