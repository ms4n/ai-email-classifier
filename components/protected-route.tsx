import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/"); // Redirect to home page if not authenticated
    }
  }, [isAuthenticated, loading, router]);

  //show a loading notification if required
  //   if (loading) {
  //     return (
  //       <div className="flex justify-center items-center h-screen text-xl">
  //         Loading...
  //       </div>
  //     );
  //   }

  return <>{isAuthenticated && children}</>;
};

export default ProtectedRoute;
