import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();

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

  return handleLogout;
};

export default useLogout;
