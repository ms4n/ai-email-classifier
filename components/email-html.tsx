"use client";

import React from "react";
import DOMPurify from "isomorphic-dompurify";

interface EmailHtmlProps {
  emailHtml: string;
}

const EmailHtml: React.FC<EmailHtmlProps> = ({ emailHtml }) => {
  const safeHTML = DOMPurify.sanitize(emailHtml);
  return (
    <div
      className="email-html-content"
      dangerouslySetInnerHTML={{ __html: safeHTML }}
    />
  );
};

export default EmailHtml;
