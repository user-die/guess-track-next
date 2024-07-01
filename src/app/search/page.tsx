"use client";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  showSearchModal,
  setArtist,
  togglePlug,
  setCorrect,
} from "@/store/slice";
import { ArtistsList } from "./ArtistsList";
import { Search } from "./Search";
import { ModalWindow } from "./Modal";
import Link from "next/link";

export default function Page() {
  const dispatch = useDispatch();

  const artistButton = useCallback(
    (artist: any): void => {
      dispatch(
        setArtist({
          name: artist.name,
          image: artist.images?.[1]?.["url"] || "",
          genres: artist.genres,
          id: artist.id,
          url: artist.external_urls?.["spotify"] || "",
        })
      );

      dispatch(showSearchModal());
      dispatch(togglePlug(true));
      dispatch(setCorrect(false));
    },
    [dispatch]
  );

  return (
    <div className="container">
      <h1 className="text-center position-absolute top-0 start-0">
        Guess Track
      </h1>

      <div className="row justify-content-center">
        <div className="d-flex">
          <Link href="/info" className="btn btn-info my-2 m-auto">
            Важная информация!
          </Link>
        </div>

        <ModalWindow></ModalWindow>

        <Search></Search>

        <ArtistsList buttonClick={artistButton}></ArtistsList>
      </div>
    </div>
  );
}
