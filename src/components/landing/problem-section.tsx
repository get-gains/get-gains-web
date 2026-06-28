"use client";

import Image from "next/image";

export function ProblemSection() {
  return (
    <section className="bg-surface-1 relative overflow-hidden py-32">
      {/* Background Pattern */}
      <div className="bg-dots absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left — Image */}
          <div className="relative">
            <div className="border-border/50 relative overflow-hidden rounded-3xl border shadow-xl">
              <Image
                src="/confused.png"
                alt="Confused about workout form"
                width={550}
                height={550}
                className="h-auto w-full object-cover"
              />
              <div className="from-error/20 absolute inset-0 bg-gradient-to-tr to-transparent" />
            </div>

            {/* Problem Card */}
            <div className="bg-surface-2 border-error/30 absolute -right-8 -bottom-8 rounded-2xl border p-5 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-error/20 flex h-12 w-12 items-center justify-center rounded-xl text-2xl">
                  ❌
                </div>
                <div>
                  <p className="text-error font-semibold">No way to compare</p>
                  <p className="text-muted-foreground text-sm">
                    Guessing if form is correct
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div className="space-y-8">
            <div className="border-error/20 bg-error/10 inline-flex items-center gap-2 rounded-full border px-4 py-2">
              <span className="bg-error h-2 w-2 rounded-full" />
              <span className="text-error text-sm font-medium">
                The Problem
              </span>
            </div>

            <h2 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
              Tired of <span className="text-error">Guessing</span> Your Form?
            </h2>

            <p className="text-muted-foreground text-xl leading-relaxed">
              Most people watch a workout video once and hope they&apos;re doing
              it right. Without real feedback, you risk{" "}
              <span className="text-error font-semibold">injury</span> and waste
              time with{" "}
              <span className="text-error font-semibold">
                ineffective workouts
              </span>
              .
            </p>

            <ul className="space-y-4">
              {[
                "No way to know if your form matches the coach",
                "Risk of injury from incorrect technique",
                "Plateauing results from ineffective movements",
                "Expensive personal trainers or guesswork",
              ].map((item, i) => (
                <li
                  key={i}
                  className="bg-surface-2/50 border-border/50 flex items-start gap-4 rounded-xl border p-4"
                >
                  <span className="bg-error/20 text-error flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold">
                    ✕
                  </span>
                  <span className="text-muted-foreground text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
