import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Avatar,
} from "@nextui-org/react";
import { SlArrowDown } from "react-icons/sl";

const companies = [
  {
    name: "Facebook",
    location: "San Francisco, CA",
    logo: <Avatar name="Company" />,
    key: "1",
  },
  {
    name: "Instagram",
    location: "Austin, TX",
    logo: <Avatar name="Company" />,
    key: "2",
  },
  {
    name: "Twitter",
    location: "Brooklyn, NY",
    logo: <Avatar name="Company" />,
    key: "3",
  },
  {
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <Avatar name="Company" />,
    key: "4",
  },
];

const CompaniesDropdown = () => {
  const [company, setCompany] = useState(companies[3]);

  const handleAction = (key) => {
    const selectedCompany = companies.find((company) => company.key === key);
    if (selectedCompany) {
      setCompany(selectedCompany);
    }
  };

  return (
    <div>
      <Dropdown
        classNames={{
          base: "w-full min-w-[260px]",
        }}
      >
        <DropdownTrigger className="cursor-pointer">
          <div className="flex items-center gap-2">
            {company.logo}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                {company.name}
              </h3>
              <span className="text-xs font-medium text-default-500">
                {company.location}
              </span>
            </div>
            <SlArrowDown />
          </div>
        </DropdownTrigger>
        <DropdownMenu onAction={handleAction} aria-label="Avatar Actions">
          <DropdownSection title="Companies">
            {companies.map((company) => (
              <DropdownItem
                key={company.key}
                startContent={company.logo}
                description={company.location}
                classNames={{
                  base: "py-4",
                  title: "text-base font-semibold",
                }}
              >
                {company.name}
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default CompaniesDropdown;
