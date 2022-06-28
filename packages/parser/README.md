# Polemic Parser

Parses Markdown into MDAST.

## Usage

```typescript
parse(doc: string, repository: IRepository, options: ParseOptions)
```

## Options

| Key        | Type   | Description                                                         |
|------------|--------|---------------------------------------------------------------------|
| `assetDir` | String | If provided, the parser will move relative files to this directory. |
