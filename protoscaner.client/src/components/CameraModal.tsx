// src/components/CameraModal.tsx

import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Button } from 'primereact/button';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { Image } from "@nextui-org/react";

type CameraModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (imageBase64: string) => void;
};

const CameraModal: React.FC<CameraModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const webcamRef = useRef<Webcam>(null);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

    const capturePhoto = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) setCapturedPhoto(imageSrc);
    };

    const confirmPhoto = () => {
        if (capturedPhoto) {
            onConfirm(capturedPhoto.split(',')[1]); // Enviar solo los datos base64
            onClose();
            setCapturedPhoto(null); // Reset para el siguiente uso
        }
    };

    const discardPhoto = () => setCapturedPhoto(null);

    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            style={{
                maxWidth: "500px", // Aumenta el ancho del modal
                width: "95vw",
                height: "auto",
                borderRadius: "15px",
                overflow: "hidden",
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader className="flex flex-col gap-1 text-center">
                            <h3 className="text-lg md:text-xl lg:text-2xl">Captura de Foto</h3>
                        </ModalHeader>
                        <ModalBody className="flex flex-col items-center justify-center">
                            {!capturedPhoto ? (
                                <Webcam
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-lg shadow-lg border-2 border-gray-700"
                                    videoConstraints={{ facingMode: "user" }}
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        height: "auto",
                                        borderRadius: "10px",
                                    }}
                                />
                            ) : (
                                <Image
                                    width="100%"
                                    height="auto"
                                    alt="Captured Image"
                                    src={capturedPhoto}
                                    className="rounded-lg shadow-lg border-2 border-gray-700"
                                    style={{ maxWidth: "400px", borderRadius: "10px" }}
                                />
                            )}
                        </ModalBody>
                        <ModalFooter className="flex flex-col items-center mt-4 gap-4">
                            {capturedPhoto ? (
                                <div className="flex gap-4">
                                    <Button
                                        icon="pi pi-check"
                                        className="p-button-rounded p-button-success"
                                        onClick={confirmPhoto}
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#4CAF50',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                                            width: '60px',
                                            height: '60px',
                                        }}
                                    />
                                    <Button
                                        icon="pi pi-times"
                                        className="p-button-rounded p-button-danger"
                                        onClick={discardPhoto}
                                        style={{
                                            borderRadius: '50%',
                                            backgroundColor: '#F44336',
                                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
                                            width: '60px',
                                            height: '60px',
                                        }}
                                    />
                                </div>
                            ) : (
                                <Button
                                    icon="pi pi-camera"
                                    onClick={capturePhoto}
                                    className="p-button-rounded p-button-secondary shadow-lg"
                                    style={{
                                        backgroundColor: '#2196F3',
                                        color: 'white',
                                        width: '80px',
                                        height: '80px',
                                        fontSize: '24px',
                                        borderRadius: '50%',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                />
                            )}
                            <Button
                                icon="pi pi-times"
                                onClick={onClose}
                                className="p-button-rounded p-button-secondary"
                                style={{
                                    position: 'absolute',
                                    top: '10px',
                                    right: '10px',
                                    backgroundColor: 'transparent',
                                    color: 'white',
                                    fontSize: '20px',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            />
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CameraModal;
