import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Spinner,
  Chip,
  Avatar,
  Divider,
  Breadcrumbs,
  BreadcrumbItem
} from "@heroui/react";
import { IoSend, IoArrowBack } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useGetChatHistoryQuery, useReplyToComplaintMutation } from "../../redux/api/salaryCalculationApiSlice";

const ComplaintMessaging = () => {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [replyText, setReplyText] = useState("");
  
  // Fetch chat history for the specific complaint
  const { 
    data: chatData, 
    isLoading: isLoadingChat, 
    refetch: refetchChat 
  } = useGetChatHistoryQuery(complaintId);
  
  // Mutation hook for replying to complaints
  const [replyToComplaint, { isLoading: isSendingReply }] = useReplyToComplaintMutation();

  // Scroll to bottom of messages when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [chatData?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    try {
      await replyToComplaint({
        complaintId,
        text: replyText
      }).unwrap();
      
      setReplyText("");
      refetchChat(); // Refresh chat history after sending a reply
    } catch (error) {
      console.error("Failed to send reply:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  // Safely get the last 6 characters of the ID or use a placeholder
  const getShortId = () => {
    if (!complaintId) return "N/A";
    return complaintId.length > 6 ? complaintId.slice(-6) : complaintId;
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem href="/dashboard">Dashboard</BreadcrumbItem>
        <BreadcrumbItem href="/complaints">All Complaints</BreadcrumbItem>
        <BreadcrumbItem>Complaint #{getShortId()}</BreadcrumbItem>
      </Breadcrumbs>
      
      <div className="mb-4">
        <Button
          color="primary"
          variant="light"
          onClick={() => navigate('/complaints')}
          startContent={<IoArrowBack />}
        >
          Back to Complaints
        </Button>
      </div>

      <Card className="w-full h-[80vh] flex flex-col">
        <CardHeader className="flex justify-between items-center px-6 py-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Salary Discrepancy Complaint</h2>
            <p className="text-default-500 text-sm">ID: {complaintId || "Loading..."}</p>
          </div>
          <Chip color="warning" variant="flat">
            {chatData?.messages?.length > 0 ? "Active" : "New"}
          </Chip>
        </CardHeader>

        <CardBody className="px-6 py-4 overflow-y-auto flex-grow">
          {isLoadingChat ? (
            <div className="flex justify-center items-center h-full">
              <Spinner size="lg" />
            </div>
          ) : chatData?.messages?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {chatData.messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.sender === "Admin" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.sender === "Admin"
                        ? "bg-primary text-white"
                        : "bg-default-100"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar
                        size="sm"
                        name={message.sender}
                        color={message.sender === "Admin" ? "primary" : "default"}
                      />
                      <span className="font-semibold">{message.sender}</span>
                    </div>
                    <p className="whitespace-pre-line">{message.text}</p>
                    <p className="text-xs mt-2 text-right opacity-70">
                      {message.createdAt ? formatDate(message.createdAt) : "Just now"}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          ) : (
            <div className="flex justify-center items-center h-full text-default-500">
              No messages in this complaint yet.
            </div>
          )}
        </CardBody>

        <Divider />
        
        <CardFooter className="p-4">
          <form onSubmit={handleSendReply} className="w-full flex gap-2">
            <Input
              fullWidth
              placeholder="Type your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              disabled={isSendingReply}
            />
            <Button
              color="primary"
              type="submit"
              isLoading={isSendingReply}
              isDisabled={!replyText.trim()}
              startContent={!isSendingReply && <IoSend />}
            >
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ComplaintMessaging;