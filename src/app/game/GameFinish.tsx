"use client";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import {
  deletePoints,
  deleteCurrentTrack,
  setFinish,
  deleteGuessedTracks,
} from "@/store/slice";
import Link from "next/link";

export var Finish = memo(function Finish() {
  var router = useRouter();
  var dispatch = useDispatch();
  var state = useSelector((state: RootState) => state.store);

  var repeat = useCallback(() => {
    dispatch(deletePoints());
    dispatch(deleteCurrentTrack());
    dispatch(setFinish(false));
    dispatch(deleteGuessedTracks());
  }, [dispatch]);

  return (
    <Modal show={state.finish}>
      <Modal.Body className="d-flex flex-column align-items-center bg-dark">
        <p>Вы набрали: {state.points} очков</p>

        <div>
          <Button
            onClick={() => router.push("/")}
            variant="secondary"
            className="m-3"
          >
            К поиску
          </Button>
          <Button onClick={() => repeat()}>Пройти ещё раз</Button>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex flex-column bg-dark text-white">
        {state.guessedTracks.length > 0 && (
          <>
            <h3>Вы угадали :</h3>
            <ul className="d-flex flex-column gap-1" style={{ width: "400px" }}>
              {state.guessedTracks &&
                state.guessedTracks.map((el: { name: string; id: string }) => (
                  <li
                    key={el.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <p className="m-0">{el.name}</p>
                    <Link
                      href={`https://open.spotify.com/track/${el.id}`}
                      target="_blank"
                      className="btn btn-secondary"
                    >
                      Слушать
                    </Link>
                  </li>
                ))}
            </ul>
          </>
        )}
        <h3>Вы не угадали :</h3>
        <ul className="d-flex flex-column gap-1" style={{ width: "400px" }}>
          {state.tracks &&
            state.tracks
              .filter(
                (el1: { name: string; id: string }) =>
                  !state.guessedTracks.some(
                    (el2: { name: string; id: string }) =>
                      el1["id"] === el2["id"]
                  )
              )
              .map((el: { name: string; id: string }) => (
                <li
                  key={el.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <p className="m-0">{el.name}</p>
                  <Link
                    href={`https://open.spotify.com/track/${el.id}`}
                    target="_blank"
                    className="btn btn-secondary"
                  >
                    Слушать
                  </Link>
                </li>
              ))}
        </ul>
      </Modal.Footer>
    </Modal>
  );
});
