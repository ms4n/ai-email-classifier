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
}

const EmailDrawer: React.FC<EmailDrawerProps> = ({ isOpen, onClose }) => {
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
                <p className="text-base">Sanjay M</p>
                <p className="px-2.5 py-0.5 rounded-full text-white bg-green-500 text-sm">
                  Important
                </p>
              </div>
            </SheetTitle>
            <SheetDescription>
              <p className="mb-4">Hi Emily,</p>
              <p className="mb-4">
                Thanks for your order. We are pleased to inform you that your
                order has been shipped. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Aliquam auctor mattis tristique. Orci varius
                natoque penatibus et magnis dis parturient montes, nascetur
                ridiculus mus. Nulla malesuada tortor vitae justo condimentum
                auctor. Donec venenatis arcu vitae tellus finibus porta.
                Praesent volutpat mattis euismod. Donec elit lectus, vestibulum
                sed metus id, laoreet pharetra mi. Duis enim mauris,
                sollicitudin nec erat ac, aliquam viverra mi. Proin pretium
                maximus imperdiet. Thanks for your order. We are pleased to
                inform you that your order has been shipped. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit. Aliquam auctor mattis
                tristique. Orci varius natoque penatibus et magnis dis
                parturient montes, nascetur ridiculus mus. Nulla malesuada
                tortor vitae justo condimentum auctor. Donec venenatis arcu
                vitae tellus finibus porta. Praesent volutpat mattis euismod.
                Donec elit lectus, vestibulum sed metus id, laoreet pharetra mi.
                Duis enim mauris, sollicitudin nec erat ac, aliquam viverra mi.
                Proin pretium maximus imperdiet.
              </p>
              <p className="mb-4">
                Please let me know if you have any questions.
              </p>
              <p>
                Best,
                <br />
                Support
                <br />
                Marvel
              </p>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EmailDrawer;
