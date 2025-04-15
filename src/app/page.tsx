"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return <div onClick={() => router.push("/test")}>페이지 이동</div>;
}
