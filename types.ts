export interface User {
  name: string;
  email: string;
  picture: string;
}

export interface Email {
  emailFrom: string;
  emailSnippet: string;
  emailSubject: string;
  emailBodyHtml: string;
}

export interface EmailCardProps {
  onClick: () => void;
  emailData: Email | LabeledEmail; // Accepts both types of emails
}

export interface EmailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  emailData: Email | LabeledEmail; // Accepts both types of emails
}

export interface LabeledEmail extends Email {
  emailLabel: string;
}

export function isLabeledEmail(
  email: Email | LabeledEmail
): email is LabeledEmail {
  return (email as LabeledEmail).emailLabel !== undefined;
}

export interface LabeledEmailResponse {
  label: string;
}
