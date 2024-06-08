import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/status`,
          {
            credentials: "include",
          }
        );
        const result = await response.json();
        if (result.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/"); // Redirect to home page if not authenticated
        }
      } catch (error) {
        setIsAuthenticated(false);
        router.push("/"); // Redirect to home page if error occurs
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router]);

  return { isAuthenticated, loading };
};

export default useAuth;
