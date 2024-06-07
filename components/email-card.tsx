import React from "react";

const EmailCard = () => {
  return (
    <div className="rounded-lg border bg-card shadow-sm w-full text-sm p-8">
      <div className="flex justify-between items-center font-semibold">
        <p className="text-base">Sanjay M</p>
        <p className="px-2.5 py-0.5 rounded-full text-white bg-green-500">
          Important
        </p>
      </div>

      <p className="pt-6 line-clamp-2">
        Hi Emily, Thanks for your order. We are pleased to inform you that your
        order has been shipped. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Aliquam auctor mattis tristique. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla
        malesuada tortor vitae justo condimentum auctor. Donec venenatis arcu
        vitae tellus finibus porta. Praesent volutpat mattis euismod. Donec elit
        lectus, vestibulum sed metus id, laoreet pharetra mi. Duis enim mauris,
        sollicitudin nec erat ac, aliquam viverra mi. Proin pretium maximus
        imperdiet.
      </p>
    </div>
  );
};

export default EmailCard;
