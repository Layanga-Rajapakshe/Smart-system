import React, { useState } from "react";
import { Card, Button, Image, Spacer, CircularProgress } from "@heroui/react";
import { useGetNotificationsQuery, useMarkNotificationsAsReadMutation } from "../../redux/api/notificationApiSlice";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import toast from "react-hot-toast";
import image1 from "../../assets/images/background1.png";  

const Notifications = () => {
  const [filterType, setFilterType] = useState("all"); // all, unread, read
  
  const { 
    data: notificationsData, 
    isLoading, 
    refetch: refetchNotifications 
  } = useGetNotificationsQuery();
  
  const [markNotificationsAsRead] = useMarkNotificationsAsReadMutation();

  const notifications = notificationsData?.notifications || [];
  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const filteredNotifications = notifications.filter(notification => {
    if (filterType === "all") return true;
    if (filterType === "unread") return !notification.isRead;
    if (filterType === "read") return notification.isRead;
    return true;
  });

  const breadcrumbItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Notifications", href: "/notifications", isCurrentPage: true },
  ];

  const handleMarkAllAsRead = async () => {
    try {
      await markNotificationsAsRead().unwrap();
      toast.success("All notifications marked as read");
      refetchNotifications();
    } catch (error) {
      toast.error("Failed to mark notifications as read");
    }
  };

  // Format notification time
  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <CircularProgress aria-label="Loading" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center p-6">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image src={image1} alt="Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>

      {/* Breadcrumb */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-3xl mt-20 mb-10">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-black">Notifications</h3>
            {unreadCount > 0 && (
              <Button
                color="primary"
                size="sm"
                onClick={handleMarkAllAsRead}
              >
                Mark All as Read
              </Button>
            )}
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={filterType === "all" ? "solid" : "flat"}
              color={filterType === "all" ? "primary" : "default"}
              onClick={() => setFilterType("all")}
              size="sm"
            >
              All ({notifications.length})
            </Button>
            <Button
              variant={filterType === "unread" ? "solid" : "flat"}
              color={filterType === "unread" ? "primary" : "default"}
              onClick={() => setFilterType("unread")}
              size="sm"
            >
              Unread ({unreadCount})
            </Button>
            <Button
              variant={filterType === "read" ? "solid" : "flat"}
              color={filterType === "read" ? "primary" : "default"}
              onClick={() => setFilterType("read")}
              size="sm"
            >
              Read ({notifications.length - unreadCount})
            </Button>
          </div>

          <Spacer y={2} />

          {/* Notifications List */}
          <div className="space-y-3">
            {filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                No notifications found.
              </div>
            ) : (
              filteredNotifications.map((notification, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border ${!notification.isRead 
                    ? "bg-blue-50 border-blue-200" 
                    : "bg-white/70 border-gray-200"}`}
                >
                  <div className="flex flex-col">
                    <div className="font-medium text-black">
                      {notification.message}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {formatNotificationTime(notification.createdAt)}
                    </div>
                    {notification.actionLink && (
                      <div className="mt-2">
                        <Button 
                          size="sm" 
                          color="primary" 
                          variant="flat" 
                          onClick={() => window.location.href = notification.actionLink}
                        >
                          View Details
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Notifications;