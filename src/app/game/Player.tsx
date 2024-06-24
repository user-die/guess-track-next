"use client";
import { memo } from "react";
import { setTracks } from "@/store/slice";
import style from "./../style.module.css";
import { useGetTracksQuery, RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  id: string;
  token: string;
};

export const Player = memo(function Player({ id, token }: Props) {
  var { data, isSuccess } = useGetTracksQuery({
    href: id,
    token,
  });

  const dispatch = useDispatch();

  if (isSuccess) dispatch(setTracks(data.tracks.items));

  const state = useSelector((state: RootState) => state.store);

  if (state.tracks) {
    return (
      <>
        <div className={style.playerContain}>
          {state.plug && <div className={style.plug}></div>}
          {state.plug && <div className={style.plug1}></div>}

          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/track/${
              state.tracks[state.currentTrack].track.id
            }?utm_source=generator&theme=0`}
            width="1000px"
            height="400px"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>
      </>
    );
  }
});
