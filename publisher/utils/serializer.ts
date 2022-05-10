const Serializer = {
  serialize: (doc: any[]) =>
    doc
      .map(({ children }) =>
        children.map(({ text }: { text: string }) => text).join("")
      )
      .join("\n"),
  deserialize: (doc: string) =>
    doc
      .split("\n")
      .filter(Boolean)
      .map((text) => ({ type: "paragraph", children: [{ text }] })),
};

export default Serializer;
