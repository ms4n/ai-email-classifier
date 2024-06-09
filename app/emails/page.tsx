"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import EmailCard from "@/components/email-card";
import EmailDrawer from "@/components/email-drawer";
import EmailSkeleton from "@/components/email-skeleton";

import ProtectedRoute from "@/components/protected-route";

import useLogout from "@/hooks/useLogout";
import useWindowSize from "@/hooks/useWindowSize";
import useUserData from "@/hooks/useUserData";
import useEmailData from "@/hooks/useEmailData";
import useEmailClassification from "@/hooks/useEmailClassification";

import { Email, LabeledEmail, LabeledEmailResponse } from "@/types";

const EmailDashboard = () => {
  const handleLogout = useLogout();
  const isMobile = useWindowSize();
  const userData = useUserData();
  const [emailCount, setEmailCount] = useState(15);
  const { emails, setEmails, loading } = useEmailData(emailCount);
  const { classifyEmails, loading: classificationLoading } =
    useEmailClassification();

  const numberOfEmails = Array.from({ length: 15 }, (_, i) => i + 1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | LabeledEmail>({
    emailFrom: "",
    emailSnippet: "",
    emailSubject: "",
    emailBodyHtml: "",
    emailLabel: "",
  });

  useEffect(() => {
    loadEmailsFromLocalStorage();
  }, [emailCount]);

  const loadEmailsFromLocalStorage = () => {
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      const localEmails: Email[] = JSON.parse(storedEmails);
      setEmails(localEmails);
    }
  };

  const handleClassifyEmails = async () => {
    try {
      const emailData = getEmailDataFromLocalStorage();
      const labeledEmails = await classifyEmails(emailData);
      updateEmailsInLocalStorage(labeledEmails);
      loadEmailsFromLocalStorage();
    } catch (error) {
      console.error("Error classifying emails:", error);
    }
  };

  const getEmailDataFromLocalStorage = () => {
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      const emails: Email[] = JSON.parse(storedEmails);
      return emails.map(({ emailSnippet, emailSubject }) => ({
        emailSnippet,
        emailSubject,
      }));
    }
    return [];
  };

  const updateEmailsInLocalStorage = (
    labeledEmails: LabeledEmailResponse[]
  ) => {
    const storedEmails = localStorage.getItem("emails");
    if (storedEmails) {
      const emails: Email[] = JSON.parse(storedEmails);

      if (emails.length !== labeledEmails.length) {
        console.error(
          "Mismatched lengths:",
          emails.length,
          labeledEmails.length
        );
        return;
      }

      const updatedEmails = emails.map((email, index) => {
        if (!labeledEmails[index]) {
          console.error(`No labeled email at index ${index}`);
          return email;
        }

        return {
          ...email,
          emailLabel: labeledEmails[index].label,
        };
      });

      localStorage.setItem("emails", JSON.stringify(updatedEmails));
      setEmails(updatedEmails);
    }
  };

  let storedApiKey;
  if (typeof window !== "undefined") {
    storedApiKey = localStorage.getItem("openAiApiKey");
  }

  const handleEmailCardClick = (email: Email | LabeledEmail) => {
    setSelectedEmail(email);
    setIsDrawerOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl my-10 ">
        <div className="flex items-center justify-between mx-auto">
          {userData && (
            <div className="flex gap-4 items-center">
              <Image
                src={userData.picture}
                alt="user-profile-picture"
                width={60}
                height={60}
                className="border border-2 border-gray-300 p-0.5 rounded-full"
              />
              <div className="space-y-1 text-sm">
                <p>{userData.name}</p>
                <p>{userData.email}</p>
              </div>
            </div>
          )}

          <Button
            onClick={handleLogout}
            className={isMobile ? "flex md:hidden" : "hidden md:flex"}
            variant="outline"
          >
            {isMobile ? (
              <LogOut className="h-4 w-4" />
            ) : (
              <LogOut className="mr-2 h-4 w-4" />
            )}
            {isMobile ? null : "Logout"}
          </Button>
        </div>
        <div className="flex item-center justify-between mt-10">
          <Select
            value={String(emailCount)}
            onValueChange={(value) => setEmailCount(Number(value))}
            disabled={loading || classificationLoading}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select email count" />
            </SelectTrigger>
            <SelectContent>
              {numberOfEmails.map((number) => (
                <SelectItem key={number} value={number.toString()}>
                  {number}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            disabled={loading || classificationLoading}
            onClick={handleClassifyEmails}
            variant="secondary"
          >
            Classify
          </Button>
        </div>

        <div className="mt-10 flex flex-col gap-5 items-center justify-center">
          {loading || classificationLoading
            ? Array.from({ length: emailCount }).map((_, index) => (
                <EmailSkeleton key={index} />
              ))
            : emails.map((email, index) => (
                <EmailCard
                  key={index}
                  onClick={() => handleEmailCardClick(email)}
                  emailData={email}
                />
              ))}
        </div>

        <EmailDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          emailData={selectedEmail}
        />
      </div>
    </ProtectedRoute>
  );
};

export default EmailDashboard;
