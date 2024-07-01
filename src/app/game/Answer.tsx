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
  addGuessedTrack,
} from "@/store/slice";

export var Answer = memo(function Answer({}) {
  var [answer, setAnswer] = useState("");

  var dispatch = useDispatch();
  var state = useSelector((state: RootState) => state.store);

  var checkAnswer = useCallback(() => {
    if (
      state.tracks?.length > 1 &&
      answer.toLowerCase().replaceAll(" ", "") ===
        state.tracks[state.currentTrack].name
          .toLowerCase()
          .replace(/.\(.+\)/, "")
          .replaceAll(" ", "")
          .replaceAll("'", "")
    ) {
      dispatch(addPoint());
      dispatch(togglePlug(false));
      dispatch(setCorrect(true));
      dispatch(addGuessedTrack(state.tracks[state.currentTrack]));
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
      {state.correct && <p className="text-white">Верно!</p>}
      <Form.Control
        type="text"
        placeholder="Угадайте трек"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <p style={{ margin: "20px" }} className="text-white">
        Ваши очки: {state.points} / {(state.tracks && state.tracks.length) || 0}
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
