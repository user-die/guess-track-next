"use client";
import { useSearchQuery } from "@/store/spotiApi";
import { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { hideSearchModal, showSearchModal, setArtist } from "@/store/slice";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Modal } from "react-bootstrap";

type artist = {
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

export default function Search() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const token = localStorage.getItem("token"); //useSelector((state: RootState) => state.store.value);

  const { data } = useSearchQuery({ artist: search, token });

  const artists = data && data.artists.items;

  let state = useSelector((state: RootState) => state.store);

  function artistButton(artist: any): void {
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
  }

  return (
    <>
      <h1>Guess Track</h1>

      <Form.Control
        type="text"
        placeholder="Введите исполнителя"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Modal show={state.searchModal} onHide={() => dispatch(hideSearchModal)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Image
            width={300}
            height={300}
            src={state.artist.image || ""}
            alt="qwe"
          />
          <p>{state.artist.name}</p>

          <Form.Label>Выберите количество треков</Form.Label>
          <Form.Select>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Form.Select>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(hideSearchModal())}
          >
            Отмена
          </Button>
          <Button variant="primary" onClick={() => router.push("/game")}>
            Играть
          </Button>
        </Modal.Footer>
      </Modal>

      <article>
        {artists &&
          artists.map((el: artist) => (
            <article key={el.id}>
              <button onClick={() => artistButton(el)}>
                <Image
                  width={300}
                  height={300}
                  src={(el.images.length > 0 && el.images[1]["url"]) || ""}
                  alt="qwe"
                />
              </button>
              <p>{el.name}</p>
              <p>
                Жанры :{" "}
                {el.genres.map((el) => (
                  <span key={el}>{el} </span>
                ))}
              </p>
            </article>
          ))}
      </article>
    </>
  );
}
