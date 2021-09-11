import * as React from 'react';
import { AuthProvider } from './AuthProvider';
import Router from './router';


const App = () => {
    return (
        <AuthProvider>
            <Router />
        </AuthProvider>
    );
}


export default App