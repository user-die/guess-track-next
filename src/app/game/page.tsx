"use client";
import { Player } from "./Player";
import { Answer } from "./Answer";
import { useSelector } from "react-redux";
import { RootState, useGetPlaylistQuery } from "@/store";
import { Finish } from "./GameFinish";
import { Navbar } from "./Nav";

export default function Game() {
  var state = useSelector((state: RootState) => state.store);
  var token = state.token;

  var {
    data: search,
    isSuccess,
    isError,
  } = useGetPlaylistQuery({
    artist: state.artist.name,
    token,
  });

  if (isSuccess) {
    return (
      <>
        <Navbar></Navbar>
        <Player
          id={
            search.playlists.items.find(
              (element: any) =>
                element.name.toLowerCase() ===
                  `best of ${state.artist.name.toLowerCase()}` ||
                `this is ${state.artist.name.toLowerCase()}`
            ).id
          }
        ></Player>
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
