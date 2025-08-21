import React from "react";

const CardSkeletonUI = () => {
  return (
    <section className="w-full">
      <div className="rounded-2xl h-[120%] md:h-[90%] py-32 mb-3 bg-cardwhite animate-pulse flex-grow break-inside-avoid mb-3">
        &nbsp;
      </div>
      <div className="rounded-2xl h-48 md:h-[10%] flex-grow py-32 mb-3 bg-cardwhite animate-pulse break-inside-avoid mb-3">
        &nbsp;
      </div>
      <div className="rounded-2xl h-80 flex-grow py-32 mb-3 bg-cardwhite animate-pulse break-inside-avoid mb-3">
        &nbsp;
      </div>
      <div className="rounded-2xl h-20 flex-grow py-32 mb-3 bg-cardwhite animate-pulse break-inside-avoid mb-3">
        &nbsp;
      </div>
    </section>
  );
};

export default CardSkeletonUI;
