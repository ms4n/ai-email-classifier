import { useState, useEffect } from "react";

import { User } from "@/types";
import useAuth from "./useAuth";

const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated || authLoading) return;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/user`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.authenticated === true) {
          setUserData(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("An error occurred while fetching user data", error);
      }
    };

    fetchUserData();
  }, [isAuthenticated, authLoading]);

  return userData;
};

export default useUserData;
