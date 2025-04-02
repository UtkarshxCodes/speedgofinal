import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        router.push("/"); // Redirect to the home page
      } else {
        console.error("Failed to log out:", await response.json());
        alert("Failed to log out. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <button onClick={handleLogout} className="text-sm text-primary underline">
      Logout
    </button>
  );
}