"use client";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button, Modal } from "react-bootstrap";
import { useRouter } from "next/navigation";
import { hideSearchModal } from "@/store/slice";

export const Finish = memo(function Finish() {
  const router = useRouter();
  var dispatch = useDispatch();
  var state = useSelector((state: RootState) => state.store);

  return (
    <Modal show={state.finish}>
      <Modal.Body className="d-flex flex-column align-items-center">
        <p>Вы набрали: {state.points} очков</p>
      </Modal.Body>

      <Modal.Footer className="d-flex justify-content-center">
        <div>
          <Button
            onClick={() => {
              router.push("search");
              dispatch(hideSearchModal());
            }}
            variant="secondary"
          >
            К поиску
          </Button>
          <Button>Пройти ещё раз</Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
});
