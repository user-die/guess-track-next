"use client";
import { useRouter } from "next/navigation";
import { useGetTokenQuery } from "@/store";
import { useDispatch } from "react-redux";
import { hideSearchModal } from "@/store/slice";

export default function Home() {
  const router = useRouter();
  const { data: token, isSuccess } = useGetTokenQuery({});
  var dispatch = useDispatch();

  dispatch(hideSearchModal());

  if (isSuccess) localStorage.setItem("token", token.access_token);
  if (isSuccess) router.push("search");

  return <main></main>;
}
