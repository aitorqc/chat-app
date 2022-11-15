import React from 'react'
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { currentUser } = useContext(AuthContext);

    if (!currentUser) {
        return <Navigate to="/login" />;
    } else {
        return children
    }
};
