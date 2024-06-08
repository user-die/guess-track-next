"use client";
import { RootState, useGetPlaylistQuery } from "@/store";
import { useSelector } from "react-redux";

export default function Game() {
  const token = localStorage.getItem("token");

  let state = useSelector((state: RootState) => state.store);

  const { data: search, isSuccess } = useGetPlaylistQuery({
    artist: state.artist.name,
    token,
  });

  console.log(
    isSuccess &&
      search.playlists.items.find((element) =>
        element.description.includes(`This Is ${state.artist.name}`)
      )
  );

  return (
    <>
      <p>q</p>
    </>
  );
}
