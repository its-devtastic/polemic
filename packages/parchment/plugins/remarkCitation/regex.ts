export const citeExtractorRe =
  /\[([^[\]]*@[^[\]]+)]|(?!\b)(@[a-zA-Z0-9_][a-zA-Z0-9_:.#$%&\-+?<>~]*)/g;
export const citeKeyRe = /@([a-zA-Z0-9_][a-zA-Z\d_:.#$%&\-+?<>~]*)/;
export const citeBracketRe = /\[.*]/;
