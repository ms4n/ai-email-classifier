"use client";

import { useState } from "react";
import Image from "next/image";

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

import { LogOut } from "lucide-react";
import ProtectedRoute from "@/components/protected-route";
import { useRouter } from "next/navigation";

const EmailDashboard = () => {
  const numberOfEmails = Array.from({ length: 15 }, (_, i) => i + 1);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();

  const handleEmailCardClick = () => {
    setIsDrawerOpen(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      if (responseData.success) {
        router.push("/");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("An error occurred during logout", error);
    }
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
            className="hidden md:flex"
            variant="outline"
          >
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>

          <Button
            onClick={handleLogout}
            className="flex md:hidden "
            variant="outline"
            size="icon"
          >
            <LogOut className="h-4 w-4" />
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
          <EmailCard onClick={handleEmailCardClick} />
        </div>

        <EmailDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
      </div>
    </ProtectedRoute>
  );
};

export default EmailDashboard;
