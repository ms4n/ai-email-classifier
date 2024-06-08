"use client";

import { useState } from "react";
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

import ProtectedRoute from "@/components/protected-route";

import useLogout from "@/hooks/useLogout";
import useWindowSize from "@/hooks/useWindowSize";

const EmailDashboard = () => {
  const numberOfEmails = Array.from({ length: 15 }, (_, i) => i + 1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = useLogout();
  const isMobile = useWindowSize();

  let storedApiKey;
  if (typeof window !== "undefined") {
    // Code that uses localStorage can safely run here
    storedApiKey = localStorage.getItem("openAiApiKey");
  }

  const emailData = {
    senderName: "Lee Rob",
    emailLabel: "Important",
    emailContent:
      "Thanks for your order. We are pleased to inform you that your order has been shipped. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam auctor mattis tristique. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla malesuada tortor vitae justo condimentum auctor. Donec venenatis arcu vitae tellus finibus porta. Praesent volutpat mattis euismod. Donec elit lectus, vestibulum sed metus id, laoreet pharetra mi. Duis enim mauris, sollicitudin nec erat ac, aliquam viverra mi. Proin pretium maximus imperdiet. Thanks for your order. We are pleased inform you that your order has been shipped.",
  };

  const handleEmailCardClick = () => {
    setIsDrawerOpen(true);
  };

  return (
    <ProtectedRoute>
      <div className="container max-w-4xl my-10 ">
        <div className="flex items-center justify-between mx-auto">
          <div className="flex gap-4 items-center">
            <Image
              src={"https://avatar.iran.liara.run/public/27"}
              alt="user-profile-picture"
              width={60}
              height={60}
              className="border border-2 border-gray-300 p-0.5 rounded-full"
            ></Image>

            <div className="space-y-1 text-sm">
              <p>Sanjay M</p>
              <p>arjunsanjay0@gmail.com</p>
            </div>
          </div>

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
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Number of emails" />
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
          <EmailCard emailData={emailData} onClick={handleEmailCardClick} />
        </div>

        <EmailDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          emailData={emailData}
        />
      </div>
    </ProtectedRoute>
  );
};

export default EmailDashboard;
