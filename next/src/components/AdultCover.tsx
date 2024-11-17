import React from "react";

function AdultCover({className}: {className?: string}) {
  return (
    <div className={`absolute w-full backdrop-blur-lg h-full flex justify-center items-center bg-white/5 dark:bg-black/10 ${className}`}>
      <div>
        <span className="opacity-50"> sign in to verify</span>{" "}
        <span className="text-red-500">Adult</span>
      </div>
    </div>
  );
}

export default AdultCover;
