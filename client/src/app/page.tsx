import Link from "next/link";
import ButtonRedirect from "./components/ButtonRedirect";
import { redirect } from "next/navigation";

export default function Home() {
  const isAuth = false;

  // if (!isAuth) {
  //   redirect("/login");
  // }

  return (
    <>
      <main>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
        <ButtonRedirect />
      </main>
    </>
  );
}
