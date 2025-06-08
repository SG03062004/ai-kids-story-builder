import React, { useEffect } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure
} from '@heroui/modal';
import Image from 'next/image';

function CustomLoader({ isLoading }: { isLoading: boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (isLoading) {
      onOpen();
    }
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <Modal
      backdrop="blur"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      classNames={{
        backdrop: "backdrop-blur-sm bg-black/30",
        base: "p-6 rounded-2xl bg-white shadow-2xl max-w-md mx-auto"
      }}
    >
      <ModalContent>
        <>
          <ModalHeader className="text-center text-2xl font-semibold text-[#5253A3]">
            Generating Your Story...
          </ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center gap-6">
            <Image
              src="/magic-hat.gif"
              alt="Loading..."
              width={150}
              height={150}
              className="animate-pulse"
            />
            <p className="text-lg text-center text-gray-600">
              Please wait while we bring your imagination to life! ✨
            </p>
          </ModalBody>
        </>
      </ModalContent>
    </Modal>
  );
}

export default CustomLoader;
