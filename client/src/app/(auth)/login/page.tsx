// "use client";
// import { useState } from "react";
import { websites } from "@/lib/data";

export default function LoginPage() {
  // const [email, setEmail] = useState("duthanhduoc@gmail.com");

  return (
    <>
      <div>Login Page</div>
      <ul>
        {websites.map((item) => (
          <li key={item.url}>
            <a href={item.url} target="_blank">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
