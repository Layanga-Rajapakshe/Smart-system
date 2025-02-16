import React from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip } from "@heroui/react";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrView } from "react-icons/gr";
import { useGetCompaniesQuery } from "../../redux/api/companyApiSlice"; // Import your API slice hook

export default function CompanyList() {
  const { data: companies, error, isLoading } = useGetCompaniesQuery(); // Fetch companies data
  const navigate = useNavigate();

  const handleEditClick = (companyId) => {
    navigate(`/companyedit/${companyId}`);
  };

  const handleViewClick = (companyId) => {
    navigate(`/companyview/${companyId}`);
  };

  const renderCell = React.useCallback((company, columnKey) => {
    switch (columnKey) {
      case "c_name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm">{company.c_name}</p>
          </div>
        );
      case "address":
        return (
          <div className="flex flex-col">
            <p className="text-sm">
              {`${company.address.number} ${company.address.street}, ${company.address.lane}`}
            </p>
          </div>
        );
      case "p_number":
        return <p className="text-sm">{company.p_number}</p>;
      case "actions":
        return (
          <div className="relative flex items-center justify-center gap-2">
            <Tooltip content="Details">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <GrView onClick={() => handleViewClick(company._id)} />
              </span>
            </Tooltip>
            <Tooltip content="Edit company">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <CiEdit onClick={() => handleEditClick(company._id)} />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete company">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <RiDeleteBin6Line />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return company[columnKey];
    }
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading companies</div>;

  return (
    <Table aria-label="Companies list">
      <TableHeader>
        <TableColumn key="c_name">Company Name</TableColumn>
        <TableColumn key="address">Address</TableColumn>
        <TableColumn key="p_number">Phone Number</TableColumn>
        <TableColumn key="actions" align="center">Actions</TableColumn>
      </TableHeader>
      <TableBody items={companies}>
        {(company) => (
          <TableRow key={company._id}>
            {(columnKey) => <TableCell>{renderCell(company, columnKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
