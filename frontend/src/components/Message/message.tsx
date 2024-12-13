import React from 'react';

interface MessageProps {
    type: 'error' | 'success' | 'info';
    message: string;
}

const Message: React.FC<MessageProps> = ({ type, message }) => {
    let style = '';

    switch (type) {
        case 'error':
            style = 'text-red-500'; // Color de error
            break;
        case 'success':
            style = 'text-green-500'; // Color de éxito
            break;
        case 'info':
            style = 'text-blue-500'; // Color de información
            break;
        default:
            break;
    }

    return (
        <div className={`p-4 mb-4 rounded ${style}`}>
            {message}
        </div>
    );
};

export default Message;