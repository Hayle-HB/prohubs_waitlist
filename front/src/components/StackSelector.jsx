import React from "react";

const stacks = ["Frontend", "Backend", "UI/UX", "Mobile", "ML", "Other"];

const StackSelector = ({ selectedStack, setSelectedStack }) => (
  <div className="space-y-4">
    <p className="text-zinc-400 text-sm">Select your stack:</p>
    <div className="grid grid-cols-2 gap-2">
      {stacks.map((stack) => (
        <button
          key={stack}
          type="button"
          onClick={() => setSelectedStack(stack)}
          className={`w-full px-4 py-2 rounded-lg font-medium border transition-all duration-200
            bg-white/10 text-white
            ${
              selectedStack === stack
                ? "border-white bg-white/20"
                : "border-transparent"
            }
            hover:border-white
            focus:outline-none
            active:border-white
          `}
        >
          {stack}
        </button>
      ))}
    </div>
  </div>
);

export default StackSelector;
