// src/components/KPI/KPIComponent.jsx
import React, { useState } from "react";
import { Button, Typography, Box, Card, CardContent, Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Assignment, Star, CheckCircle } from "@mui/icons-material";

const KPIComponent = () => {
    const [started, setStarted] = useState(false);
    const [scores, setScores] = useState(Array(6).fill(0)); // Initialize scores array with 0s

    const navigate = useNavigate();

    const handleStartClick = () => {
        // Navigate to KPIDashboard
        navigate('../KPIdashboard');
    };

    return (
        <Box 
            sx={{ 
                padding: '40px', 
                background: 'linear-gradient(to right, #e0f7fa, #80deea)', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center' 
            }}
        >
            <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                    marginBottom: '24px', 
                    fontWeight: 'bold', 
                    color: '#00796b' 
                }}
            >
                Welcome to the KPI Dashboard
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: '16px', textAlign: 'center' }}>
                        <CardContent>
                            <Assignment sx={{ fontSize: 60, color: '#00796b', marginBottom: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', fontWeight: '600' }}>
                                KPI Scoring Guidelines
                            </Typography>
                            <Typography variant="body2" component="ul" sx={{ lineHeight: 1.6, listStyleType: 'none', padding: 0 }}>
                                <li><strong>0-2:</strong> Very Poor - The employee shows minimal capability or effort in this area.</li>
                                <li><strong>3-4:</strong> Below Average - The employee needs significant improvement to meet expectations.</li>
                                <li><strong>5-6:</strong> Average - The employee meets the basic expectations but has room for growth.</li>
                                <li><strong>7-8:</strong> Good - The employee demonstrates strong performance and exceeds basic requirements.</li>
                                <li><strong>9-10:</strong> Excellent - The employee consistently exceeds expectations and excels in this area.</li>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: '16px', textAlign: 'center' }}>
                        <CardContent>
                            <Star sx={{ fontSize: 60, color: '#ffb300', marginBottom: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', fontWeight: '600' }}>
                                Why Evaluate KPIs?
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                                Evaluating KPIs helps to identify strengths and weaknesses in employee performance, fostering growth and accountability.
                            </Typography>
                            <Button 
                                variant="contained" 
                                onClick={handleStartClick} 
                                sx={{ 
                                    marginTop: '16px', 
                                    backgroundColor: '#00796b', 
                                    '&:hover': { backgroundColor: '#004d40' },
                                    transition: 'background-color 0.3s ease' 
                                }}
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={3} sx={{ borderRadius: '16px', textAlign: 'center' }}>
                        <CardContent>
                            <CheckCircle sx={{ fontSize: 60, color: '#43a047', marginBottom: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ marginBottom: '16px', fontWeight: '600' }}>
                                Our Commitment
                            </Typography>
                            <Typography variant="body2" sx={{ marginBottom: '16px' }}>
                                We are committed to providing a fair and transparent evaluation process to help our team members succeed.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
                <Typography variant="body1" sx={{ marginBottom: '16px' }}>
                    Ready to start evaluating? Click the button above to begin!
                </Typography>
            </Box>
        </Box>
    );
};

export default KPIComponent;
