import React from 'react';
import { Breadcrumbs, BreadcrumbItem, Link } from "@heroui/react";

const GeneralBreadcrumb = ({ items }) => {
  return (
    <Breadcrumbs className='py-4'>
      {items.map((item, index) => (
        <BreadcrumbItem key={index} isCurrentPage={item.isCurrentPage}>
          <Link href={item.href}>{item.label}</Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumbs>
  );
};

export default GeneralBreadcrumb;
