import Link from "next/link";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <div>
        <h1>AuthLayout</h1>
        <div>
          <Link href="/">Home</Link>
        </div>
        {children}
      </div>
    </>
  );
}
