"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import EmailHtml from "./email-html";
import useWindowSize from "@/hooks/useWindowSize";
import { EmailDrawerProps, isLabeledEmail } from "@/types";

const EmailDrawer: React.FC<EmailDrawerProps> = ({
  isOpen,
  onClose,
  emailData,
}) => {
  const { emailFrom, emailSubject, emailBodyHtml } = emailData;
  let emailLabel: string | undefined;

  // Check if the email is labeled
  if (isLabeledEmail(emailData)) {
    emailLabel = emailData.emailLabel;
  }

  const isMobile = useWindowSize();

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
              <div className="flex justify-between items-center text-sm font-semibold">
                <div className="flex flex-col gap-2 mb-4">
                  <p>{emailFrom}</p>
                  <p>{emailSubject}</p>
                </div>

                {emailLabel && (
                  <p className="px-2.5 py-0.5 mx-2 rounded-full text-white bg-green-500">
                    {emailLabel}
                  </p>
                )}
              </div>
            </SheetTitle>
            <div className="flex items-center justify-center">
              <EmailHtml emailHtml={emailBodyHtml} />
            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EmailDrawer;
