import React from "react";
import { Button, Image, Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";
import image1 from '../../assets/images/background1.png';

const KPIWelcome = () => {
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('../KPIdashboard');
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
            {/* Background Image Container */}
            <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
                <Image
                    src={image1}
                    alt="Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
            </div>
            
            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl">
                <h1 className="text-3xl font-bold text-center text-black mb-8">
                    Welcome to the KPI Dashboard
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* KPI Scoring Guidelines Card */}
                    <Card className="p-6 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <div className="text-blue-600 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                KPI Scoring Guidelines
                            </h2>
                            <ul className="text-sm text-gray-700 space-y-2">
                                <li><strong>0-2:</strong> Very Poor - Minimal capability or effort in this area.</li>
                                <li><strong>3-4:</strong> Below Average - Needs improvement to meet expectations.</li>
                                <li><strong>5-6:</strong> Average - Meets expectations but has room for growth.</li>
                                <li><strong>7-8:</strong> Good - Strong performance, exceeds basic requirements.</li>
                                <li><strong>9-10:</strong> Excellent - Consistently exceeds expectations and excels.</li>
                            </ul>
                        </div>
                    </Card>

                    {/* Why Evaluate KPIs Card */}
                    <Card className="p-6 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <div className="text-yellow-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Why Evaluate KPIs?
                            </h2>
                            <p className="text-sm text-gray-700 mb-6 text-center">
                                KPI evaluations foster growth and accountability by identifying strengths and areas for improvement in performance.
                            </p>
                            <Button 
                                color="primary" 
                                onClick={handleStartClick} 
                                className="px-6 py-2"
                            >
                                Get Started
                            </Button>
                        </div>
                    </Card>

                    {/* Our Commitment Card */}
                    <Card className="p-6 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40 transition-all hover:scale-105 hover:shadow-xl">
                        <div className="flex flex-col items-center">
                            <div className="text-green-500 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                                Our Commitment
                            </h2>
                            <p className="text-sm text-gray-700 text-center">
                                We are committed to fostering a transparent, fair, and growth-oriented environment for every team member.
                            </p>
                        </div>
                    </Card>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-black text-lg">
                        Ready to start evaluating? Click the button above to begin!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default KPIWelcome;