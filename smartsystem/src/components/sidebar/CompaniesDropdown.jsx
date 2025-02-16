import React, { useState } from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Avatar,
} from "@heroui/react";
import { SlArrowDown } from "react-icons/sl";

const companies = [
  {
    name: "Facebook",
    location: "San Francisco, CA",
    logo: <Avatar name="Facebook" />,
    key: "1",
  },
  {
    name: "Instagram",
    location: "Austin, TX",
    logo: <Avatar name="Instagram" />,
    key: "2",
  },
  {
    name: "Twitter",
    location: "Brooklyn, NY",
    logo: <Avatar name="Twitter" />,
    key: "3",
  },
  {
    name: "Acme Co.",
    location: "Palo Alto, CA",
    logo: <Avatar name="Acme Co." />,
    key: "4",
  },
];

const CompaniesDropdown = () => {
  const [selectedCompany, setSelectedCompany] = useState(companies[3]);

  const handleSelectionChange = (key) => {
    const company = companies.find((c) => c.key === key);
    if (company) {
      setSelectedCompany(company);
    }
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex items-center justify-center gap-2 cursor-pointer">
          {selectedCompany.logo}
          <div className="flex flex-col">
            <h3 className="text-base font-medium text-default-900 m-0">
              {selectedCompany.name}
            </h3>
            <span className="text-xs text-default-500">
              {selectedCompany.location}
            </span>
          </div>
          <SlArrowDown className="text-default-400" />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Company selection"
        onAction={handleSelectionChange}
        className="w-[260px]"
      >
        <DropdownSection title="Companies">
          {companies.map((company) => (
            <DropdownItem
              key={company.key}
              startContent={company.logo}
              description={company.location}
            >
              {company.name}
            </DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CompaniesDropdown;