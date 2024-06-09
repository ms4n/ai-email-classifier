import { useState } from "react";
import { LabeledEmailResponse } from "@/types";
import { useToast } from "@/components/ui/use-toast";

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

  const { toast } = useToast();

  const classifyEmails = async (
    emailData: EmailData[]
  ): Promise<LabeledEmailResponse[]> => {
    try {
      setLoading(true);
      setError(null);

      const storedApiKey = localStorage.getItem("openAiApiKey");
      if (!storedApiKey) {
        throw new Error("API key not found in localStorage");
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classify-emails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emails: emailData,
            openAiApiKey: storedApiKey,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Server error response:", errorResponse);
        throw new Error(errorResponse.error || "Failed to classify emails");
      }

      const data = await response.json();

      if (!data.labeledEmails || !Array.isArray(data.labeledEmails)) {
        throw new Error("Invalid response format");
      }

      setLoading(false);
      return data.labeledEmails;
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error.message,
      });
      console.error("Error classifying emails:", error);
      setError("Failed to classify emails");
      setLoading(false);
      return [];
    }
  };

  return { classifyEmails, loading, error };
};

export default useEmailClassification;
