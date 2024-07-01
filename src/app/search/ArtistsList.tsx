"use client";
import { memo, useMemo } from "react";
import Image from "next/image";
import style from "./../style.module.css";
import { useSearchQuery } from "@/store/spotiApi";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import defaultAvatar from "./../default-avatar.png";

type artistType = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: null;
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: { height: number; url: string; width: number }[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

type Props = {
  buttonClick: any;
};

export const ArtistsList = memo(function ArtistsList({ buttonClick }: Props) {
  var search = useSelector((state: RootState) => state.store.search);
  var token = useSelector((state: RootState) => state.store.token);

  const { data } = useSearchQuery({ artist: search, token });

  const artists = useMemo(() => {
    return data && data.artists.items;
  }, [data]);

  return (
    <article className="d-flex flex-wrap gap-4 mt-5">
      {artists &&
        artists.map((el: artistType) => (
          <button
            onClick={() => buttonClick(el)}
            className={style.artistCard}
            key={el.id}
          >
            <h1 className={style.artistName}>{el.name}</h1>

            <Image
              width={146}
              height={146}
              src={
                (el.images.length > 0 && el.images[1]["url"]) || defaultAvatar
              }
              alt={`${defaultAvatar}`}
            />
            <p className={style.genres}>
              Жанры :{" "}
              {el.genres.map((el) => (
                <span key={el}>{el} </span>
              ))}
            </p>
          </button>
        ))}
    </article>
  );
});
