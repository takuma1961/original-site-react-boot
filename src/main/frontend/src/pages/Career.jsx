import React from 'react';
import Header from '../components/Header2';
import { Top } from '../components/index/Top';
import { Profile } from '../components/index/Profile';
import { Journey } from '../components/index/Journey';

const Career = () => {
    return (
        <>
            {/**共通ヘッダー */}
            <Header />
            <div>
                <main>
                    <Top />
                    <Profile />
                    <Journey />
                </main>
            </div>
        </>
    );
};

export default Career;