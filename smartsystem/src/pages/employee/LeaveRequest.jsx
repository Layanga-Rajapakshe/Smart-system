import React, { useState } from 'react';
import { Input, Button, Textarea, DatePicker, Image } from '@nextui-org/react';
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
// import { useCreateLeaveRequestMutation } from '../../redux/api/leaveApiSlice'; 
import { toast } from 'react-hot-toast';

const LeaveRequest = () => {
  const [createLeaveRequest, { isLoading }] = useCreateLeaveRequestMutation();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newLeaveRequestData = {
      start_date: startDate,
      end_date: endDate,
      reason,
      leave_type: leaveType,
    };

    try {
      await createLeaveRequest(newLeaveRequestData).unwrap();
      toast.success("Leave Request Submitted Successfully");
      // Clear form fields after successful submission
      setStartDate("");
      setEndDate("");
      setReason("");
      setLeaveType("");
    } catch (err) {
      toast.error(err?.data?.message || "Leave Request Submission Failed");
    }
  };

  const breadcrumbItems = [
    { label: 'My Dashboard', href: '/MyDashboard' },
    { label: 'My Leave', href: '/leave', isCurrentPage: true }
  ];

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className='flex h-screen overflow-hidden'>
        <div className='flex-1 flex-col flex items-center justify-center p-6 relative'>
          <div className='md:hidden absolute inset-0 z-0'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src="https://nextui.org/gradients/docs-right.png"
              alt='Leave request page background'
            />
          </div>

          <div className='text-center text-[25px] font-bold mb-6 z-10'>Leave Request</div>

          <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-4 mb-4 z-10'>
            <DatePicker
              label='Start Date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
            <DatePicker
              label='End Date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
            
            <Input
              variant='bordered'
              label='Leave Type'
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              required
            />

            <Textarea
              variant='bordered'
              label='Reason for Leave'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              placeholder="Provide the reason for your leave"
            />

            <Button type='submit' color='primary' disabled={isLoading}>
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </Button>
          </form>
        </div>

        <div className='hidden md:flex flex-1 items-center justify-center p-6'>
          <div className='w-full h-full flex items-center justify-center'>
            <Image
              isBlurred
              className='w-full h-full object-cover'
              src={image1}
              alt='Leave request page image'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveRequest;
