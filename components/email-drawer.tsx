"use client";

import { useState, useEffect } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface EmailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  emailData: {
    senderName: string;
    emailLabel: string;
    emailContent: string;
  };
}

const EmailDrawer: React.FC<EmailDrawerProps> = ({
  isOpen,
  onClose,
  emailData,
}) => {
  const { senderName, emailLabel, emailContent } = emailData;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent
          className={`px-8 py-10 ${
            isMobile ? "max-h-3/4" : "max-h-screen"
          } overflow-auto`}
          side={`${isMobile ? "bottom" : "right"}`}
        >
          <SheetHeader>
            <SheetTitle>
              <div className="flex justify-between items-center font-semibold">
                <p className="text-base">{senderName}</p>
                <p className="px-2.5 py-0.5 rounded-full text-white bg-green-500 text-sm">
                  {emailLabel}
                </p>
              </div>
            </SheetTitle>
            <SheetDescription>
              <p className="mb-4">{emailContent}</p>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EmailDrawer;
