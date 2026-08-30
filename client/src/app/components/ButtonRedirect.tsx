"use client";
import { redirect, useRouter } from "next/navigation";

const ButtonRedirect = () => {
  const isAuth = false;

  if (!isAuth) {
    redirect("/login");
  }

  const router = useRouter();

  const handleNavigate = () => {
    router.push("login");
    // redirect("/login");
  };

  return (
    <>
      <button onClick={handleNavigate}>Chuyển sang trang Login</button>
    </>
  );
};

export default ButtonRedirect;
