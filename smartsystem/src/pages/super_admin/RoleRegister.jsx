import React, { useState } from 'react';
import { Input, Button, Image, Checkbox, Spacer } from '@nextui-org/react';
import { useCreateRoleMutation } from '../../redux/api/roleApiSlice'; // Import your mutation hook
import image1 from '../../assets/images/companyRegister.png';
import GeneralBreadCrumb from '../../components/GeneralBreadCrumb';

const RoleRegister = () => {
    const [roleName, setRoleName] = useState("");
    const [permissions, setPermissions] = useState({
        create: false,
        read: false,
        update: false,
        delete: false,
    });
    
    // Use mutation hook
    const [createRole, { isLoading, isError, isSuccess }] = useCreateRoleMutation();

    const handlePermissionChange = (event) => {
        const { name, checked } = event.target;
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [name]: checked,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const roleData = {
            name: roleName,
            permissions: Object.keys(permissions).filter((perm) => permissions[perm]),
        };

        try {
            await createRole(roleData).unwrap(); // Trigger the mutation and unwrap the result
            // Handle success (e.g., show a success message, clear the form, navigate)
            if (isSuccess) {
                console.log("Role registered successfully!");
            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error registering role:", error);
        }
    };

    const breadcrumbItems = [
        { label: 'Role Menu', href: '/role' },
        { label: 'Role Register', href: '/roleregister', isCurrentPage: true }
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
                            alt='Login page image'
                        />
                    </div>

                    <div className='text-center text-[25px] font-bold mb-6'>Role Register</div>

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
                        <Button type='submit' variant='flat' color='primary' disabled={isLoading}>
                            {isLoading ? 'Registering...' : 'Register'}
                        </Button>
                    </form>

                    {isError && <p className="text-red-500">Error registering role. Please try again.</p>}
                    {isSuccess && <p className="text-green-500">Role registered successfully!</p>}
                </div>

                <div className='hidden md:flex flex-1 items-center justify-center p-6'>
                    <div className='w-full h-full flex items-center justify-center'>
                        <Image
                            isBlurred
                            className='w-full h-full object-fill'
                            src={image1}
                            alt='Register page image'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RoleRegister;
