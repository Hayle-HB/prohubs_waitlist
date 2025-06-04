import React, { useState } from "react";
import Input from "./Input";
import StackSelector from "./StackSelector";
import Button from "./Button";
import LoadingSpinner from "./LoadingSpinner";

const API_URL = "http://localhost:1000/api/waitlist"; // Updated port to match backend

const WaitlistForm = ({ setSubmitted }) => {
  const [email, setEmail] = useState("");
  const [selectedStack, setSelectedStack] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, stack: selectedStack }),
        credentials: "include", // Include credentials for CORS
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "Failed to join waitlist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-6 bg-zinc-800/80 rounded-2xl border border-zinc-700 shadow-xl p-8 backdrop-blur-md"
    >
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}
      <Input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your Email"
        required
        disabled={isLoading}
      />
      <StackSelector
        selectedStack={selectedStack}
        setSelectedStack={setSelectedStack}
        disabled={isLoading}
      />
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? <LoadingSpinner /> : "Join Waitlist"}
      </Button>
    </form>
  );
};

export default WaitlistForm;
