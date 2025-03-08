import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, Image, Card, Spinner } from "@heroui/react";
import image1 from "../../assets/images/background1.png";
import GeneralBreadCrumb from "../../components/GeneralBreadCrumb";
import { useCreateCompanyMutation } from "../../redux/api/companyApiSlice";
import { toast } from "react-hot-toast";

const CompanyRegister = () => {
  const navigate = useNavigate();
  const [createCompany, { isLoading }] = useCreateCompanyMutation();

  const [companyName, setCompanyName] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [lane, setLane] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCompanyData = {
      c_name: companyName,
      address: { street, number, lane },
      p_number: phoneNumber,
    };

    try {
      await createCompany(newCompanyData).unwrap();
      toast.success("New Company Registered Successfully");
      setCompanyName("");
      setStreet("");
      setNumber("");
      setLane("");
      setPhoneNumber("");
      navigate('/company');
      window.location.reload();
    } catch (err) {
      toast.error(err?.data?.message || "Company Registration Failed");
    }
  };

  const breadcrumbItems = [
    { label: "Companies Menu", href: "/company" },
    { label: "Company Register", href: "/companyregister", isCurrentPage: true },
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0 rounded-xl">
        <Image
          src={image1}
          alt="Background"
          className="inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
      </div>


  
      {/* Breadcrumb with better positioning */}
      <div className="absolute top-6 left-6 z-10">
        <GeneralBreadCrumb items={breadcrumbItems} />
      </div>
  
      {/* Form Card Container */}
      <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl mt-20">
        <Card className="p-6 sm:p-8 shadow-2xl bg-white/80 backdrop-blur-md rounded-2xl border border-white/40">
          <h3 className="text-2xl font-bold text-center text-black mb-4">Company Registration</h3>
  
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Company Name"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              required
              variant="bordered"
              fullWidth
              className="py-2"
            />
  
            {/* Address Section */}
            <div>
              <div className="text-lg font-semibold mb-2 text-black">Address Information</div>
              <Input
                label="Street"
                placeholder="Enter street name"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                required
                variant="bordered"
                fullWidth
                className="py-2"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  label="Number"
                  placeholder="Street number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                  variant="bordered"
                  className="w-full sm:w-1/2 py-2"
                />
                <Input
                  label="Lane"
                  placeholder="Lane information"
                  value={lane}
                  onChange={(e) => setLane(e.target.value)}
                  required
                  variant="bordered"
                  className="w-full sm:w-1/2 py-2"
                />
              </div>
            </div>
  
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              pattern="\d{10}"
              description="Enter a valid 10-digit phone number"
              variant="bordered"
              fullWidth
              className="py-2"
            />
  
            <div className="flex justify-center mt-4">
              <Button type="submit" color="primary" size="lg" disabled={isLoading} className="px-8 py-3">
                {isLoading ? (
                  <>
                    <Spinner size="sm" color="currentColor" className="mr-2" />
                    Registering...
                  </>
                ) : (
                  "Register Company"
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
  
};

export default CompanyRegister;