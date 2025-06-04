import React, { useState } from "react";
import WaitlistForm from "./components/WaitlistForm";

const HourglassIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="mx-auto mb-4"
  >
    <path d="M6 2h12" />
    <path d="M6 22h12" />
    <path d="M17 2.5v2a6.5 6.5 0 0 1-3.5 5.8A6.5 6.5 0 0 1 10 4.5v-2" />
    <path d="M7 2.5v2a6.5 6.5 0 0 0 3.5 5.8A6.5 6.5 0 0 0 14 4.5v-2" />
    <path d="M7 21.5v-2a6.5 6.5 0 0 1 3.5-5.8A6.5 6.5 0 0 1 14 19.5v2" />
    <path d="M17 21.5v-2a6.5 6.5 0 0 0-3.5-5.8A6.5 6.5 0 0 0 10 19.5v2" />
  </svg>
);

const App = () => {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <HourglassIcon />
          <h1 className="text-4xl font-bold text-white">Join the Waitlist</h1>
          <p className="mt-2 text-zinc-400">
            Be the first to know when we launch
          </p>
        </div>
        {!submitted ? (
          <WaitlistForm setSubmitted={setSubmitted} />
        ) : (
          <div className="text-center p-8 bg-zinc-800/80 rounded-2xl border border-zinc-700 shadow-xl">
            <div className="text-3xl mb-2">⏳</div>
            <h2 className="text-xl font-semibold text-white">Thank You!</h2>
            <p className="text-zinc-400 mt-2">
              We'll notify you as soon as we launch.
            </p>
          </div>
        )}
        <div className="mt-8 text-center text-sm text-zinc-500">
          <p>We respect your privacy. No spam, ever.</p>
        </div>
      </div>
    </div>
  );
};

export default App;
