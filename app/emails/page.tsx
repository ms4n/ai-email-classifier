import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import EmailCard from "@/components/email-card";

import { LogOut, Mail } from "lucide-react";

const EmailDashboard = () => {
  const numberOfEmails = Array.from({ length: 15 }, (_, i) => i + 1);

  return (
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

        <Button className="hidden md:flex" variant="destructive">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>

        <Button className="flex md:hidden " variant="destructive" size="icon">
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

      <div className="mt-10 flex items-center justify-center">
        <EmailCard></EmailCard>
      </div>
    </div>
  );
};

export default EmailDashboard;
