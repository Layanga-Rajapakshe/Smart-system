import React from 'react';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import AttendanceDropzone from './AttendanceDropzone';
import { Button } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
    const navigate = useNavigate();

    const handleNewClick = () => {
        navigate('/viewattendence');
    };

    const breadcrumbItems = [
        { label: 'Attendance Menu', href: '/attendance', isCurrentPage: true }
    ];

    return (
        <div className="p-4 space-y-8">
            {/* Breadcrumb Navigation */}
            <GeneralBreadCrumb items={breadcrumbItems} />

            {/* Main Content Area */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
                {/* Attendance Section */}
                <div className="rounded-lg border border-gray-200 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                        <h1 className="text-xl font-semibold text-gray-700">Attendance</h1>
                        <Button color="primary" variant="flat" onClick={handleNewClick} aria-label="View Attendance">
                            View Attendance
                        </Button>
                    </div>
                    <div className="p-6">
                        <AttendanceDropzone />
                    </div>
                </div>

                {/* Calendar Section */}
                <div className="rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center p-6 border-b border-gray-100 bg-gray-50 rounded-t-lg">
                        <h1 className="text-xl font-semibold text-gray-700">My Calendar</h1>
                    </div>
                    <div className="p-4">
                        <iframe
                            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FColombo&bgcolor=%234285F4&showTitle=0&showNav=0&showPrint=0&showTabs=0&src=c21hcnRzeXN0ZW1hbGw2MjNAZ21haWwuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4ubGsjaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043"
                            style={{ border: '0', width: '100%', height: '400px' }}
                            title="Google Calendar"
                            aria-label="Google Calendar"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Attendance;
