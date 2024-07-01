"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setFinish, setCurrentTrack } from "@/store/slice";

export var Navbar = memo(function Navbar() {
  var router = useRouter();
  var dispatch = useDispatch();

  var finish = () => {
    dispatch(setFinish(true));
    dispatch(setCurrentTrack());
  };

  return (
    <nav className="mt-2 d-flex justify-content-center">
      <button onClick={() => router.push("/")} className="btn btn-danger">
        {" "}
        К поиску
      </button>
      <button onClick={() => finish()} className="btn btn-danger mx-4">
        Завершить игру
      </button>
    </nav>
  );
});
