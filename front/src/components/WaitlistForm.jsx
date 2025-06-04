import React, { useState } from "react";
import Input from "./Input";
import StackSelector from "./StackSelector";
import Button from "./Button";

const WaitlistForm = ({ setSubmitted }) => {
  const [email, setEmail] = useState("");
  const [selectedStack, setSelectedStack] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 bg-zinc-800/80 rounded-2xl border border-zinc-700 shadow-xl p-8 backdrop-blur-md"
    >
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        required
      />
      <StackSelector
        selectedStack={selectedStack}
        setSelectedStack={setSelectedStack}
      />
      <Button type="submit" className="w-full">
        Join Waitlist
      </Button>
    </form>
  );
};

export default WaitlistForm;
