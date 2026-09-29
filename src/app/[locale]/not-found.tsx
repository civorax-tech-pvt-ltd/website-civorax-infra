"use client";

import { useTranslations } from "next-intl";
import LocaleLink from "@/shared/ui/LocaleLink";
import Button from "@/shared/ui/Button";

export default function NotFound() {
  const t = useTranslations("errors.404");

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#fcf9f4] px-5 py-24 text-center text-[#1c1c19]">
      <span className="font-sora text-7xl font-extrabold text-[#006c4e] sm:text-8xl">
        404
      </span>
      <h1 className="font-sora mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
        {t("title")}
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-[#6d7a72]">
        {t("body")}
      </p>
      <div className="mt-8">
        <Button href="/" variant="primary" size="md">
          {t("back")}
        </Button>
      </div>
    </main>
  );
}