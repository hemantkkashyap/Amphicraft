import React, { useState, useEffect } from 'react';
import "./Time.css";

export default function Time() {
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const intervalId = setInterval(() => {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0'); // Ensure day is two digits
            const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Ensure month is two digits
            const year = now.getFullYear().toString().slice(-2); // Get last two digits of the year

            setCurrentDate(`${day} ${month} ${year}`);
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
        <div className='Main dark'>   
            <div className="stage">
                <div className="group g1">
                    <div className="dice d1">
                        <div className="face num-0">{currentDate.charAt(0)}</div>
                        <div className="face num-1"></div>
                        <div className="face num-2"></div>
                        <div className="face num-4"></div>
                        <div className="face num-6"></div>
                        <div className="face num-8"></div>
                    </div>
                    <div className="dice d2">
                        <div className="face num-0">{currentDate.charAt(1)}</div>
                        <div className="face num-1"></div>
                        <div className="face num-2"></div>
                        <div className="face num-3"></div>
                        <div className="face num-5"></div>
                        <div className="face num-7"></div>
                    </div>
                </div>
                <div className="group g2">
                    <div className="dice d3">
                        <div className="face num-0">{currentDate.charAt(3)}</div>
                        <div className="face num-1"></div>
                        <div className="face num-2"></div>
                        <div className="face num-4"></div>
                        <div className="face num-6"></div>
                        <div className="face num-8"></div>
                    </div>
                    <div className="dice d4">
                        <div className="face num-0">{currentDate.charAt(4)}</div>
                        <div className="face num-1"></div>
                        <div className="face num-2"></div>
                        <div className="face num-3"></div>
                        <div className="face num-5"></div>
                        <div className="face num-7"></div>
                    </div>
                </div>
                <div className="group g3">
                    <div className="dice d5">
                        <div className="face num-0">{currentDate.charAt(6)}</div>
                        <div className="face num-1"></div>
                        <div className="face num-2"></div>
                        <div className="face num-4"></div>
                        <div className="face num-6"></div>
                        <div className="face num-8"></div>
                    </div>
                    <div className="dice d6">
                        <div className="face num-0">{currentDate.charAt(7)}</div>
                        <div className="face num-1"></div>
                        <div className="face num-2"></div>
                        <div className="face num-3"></div>
                        <div className="face num-5"></div>
                        <div className="face num-7"></div>
                    </div>
                </div>
                <time></time>
                <p>{currentDate}</p>
            </div></div>
        </>
    );
}
