import React, { useState } from "react";
import { Button, Typography, Box, Card, CardContent, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Assignment, Star, CheckCircle } from "@mui/icons-material";

const KPIComponent = () => {
    const [started, setStarted] = useState(false);
    const navigate = useNavigate();

    const handleStartClick = () => {
        navigate('../KPIdashboard');
    };

    return (
        <Box 
            sx={{ 
                padding: '40px', 
                backgroundColor: '#ffffff', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' 
            }}
        >
            <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                    marginBottom: '24px', 
                    fontWeight: 'bold', 
                    color: '#1f2937',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                    animation: 'fadeIn 1s ease-out'
                }}
            >
                Welcome to the KPI Dashboard
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ width: '100%', maxWidth: '1200px' }}>
                <Grid item xs={12} md={4}>
                    <Card elevation={4} sx={{ 
                        borderRadius: '16px', 
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }
                    }}>
                        <CardContent>
                            <Assignment sx={{ fontSize: 60, color: '#2563eb', marginBottom: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                                KPI Scoring Guidelines
                            </Typography>
                            <Typography variant="body2" component="ul" sx={{ 
                                lineHeight: 1.8, 
                                textAlign: 'left', 
                                padding: '0 10px',
                                color: '#374151',
                                '& li': { marginBottom: '8px' } 
                            }}>
                                <li><strong>0-2:</strong> Very Poor - Minimal capability or effort in this area.</li>
                                <li><strong>3-4:</strong> Below Average - Needs improvement to meet expectations.</li>
                                <li><strong>5-6:</strong> Average - Meets expectations but has room for growth.</li>
                                <li><strong>7-8:</strong> Good - Strong performance, exceeds basic requirements.</li>
                                <li><strong>9-10:</strong> Excellent - Consistently exceeds expectations and excels.</li>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={4} sx={{ 
                        borderRadius: '16px', 
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }
                    }}>
                        <CardContent>
                            <Star sx={{ fontSize: 60, color: '#f59e0b', marginBottom: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                                Why Evaluate KPIs?
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#374151', marginBottom: '16px' }}>
                                KPI evaluations foster growth and accountability by identifying strengths and areas for improvement in performance.
                            </Typography>
                            <Button 
                                variant="contained" 
                                onClick={handleStartClick} 
                                sx={{ 
                                    backgroundColor: '#2563eb', 
                                    color: '#fff',
                                    '&:hover': { backgroundColor: '#1d4ed8' },
                                    transition: 'background-color 0.3s ease'
                                }}
                            >
                                Get Started
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card elevation={4} sx={{ 
                        borderRadius: '16px', 
                        textAlign: 'center',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                        '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)' }
                    }}>
                        <CardContent>
                            <CheckCircle sx={{ fontSize: 60, color: '#10b981', marginBottom: 2 }} />
                            <Typography variant="h5" component="h2" sx={{ fontWeight: '600', color: '#1f2937', marginBottom: '12px' }}>
                                Our Commitment
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#374151', marginBottom: '16px' }}>
                                We are committed to fostering a transparent, fair, and growth-oriented environment for every team member.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Box sx={{ marginTop: '40px', textAlign: 'center', animation: 'fadeInUp 1s ease-out' }}>
                <Typography variant="body1" sx={{ marginBottom: '16px', color: '#6b7280' }}>
                    Ready to start evaluating? Click the button above to begin!
                </Typography>
            </Box>
        </Box>
    );
};

export default KPIComponent;
