# Bibliography

## References

Including references in your Polemic document is easy:

```markdown
As put forward in @joe.
```
Or with bracket notation for more complex cases:

```markdown
This is very true [see @joe; @jane, p. 44]
```

In general references are written as `@{citation-key}` where the citation key
matches the id of an entry in your bibliography file.

## Formats

Polemic supports all the common bibliography formats, such as BibTex, BibJSON and CSL-JSON.

You can point Polemic to your bibliography file by adding a key in the frontmatter of your document:

```markdown
---
bibliography: ./bib.txt
---
```

Alternatively you can add a `bibliography` key to your project's config file (`.polemicrc.json`):

```json
{
  "bibliography": "./bib.txt"
}
```

If you do not set any of the above, Polemic will look for a `.bib` file in your project.
It currently only supports a single `.bib` file.
