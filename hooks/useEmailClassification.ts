import { useState } from "react";
import { LabeledEmailResponse } from "@/types";

interface EmailClassificationResult {
  classifyEmails: (emailData: EmailData[]) => Promise<LabeledEmailResponse[]>;
  loading: boolean;
  error: string | null;
}

interface EmailData {
  emailSnippet: string;
  emailSubject: string;
}

const useEmailClassification = (): EmailClassificationResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const classifyEmails = async (
    emailData: EmailData[]
  ): Promise<LabeledEmailResponse[]> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classify-emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emails: emailData }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error response:", errorResponse);
        throw new Error("Failed to classify emails");
      }

      const data = await response.json();

      if (!data.labeledEmails || !Array.isArray(data.labeledEmails)) {
        throw new Error("Invalid response format");
      }

      setLoading(false);
      return data.labeledEmails;
    } catch (error) {
      console.error("Error classifying emails:", error);
      setError("Failed to classify emails");
      setLoading(false);
      return [];
    }
  };

  return { classifyEmails, loading, error };
};

export default useEmailClassification;
