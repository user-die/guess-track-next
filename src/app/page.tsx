"use client";
import { useRouter } from "next/navigation";
import { RootState, useGetTokenQuery } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePoints,
  hideSearchModal,
  setToken,
  deleteCurrentTrack,
  setTracks,
  deleteGuessedTracks,
  setFinish,
} from "@/store/slice";
import { useEffect } from "react";

export default function Home() {
  var state = useSelector((state: RootState) => state.store);
  var router = useRouter();
  var { data: token, isSuccess } = useGetTokenQuery({});
  var dispatch = useDispatch();

  useEffect(() => {
    dispatch(deletePoints());
    dispatch(deleteCurrentTrack());
    dispatch(hideSearchModal());
    dispatch(setTracks([]));
    dispatch(deleteGuessedTracks());
    dispatch(setFinish(false));
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) dispatch(setToken(token.access_token));

    if (state.token) router.push("search");
  }, [token, dispatch, isSuccess, router, state.token]);

  return;
}
