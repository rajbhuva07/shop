import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../navbar/Header';

const MainLayout = () => {
    const [search, setSearch] = useState('');
    const location = useLocation();

    
    const noHeaderPaths = ['/login', '/singup'];

    
    const showHeader = !noHeaderPaths.includes(location.pathname);

    return (
        <>
            {showHeader && <Header search={search} setSearch={setSearch} />}
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default MainLayout;
