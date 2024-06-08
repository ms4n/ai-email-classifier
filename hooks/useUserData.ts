import { useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  picture: string;
}

const useUserData = () => {
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
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
  }, []);

  return userData;
};

export default useUserData;
