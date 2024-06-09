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

import { Email, LabeledEmail } from "@/types";

const EmailDashboard = () => {
  const handleLogout = useLogout();
  const isMobile = useWindowSize();
  const userData = useUserData();
  const [emailCount, setEmailCount] = useState(15);
  const { emails, loading, error } = useEmailData(emailCount);

  const numberOfEmails = Array.from({ length: 15 }, (_, i) => i + 1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | LabeledEmail>({
    emailFrom: "",
    emailSnippet: "",
    emailSubject: "",
    emailBodyHtml: "",
    emailLabel: "",
  });

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
          <Select onValueChange={(value) => setEmailCount(Number(value))}>
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

          <Button variant="secondary">Classify</Button>
        </div>

        <div className="mt-10 flex flex-col gap-5 items-center justify-center">
          {loading
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
