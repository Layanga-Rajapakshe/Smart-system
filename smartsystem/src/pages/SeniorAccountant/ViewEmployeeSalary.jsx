import React from 'react';
import { Table, Image } from '@nextui-org/react';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';
import image1 from '../../assets/images/companyRegister.png';

const ViewEmployeeSalary = ({ employee }) => {
  const breadcrumbItems = [
    { label: 'Employee Menu', href: '/employee' },
    { label: 'View Salary', href: '/employeeview', isCurrentPage: true },
  ];

  // Example employee salary data (replace with actual data from props or API call)
  const salaryDetails = employee || {
    agreed_basic: 50000,
    re_allowance: 10000,
    single_ot: 200,
    double_ot: 400,
    meal_allowance: 5000,
  };

  return (
    <div>
      <GeneralBreadCrumb items={breadcrumbItems} />
      <div className="flex h-screen overflow-hidden">
        <div className="flex-1 flex-col flex items-center justify-center p-6">
          <div className="md:hidden absolute left-0 right-0 bottom-0 top-0 z-0">
            <Image
              isBlurred
              className="w-full h-screen/2 fill-inherit"
              src="https://nextui.org/gradients/docs-right.png"
              alt="Background image"
            />
          </div>

          <div className="text-center text-[25px] font-bold mb-6">Employee Salary Details</div>

          <Table
            bordered
            shadow={false}
            aria-label="Employee Salary Details"
            css={{ minWidth: "50%", marginTop: "1rem" }}
          >
            <Table.Header>
              <Table.Column>Salary Component</Table.Column>
              <Table.Column>Amount</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Agreed Basic</Table.Cell>
                <Table.Cell>{salaryDetails.agreed_basic}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>RE Allowance</Table.Cell>
                <Table.Cell>{salaryDetails.re_allowance}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Single OT</Table.Cell>
                <Table.Cell>{salaryDetails.single_ot}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Double OT</Table.Cell>
                <Table.Cell>{salaryDetails.double_ot}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Meal Allowance</Table.Cell>
                <Table.Cell>{salaryDetails.meal_allowance}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>

        <div className="hidden md:flex flex-1 items-center justify-center p-6">
          <div className="w-full h-full flex items-center justify-center">
            <Image
              isBlurred
              className="w-full h-full object-fill"
              src={image1}
              alt="Salary Details"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeSalary;
