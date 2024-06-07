"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Home = () => {
  const [apiKey, setApiKey] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleGoogleBtnClick = () => {
    if (apiKey.trim() === "") {
      setInputError(true);
      return;
    } else {
      setInputError(false);
      //Google authentication logic goes here
    }
  };

  return (
    <div className="container max-w-3xl">
      <nav className="pt-10 text-xl">AI Email Classifier</nav>
      <div className="flex flex-col items-center h-full my-72 text-4xl gap-10">
        <div className="w-1/2">
          <Input
            className={` ${
              inputError
                ? "ring-2 ring-red-600 focus-visible:ring-2 focus-visible:ring-red-600"
                : ""
            }`}
            type="text"
            placeholder="Enter your OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
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
