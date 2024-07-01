"use client";
import { memo, useEffect } from "react";
import { setTracks } from "@/store/slice";
import style from "./../style.module.css";
import { useGetTracksQuery, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  id: string;
};

export var Player = memo(function Player({ id }: Props) {
  var state = useSelector((state: RootState) => state.store);
  var token = state.token;

  var { data, isSuccess, isError } = useGetTracksQuery({
    href: id,
    token,
  });

  var dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setTracks(
        data?.tracks?.items?.map(
          (el: any) => (el = { name: el.track.name, id: el.track.id })
        )
      )
    );
  }, [data, isSuccess, dispatch]);

  if (isError) {
    return (
      <h1 className="text-center my-5 text-white">
        Игра не поддерживается в вашей стране. Включите vpn
      </h1>
    );
  }

  return (
    <div className={style.playerContain}>
      <div className={`${style.plug} ${style.mainPlug}`}></div>

      {state.plug && (
        <div className={`${style.plug} ${style.plug2}`}>
          <div className={`${style.plug} ${style.plug1}`}></div>
        </div>
      )}

      {state.plug && <div className={`${style.plug} ${style.plug3}`}></div>}

      {state.tracks?.length > 1 && !isError && (
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/track/${
            state.tracks[state.currentTrack].id
          }?utm_source=generator&theme=0`}
          width="80%"
          height="60%"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      )}
    </div>
  );
});
