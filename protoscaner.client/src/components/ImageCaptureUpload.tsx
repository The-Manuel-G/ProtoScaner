// src/components/ImageCaptureUpload.tsx

import React, { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { ProgressBar } from 'primereact/progressbar';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import Webcam from 'react-webcam';

type ImageCaptureUploadProps = {
    onImageSelect: (imageBase64: string) => void; // Function to send image data
    label?: string; // Customizable label
    fileName?: string; // File input name attribute
    captureIcon?: string; // Icon for capture button
    discardIcon?: string; // Icon for discard button
    captureButtonStyle?: React.CSSProperties; // Style for capture button
    discardButtonStyle?: React.CSSProperties; // Style for discard button
};

const ImageCaptureUpload: React.FC<ImageCaptureUploadProps> = ({
    onImageSelect,
    label = 'Imagen', // Default label
    fileName = 'file', // Default file input name
    captureIcon = 'pi pi-camera', // Default icon for capture
    discardIcon = 'pi pi-trash', // Default icon for discard
    captureButtonStyle = { backgroundColor: '#2196F3', color: 'white' }, // Default style for capture button
    discardButtonStyle = { color: 'red' } // Default style for discard button
}) => {
    const [isCameraModalOpen, setCameraModalOpen] = useState(false);
    const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
    const [totalSize, setTotalSize] = useState(0);
    const [isDragOver, setIsDragOver] = useState(false);
    const webcamRef = useRef<Webcam>(null);

    // Handle file upload
    const onFileSelect = (e: FileUploadSelectEvent) => {
        const file = e.files[0];
        processFile(file);
    };

    // Handle drag and drop
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => {
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            processFile(file);
        }
    };

    // Process file and convert to base64
    const processFile = (file: File) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.result) {
                    const base64Image = reader.result.toString().split(',')[1];
                    setCapturedPhoto(`data:image/jpeg;base64,${base64Image}`);
                    setTotalSize(file.size);
                    onImageSelect(base64Image); // Sends only the base64 content
                }
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle camera capture
    const capturePhoto = () => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            const base64Image = imageSrc.split(',')[1];
            setCapturedPhoto(imageSrc);
            setTotalSize(base64Image.length * 0.75); // Estimation of file size
            onImageSelect(base64Image); // Sends only the base64 content
            setCameraModalOpen(false);
        }
    };

    // Discard the current image
    const discardPhoto = () => {
        setCapturedPhoto(null);
        setTotalSize(0);
        onImageSelect('');
    };

    return (
        <div className="flex flex-col items-center w-full max-w-sm space-y-4">
            <label className="block text-lg font-semibold text-gray-700">{label}</label>

            <div
                className={`border rounded-lg p-4 w-full shadow-sm mb-4 transition-shadow ${isDragOver ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <FileUpload
                    name={fileName}
                    accept="image/*"
                    maxFileSize={10000000}
                    onSelect={onFileSelect}
                    chooseOptions={{ icon: 'pi pi-upload', className: 'p-button-rounded p-button-info', label: 'Subir' }}
                    cancelOptions={{ icon: 'pi pi-times', className: 'p-button-rounded p-button-danger', style: discardButtonStyle }}
                    className="w-full"
                />
                <p className="text-center mt-2 text-gray-500 text-sm">O arrastra y suelta una imagen aquí</p>
            </div>

            <div className="flex items-center justify-center w-full space-x-4">
                <Button
                    icon={captureIcon}
                    className="p-button-rounded p-button-secondary"
                    onClick={() => setCameraModalOpen(true)}
                    style={{ ...captureButtonStyle, padding: '0.75rem', fontSize: '1.25rem' }}
                    tooltip="Capturar con cámara"
                />
            </div>

            {capturedPhoto && (
                <div className="relative border border-gray-300 rounded-lg p-4 shadow-md mb-4 w-full flex flex-col items-center">
                    <img src={capturedPhoto} alt="Preview" className="rounded-lg w-48 h-48 object-cover mb-2 shadow-sm" />
                    <Button
                        icon={discardIcon}
                        label="Eliminar"
                        className="p-button-danger p-button-rounded mt-2"
                        onClick={discardPhoto}
                    />
                </div>
            )}

            <ProgressBar value={(totalSize / 10000) * 10} showValue={false} className="w-full mt-2" />

            {/* Camera Modal */}
            <Modal
                isOpen={isCameraModalOpen}
                onOpenChange={() => setCameraModalOpen(false)}
                style={{
                    maxWidth: "450px",
                    width: "90vw",
                    height: "auto",
                    borderRadius: "12px",
                    overflow: "hidden",
                }}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1 text-center bg-blue-600 text-white rounded-t-lg p-3">
                                <h3 className="text-lg font-semibold">Captura de Foto</h3>
                            </ModalHeader>
                            <ModalBody className="flex flex-col items-center justify-center bg-gray-100 p-4 rounded-b-lg">
                                <Webcam
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="rounded-lg shadow-lg border border-gray-400"
                                    videoConstraints={{ facingMode: "user" }}
                                    style={{
                                        width: "100%",
                                        maxWidth: "400px",
                                        height: "auto",
                                        borderRadius: "10px",
                                    }}
                                />
                            </ModalBody>
                            <ModalFooter className="flex justify-center bg-gray-100 p-4 rounded-b-lg space-x-4">
                                <Button
                                    icon={captureIcon}
                                    onClick={capturePhoto}
                                    className="p-button-rounded p-button-success shadow-md"
                                    style={{
                                        backgroundColor: '#4CAF50',
                                        color: 'white',
                                        width: '70px',
                                        height: '70px',
                                        fontSize: '24px',
                                        borderRadius: '50%',
                                    }}
                                    tooltip="Capturar"
                                />
                                <Button
                                    icon="pi pi-times"
                                    onClick={() => setCameraModalOpen(false)}
                                    className="p-button-rounded p-button-secondary shadow-md"
                                    style={{
                                        backgroundColor: 'transparent',
                                        color: 'gray',
                                        fontSize: '20px',
                                    }}
                                    tooltip="Cerrar"
                                />
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ImageCaptureUpload;
