"use client";
import { memo } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "@/store/slice";
import { RootState } from "@/store";

export const Search = memo(function Search() {
  var dispatch = useDispatch();
  var search = useSelector((state: RootState) => state.store.search);

  return (
    <Form.Control
      className="w-50"
      type="text"
      placeholder="Выберите исполнителя"
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
    />
  );
});
