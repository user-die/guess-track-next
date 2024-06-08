"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetTokenQuery } from "@/store";
import { setToken } from "@/store/slice";

export default function Home() {
  const router = useRouter();
  const { data: token } = useGetTokenQuery({});

  if (token) localStorage.setItem("token", token.access_token);
  /*
  const dispatch = useDispatch();

   dispatch(setToken(token.access_token));
  */

  return (
    <main>
      <button onClick={() => router.push("search")}>search</button>
    </main>
  );
}
