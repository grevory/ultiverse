"use client";

import { ReactNode, useEffect, useState } from 'react';
import { Alert, AlertColor, Snackbar } from '@mui/material';
import { DEFAULT_SNACKBAR_DELAY } from '@/constants/ui.constants';

interface Notification {
    message: string;
    action?: ReactNode;
    severity?: AlertColor;
    onClose?: () => void;
};

export default function Notification ({ message, action, severity, onClose }: Notification) {
    const [ notificationMessage, setNotificationMessage ] = useState(message);

    const handleClose = () => {
        setNotificationMessage("");
        if (onClose) {
            onClose();
        }
    }

    return (
        <Snackbar
            open={!!notificationMessage}
            autoHideDuration={DEFAULT_SNACKBAR_DELAY}
            onClose={handleClose}
            message={notificationMessage}
            action={action}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            {severity ? (
                <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                    {notificationMessage}
                </Alert>) : undefined}
        </Snackbar>
    );
}