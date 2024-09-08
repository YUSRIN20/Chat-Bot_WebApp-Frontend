import ChatBotComponent from './ChatBotComponent';
import AvatarComponent from './AvatarComponent';

const ParentComponet = () => {
    return (
        <div className='flex flex-col items-center mt-8 p-6 bg-gray-100 shadow-md rounded-lg max-w-lg mx-auto'>
            <h1 className="text-3xl font-bold text-center my-4 text-indigo-400">ChatVerse AI Voice Assistant</h1>
            <AvatarComponent />
            <ChatBotComponent />
        </div>
    );
};

export default ParentComponet;