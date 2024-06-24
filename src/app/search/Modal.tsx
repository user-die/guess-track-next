"use client";
import { memo } from "react";
import Image from "next/image";
import { RootState } from "@/store";
import style from "./../style.module.css";
import { useRouter } from "next/navigation";
import { hideSearchModal, clearState } from "@/store/slice";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export const ModalWindow = memo(function ModalWindow() {
  const router = useRouter();
  const dispatch = useDispatch();
  let state = useSelector((state: RootState) => state.store);

  return (
    <Modal show={state.searchModal} onHide={() => dispatch(hideSearchModal())}>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Image
          className={style.modalImage}
          width={300}
          height={300}
          src={state.artist.image || ""}
          alt="qwe"
        />
        <p className={style.modalName}>{state.artist.name}</p>

        <p className={style.genres}>Жанры: {state.artist.genres}</p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center">
        <div>
          <Button
            variant="secondary"
            className={style.cancelButton}
            onClick={() => dispatch(hideSearchModal())}
          >
            Назад
          </Button>
          <Button
            className={style.startButton}
            onClick={() => {
              router.push("/game");
              // dispatch(clearState());
            }}
          >
            Играть
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});
