// src/components/ui/ConfirmationModal.tsx

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription, DialogClose } from './Dialog';
import { Button } from 'primereact/button';

type ConfirmationModalProps = {
    isOpen: boolean;
    title: string;
    description: React.ReactNode;
    onConfirm: () => void;
    onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    isOpen,
    title,
    description,
    onConfirm,
    onCancel
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onCancel(); }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {description}
                </DialogDescription>
                <DialogFooter>
                    <Button
                        label="No"
                        className="p-button-text p-3 mr-2"
                        onClick={onCancel}
                        style={{ backgroundColor: 'transparent', color: '#6B7280' }} // Gris claro
                    />
                    <Button
                        label="Sí"
                        className="p-button-danger p-3"
                        onClick={onConfirm}
                        style={{ backgroundColor: '#EF4444', borderColor: '#EF4444' }} // Rojo
                    />
                </DialogFooter>
                <DialogClose />
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
