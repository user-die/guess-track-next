"use client";
import { RootState } from "@/store";
import style from "./../style.module.css";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState, memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addPoint,
  nextTrack,
  setCorrect,
  setFinish,
  togglePlug,
} from "@/store/slice";

export const Answer = memo(function Answer({}) {
  const [answer, setAnswer] = useState("");

  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.store);

  const checkAnswer = useCallback(() => {
    if (
      state.tracks &&
      answer.toLowerCase().replaceAll(" ", "") ===
        state.tracks[state.currentTrack].track.name
          .toLowerCase()
          .replace(/.\(.+\)/, "")
          .replaceAll(" ", "")
          .replaceAll("'", "")
    ) {
      dispatch(addPoint());
      dispatch(togglePlug(false));
      dispatch(setCorrect(true));
      setAnswer("");
    }

    if (state.tracks && state.currentTrack + 1 === state.tracks.length) {
      dispatch(setFinish(true));
    }
  }, [answer, dispatch, state.tracks, state.currentTrack]);

  useEffect(() => {
    checkAnswer();
  }, [answer, checkAnswer]);

  return (
    <div className={style.answerContain}>
      {state.correct && <p>Верно!</p>}
      <Form.Control
        type="text"
        placeholder="Угадайте трек"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <p style={{ margin: "20px" }}>
        Ваши очки: {state.points} / {state.tracks && state.tracks.length}
      </p>

      <Button
        style={{ background: "rgba(70, 128, 153, 1)" }}
        onClick={() => {
          dispatch(nextTrack());
          dispatch(togglePlug(true));
          dispatch(setCorrect(false));
        }}
      >
        Далее
      </Button>
    </div>
  );
});
