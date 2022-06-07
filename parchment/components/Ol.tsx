import React from "react";

const Ol: React.FC<{ node: any }> = ({ node, ...props }) => {
  return (
    <ol
      {...props}
      className="list-decimal list-inside font-sans text-sm space-y-2"
    />
  );
};

export default Ol;
