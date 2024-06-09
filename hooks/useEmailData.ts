import { useState, useEffect } from "react";

import { Email } from "@/types";

const useEmailData = (emailCount: Number) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-emails?count=${emailCount}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch emails");
        }

        const data: Email[] = await response.json();
        setEmails(data);
        setLoading(false);

        // Store the fetched emails in localStorage
        localStorage.setItem("emails", JSON.stringify(data));
      } catch (error: unknown) {
        // Type assertion for the error message
        const errorMessage =
          error instanceof Error ? error.message : String(error);
        setError(errorMessage);
        setLoading(false);
      }
    };
    fetchEmails();
  }, [emailCount]);

  return { emails, setEmails, loading, error };
};

export default useEmailData;
