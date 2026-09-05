import { cookies } from "next/headers";

const MeProfile = async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("sessionToken");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
      },
    },
  );

  const result = await res.json();
  console.log(result);

  return (
    <>
      <div>MeProfile</div>
      <div>Xin chào {result.data.name}</div>
    </>
  );
};

export default MeProfile;
