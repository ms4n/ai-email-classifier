"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";

const Home = () => {
  const [openAiApiKey, setOpenAiApiKey] = useState("");
  const [inputError, setInputError] = useState(false);

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
    if (openAiApiKey.trim() === "") {
      setInputError(true);
    } else {
      localStorage.setItem("openAiApiKey", openAiApiKey.trim());
      setInputError(false);
      window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    }
  };

  return (
    <div className="container max-w-4xl">
      <nav className="pt-10 text-xl">AI Email Classifier</nav>
      <div className="flex flex-col items-center h-full mt-48 text-4xl gap-10">
        <div className="w-full md:w-1/2 ">
          <Input
            className={` ${
              inputError
                ? "ring-2 ring-red-600 focus-visible:ring-2 focus-visible:ring-red-600"
                : ""
            }`}
            type="text"
            placeholder="Enter your OpenAI API Key"
            value={openAiApiKey}
            onChange={(e) => setOpenAiApiKey(e.target.value)}
          />
          {inputError && (
            <p className="text-xs mt-3 ml-1 text-red-600">
              OpenAI API key is required!
            </p>
          )}
        </div>

        <Image
          onClick={handleGoogleBtnClick}
          className="cursor-pointer hover:scale-105 transition shadow"
          src={"/images/google.svg"}
          alt="google oauth login button"
          width={197}
          height={40}
        />
      </div>
    </div>
  );
};

export default Home;
