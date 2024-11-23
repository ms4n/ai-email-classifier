"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated === true) {
      router.push("/emails");
    }
  }, [isAuthenticated, router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  const handleGoogleBtnClick = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-white to-gray-50 px-4 py-8">
      <Card className="w-full max-w-[90%] sm:max-w-lg border-2">
        <CardHeader className="space-y-4 p-6 sm:p-8">
          <div className="space-y-2 sm:space-y-4">
            <CardTitle className="text-lg sm:text-xl font-medium text-blue-600">
              TidyMail
            </CardTitle>
            <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Organize Your Inbox, {" "}
              <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Effortlessly
              </span>
            </CardTitle>
            <CardDescription className="text-base sm:text-lg text-gray-600">
              Let AI help you classify and organize your emails automatically. 
              Save time and keep your inbox clean.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-6 sm:p-8 flex justify-center">
          <Image
            onClick={handleGoogleBtnClick}
            className="cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md w-[200px] sm:w-[220px] h-auto"
            src="/images/google.svg"
            alt="google oauth login button"
            width={220}
            height={45}
            priority
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
