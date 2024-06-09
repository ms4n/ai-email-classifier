import React from "react";

import { EmailCardProps, isLabeledEmail } from "@/types";

const EmailCard: React.FC<EmailCardProps> = ({ onClick, emailData }) => {
  const { emailFrom, emailSubject, emailSnippet } = emailData;
  let emailLabel: string | undefined;

  // Check if the email is labeled
  if (isLabeledEmail(emailData)) {
    emailLabel = emailData.emailLabel;
  }

  return (
    <div
      onClick={onClick}
      className="rounded-lg border bg-card shadow-sm w-full text-sm p-8"
    >
      <div className="flex justify-between items-center font-semibold">
        <p className="text-base">{emailFrom}</p>

        {emailLabel && (
          <p className="px-2.5 py-0.5 rounded-full text-white bg-green-500">
            {emailLabel}
          </p>
        )}
      </div>

      <p className="pt-6 text-muted-foreground">{`${emailSnippet}...`}</p>
    </div>
  );
};

export default EmailCard;
