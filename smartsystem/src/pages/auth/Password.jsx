import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Checkbox, Input, Link} from "@heroui/react";

export default function Password() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary">Check Password Change Here!</Button>
      <Modal 
        backdrop="blur"
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Change Your Password To Log In Again</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Old Password"
                  placeholder="Enter your Old password"
                  type="password"
                  variant="bordered"
                />
                <Input
                  label="New Password"
                  placeholder="Enter your New password"
                  type="password"
                  variant="bordered"
                />
                <Input
                  label="Re-enter New Password"
                  placeholder="Re-enter your New password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Change Password
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}