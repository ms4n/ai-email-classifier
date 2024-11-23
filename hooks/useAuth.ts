import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

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
          if (pathname !== "/") {
            router.push("/");
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        if (pathname !== "/") {
          router.push("/");
        }
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [router, pathname]);

  return { isAuthenticated, loading };
};

export default useAuth;
