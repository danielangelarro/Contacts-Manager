import React from 'react';
import * as Toast from '@radix-ui/react-toast';
import { Cross2Icon } from '@radix-ui/react-icons';

interface ToastInfoProps {
    message: string;
    onClose: () => void;
}

const ToastInfo: React.FC<ToastInfoProps> = ({ message, onClose }) => {
    return (
        <Toast.Root className="ToastRoot" onOpenChange={onClose}>
            <div className="flex items-center justify-between p-4 bg-green-500 text-white rounded">
                <span>{message}</span>
                <Toast.Close asChild>
                    <button aria-label="Close">
                        <Cross2Icon />
                    </button>
                </Toast.Close>
            </div>
        </Toast.Root>
    );
};

export default ToastInfo;