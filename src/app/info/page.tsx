"use client";
import Link from "next/link";
import { Navbar } from "./Nav";

export default function Home() {
  return (
    <article className="w-75 mx-auto d-flex flex-column h-100 justify-content-between align-items-center">
      <div className="gap-4 d-flex flex-column">
        <Navbar />
        <h3>Приложение находится в стадии разработки</h3>
        <h3>
          Для игры может понадобиться vpn, так как Spotify Api работает не во
          всех странах
        </h3>

        <h3>
          В этой игре представлены исполнители, размещающие свои треки на
          Spotify. Если исполнителя нет на Spotify, значит в этой игре вы его не
          найдёте
        </h3>

        <h3>
          Эта игра содержит не все, а только самые популярные треки исполнителя.
          Алгоритмы в процессе улучшения и будьте уверены - ваш любимый трек
          скоро будет здесь!
        </h3>
      </div>
      <h3>
        Сделано с любовью by{" "}
        <Link href="https://github.com/user-die" target="_blank">
          @userdie
        </Link>
      </h3>
    </article>
  );
}
