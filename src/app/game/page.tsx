"use client";
import { Player } from "./Player";
import { Answer } from "./Answer";
import { useSelector } from "react-redux";
import { RootState, useGetPlaylistQuery } from "@/store";
import { Finish } from "./GameFinish";

export default function Game() {
  const token = localStorage.getItem("token");

  let state = useSelector((state: RootState) => state.store);

  const {
    data: search,
    isSuccess,
    isError,
  } = useGetPlaylistQuery({
    artist: state.artist.name,
    token,
  });

  if (isSuccess) {
    var id = search.playlists.items.find(
      (element: []) =>
        element.name.includes(
          `Best of ${state.artist.name}` || `This Is ${state.artist.name}`
        ) || element.name.includes(`This Is ${state.artist.name}`)
    ).id;
  }

  if (id) {
    return (
      <>
        <Player id={id} token={token}></Player>
        <Answer></Answer>
        {state.finish && <Finish></Finish>}
      </>
    );
  }

  return (
    <>
      <p>Загрузка</p>
    </>
  );
}
