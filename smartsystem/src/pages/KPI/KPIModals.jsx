import React from "react";
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, Input, Select, SelectItem
} from "@heroui/react";

export const EditParameterModal = ({ 
  isOpen, 
  onClose, 
  parameter, 
  categories, 
  categoryThemes, 
  onUpdateField, 
  onSave 
}) => {
  if (!parameter) return null;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit KPI Parameter
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Select
                    label="Category"
                    placeholder="Select a category"
                    selectedKeys={parameter?.category ? [parameter.category] : []}
                    onChange={(e) => onUpdateField("category", e.target.value)}
                    className="w-full"
                    isDisabled
                  >
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.name} 
                        value={category.name}
                        startContent={<span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: categoryThemes[category.name]?.iconColor }} />}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Input
                    autoFocus
                    label="Parameter Name"
                    placeholder="Enter parameter name"
                    value={parameter?.name || ""}
                    onChange={(e) => onUpdateField("name", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    label="Weight (%)"
                    placeholder="Enter weight percentage"
                    value={parameter?.weight || ""}
                    onChange={(e) => onUpdateField("weight", Number(e.target.value))}
                    min={1}
                    max={100}
                    className="w-full"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button color="primary" onPress={onSave}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export const AddParameterModal = ({ 
  isOpen, 
  onClose, 
  parameter, 
  categories, 
  categoryThemes, 
  onUpdateField, 
  onSave,
  activeTab,
  onAddParameter
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add New KPI Parameter
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Select
                    label="Category"
                    placeholder="Select a category"
                    selectedKeys={parameter?.category ? [parameter.category] : []}
                    onChange={(e) => onUpdateField("category", e.target.value)}
                    className="w-full"
                  >
                    {categories.map((category) => (
                      <SelectItem 
                        key={category.name} 
                        value={category.name}
                        startContent={<span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: categoryThemes[category.name]?.iconColor }} />}
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Input
                    autoFocus
                    label="Parameter Name"
                    placeholder="Enter parameter name"
                    value={parameter?.name || ""}
                    onChange={(e) => onUpdateField("name", e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="number"
                    label="Weight (%)"
                    placeholder="Enter weight percentage"
                    value={parameter?.weight || ""}
                    onChange={(e) => onUpdateField("weight", Number(e.target.value))}
                    min={1}
                    max={100}
                    className="w-full"
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button color="primary" onPress={onSave}>
                Add Parameter
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};