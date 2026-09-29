"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import Button from "@/shared/ui/Button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("errors.500");

  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fcf9f4] px-5 py-24 text-center text-[#1c1c19]">
      <span className="font-sora text-7xl font-extrabold text-[#984724] sm:text-8xl">
        500
      </span>
      <h1 className="font-sora mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-[#6d7a72]">
        {t("body")}
      </p>
      <div className="mt-8">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex h-[52px] items-center justify-center rounded-full bg-[#006c4e] px-8 text-sm font-bold text-white shadow-md transition-all hover:bg-[#00543c]"
        >
          {t("retry")}
        </button>
      </div>
    </main>
  );
}