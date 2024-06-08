import React from "react";

interface EmailCardProps {
  onClick: () => void;
  emailData: {
    senderName: string;
    emailLabel: string;
    emailContent: string;
  };
}

const EmailCard: React.FC<EmailCardProps> = ({ onClick, emailData }) => {
  const { senderName, emailLabel, emailContent } = emailData;
  return (
    <div
      onClick={onClick}
      className="rounded-lg border bg-card shadow-sm w-full text-sm p-8"
    >
      <div className="flex justify-between items-center font-semibold">
        <p className="text-base">{senderName}</p>
        <p className="px-2.5 py-0.5 rounded-full text-white bg-green-500">
          {emailLabel}
        </p>
      </div>

      <p className="pt-6 line-clamp-3 text-muted-foreground">{emailContent}</p>
    </div>
  );
};

export default EmailCard;
