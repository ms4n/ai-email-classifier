import React from "react";

import { EmailCardProps, isLabeledEmail } from "@/types";
import { redirect } from "next/dist/server/api-utils";

const labelColorMap: { [key: string]: string } = {
  Important: "bg-green-500",
  Marketing: "bg-yellow-500",
  Spam: "bg-red-500",
  Promotions: "bg-blue-500",
  Social: "bg-teal-500",
  General: "bg-orange-500",
};

const EmailCard: React.FC<EmailCardProps> = ({ onClick, emailData }) => {
  const { emailFrom, emailSubject, emailSnippet } = emailData;
  let emailLabel: string | undefined;
  let labelClassName: string = "";

  if (isLabeledEmail(emailData)) {
    emailLabel = emailData.emailLabel;
    labelClassName = labelColorMap[emailLabel] || "bg-gray-500";
  }

  return (
    <div
      onClick={onClick}
      className="rounded-lg border bg-card shadow-sm w-full text-sm p-4 sm:p-8"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        <p className="text-base font-semibold">{emailFrom}</p>

        {emailLabel && (
          <p
            className={`px-2.5 py-0.5 rounded-full text-white ${labelClassName} w-fit`}
          >
            {emailLabel}
          </p>
        )}
      </div>

      <p className="pt-4 sm:pt-6 text-muted-foreground">{`${emailSnippet}...`}</p>
    </div>
  );
};

export default EmailCard;

// important: green bg-green-500
// marketing: yellow bg-yellow-500
// spam: red bg-red-500
//promotions : BLue bg-blue-500
// Social : Teal bg-teal-500
//Genral : Orange bg-orange-500
