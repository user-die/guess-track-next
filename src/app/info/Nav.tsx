"use client";
import { memo } from "react";
import { useRouter } from "next/navigation";

export var Navbar = memo(function Navbar() {
  var router = useRouter();

  return (
    <nav className="mt-2 d-flex justify-content-center">
      <button onClick={() => router.push("/")} className="btn btn-danger">
        {" "}
        К поиску
      </button>
    </nav>
  );
});
