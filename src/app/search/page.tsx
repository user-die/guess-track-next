"use client";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { showSearchModal, setArtist } from "@/store/slice";
import { ArtistsList } from "./ArtistsList";
import { Search } from "./Search";
import { ModalWindow } from "./Modal";

export default function Page() {
  const dispatch = useDispatch();

  const artistButton = useCallback(
    (artist: any): void => {
      dispatch(
        setArtist({
          name: artist.name,
          image: artist.images[1]["url"] || "",
          genres: artist.genres,
          id: artist.id,
          url: artist.external_urls["spotify"],
        })
      );

      dispatch(showSearchModal());
    },
    [dispatch]
  );

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <ModalWindow></ModalWindow>

        <Search></Search>

        <ArtistsList buttonClick={artistButton}></ArtistsList>
      </div>
    </div>
  );
}
