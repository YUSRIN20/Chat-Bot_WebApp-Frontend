import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../Style/avatar.css'


const AvatarComponent: React.FC = () => {
    const [avatarUrl, setAvatars] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchAvatars = async () => {
            try {
                // const response = await axios.get('http://localhost:5500/api/avatars');
                const response = await axios.get('https://chat-bot-webapp-backend.onrender.com/api/avatars');
                setAvatars(response.data.data.avatars[20].preview_image_url)
                // console.log(avatarUrl);

            } catch (error) {
                console.error('Error fetching avatars:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAvatars();
    }, []);

    if (loading) return  <div className="spinner"></div>;
    return (
        <div>
        <img
            src={avatarUrl}
            alt="Avatar"
            className="rounded-full transition-transform duration-300 ease-in-out shadow-md"
            id="avatar"
        />
    </div>
    );
};

export default AvatarComponent;
