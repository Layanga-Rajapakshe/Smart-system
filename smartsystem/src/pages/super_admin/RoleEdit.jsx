import React, { useState, useEffect } from 'react';
import image1 from '../../assets/images/companyEdit.jpeg';
import { Input, Button, Image, Checkbox, Spacer } from '@nextui-org/react';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const RoleEdit = () => {
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState({
        create: false,
        read: false,
        update: false,
        delete: false,
    });

    // Simulate fetching role data (you would replace this with an API call)
    useEffect(() => {
        const fetchRoleData = async () => {
            // Fetch the role data from the API and set state
            const roleData = {
                name: "Manager", // This should come from your API
                permissions: ["create", "read"], // Example permissions
            };
            setRoleName(roleData.name);
            setPermissions((prev) => {
                return {
                    create: roleData.permissions.includes("create"),
                    read: roleData.permissions.includes("read"),
                    update: roleData.permissions.includes("update"),
                    delete: roleData.permissions.includes("delete"),
                };
            });
        };

        fetchRoleData();
    }, []);

    const handlePermissionChange = (event) => {
        const { name, checked } = event.target;
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [name]: checked,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const roleData = {
            name: roleName,
            permissions: Object.keys(permissions).filter((perm) => permissions[perm]),
        };
        // Handle the role editing logic here (e.g., send roleData to your API)
        console.log("Edited Role Data:", roleData);
    };

    const breadcrumbItems = [
        { label: 'Role Menu', href: '/role' },
        { label: 'Role Edit', href: '/roleedit', isCurrentPage: true }
    ];

    return (
        <div>
            <GeneralBreadCrumb items={breadcrumbItems} />
            <div className='flex h-screen overflow-hidden'>
                <div className='flex-1 flex-col flex items-center justify-center p-6'>
                    <div className='md:hidden absolute left-0 right-0 bottom-0 top-0 z-0'>
                        <Image
                            isBlurred
                            className='w-full h-screen/2 fill-inherit'
                            src="https://nextui.org/gradients/docs-right.png"
                            alt='Edit page background'
                        />
                    </div>

                    <div className='text-center text-[25px] font-bold mb-6'>Role Edit</div>

                    <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-4 mb-4'>
                        <Input
                            variant='bordered'
                            label='Role Name'
                            type='text'
                            value={roleName}
                            onChange={(e) => setRoleName(e.target.value)}
                            required
                        />
                        <div className='flex flex-col'>
                            <div className='text-lg font-semibold'>Permissions:</div>
                            <Checkbox
                                name='create'
                                isSelected={permissions.create}
                                onChange={handlePermissionChange}
                            >
                                Create
                            </Checkbox>
                            <Checkbox
                                name='read'
                                isSelected={permissions.read}
                                onChange={handlePermissionChange}
                            >
                                Read
                            </Checkbox>
                            <Checkbox
                                name='update'
                                isSelected={permissions.update}
                                onChange={handlePermissionChange}
                            >
                                Update
                            </Checkbox>
                            <Checkbox
                                name='delete'
                                isSelected={permissions.delete}
                                onChange={handlePermissionChange}
                            >
                                Delete
                            </Checkbox>
                        </div>
                        <Spacer y={1} />
                        <Button type='submit' variant='flat' color='primary'>
                            Save Changes
                        </Button>
                    </form>

                </div>

                <div className='hidden md:flex flex-1 items-center justify-center p-6'>
                    <div className='w-full h-full flex items-center justify-center'>
                        <Image
                            isBlurred
                            className='w-full h-full object-fill'
                            src={image1}
                            alt='Edit page image'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoleEdit;
