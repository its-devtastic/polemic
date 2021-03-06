# Configuration

## The RC file

Polemic projects can be configured by modifying the `.polemicrc.json` file in the project root.

> The file is generated by the CLI when you create a new project. Create it if it doesn't exist.

## Options

| Name                                   | Type                                                  | Description                                                           | Default               |
|----------------------------------------|-------------------------------------------------------|-----------------------------------------------------------------------|-----------------------|
| `type`                                 | `"article"`, `"blog"`, `"book"`                       | Type of project                                                       | `"article"`           |
| `bibliography`                         | String                                                | Path to bibliography file                                             | -                     |
| `citationStyle`                        | `"ama"`, `"vancouver"`, `"harvard1"`                  | Citation style                                                        | `"ama"`               |
| `citationLocale`                       | `"en-US"`, `"es-ES"`, `"de-DE"`, `"fr-FR"`, `"nl-NL"` | Locale of citation strings                                            | `"en-US"`             |
| `sectionNumbering`                     | Boolean                                               | Automatically add section numbers                                     | `true`                |
| `figureNumbering`                      | Boolean                                               | Automatically add numbering to included assets (images, videos, etc.) | `true`                |
| `tableNumbering`                       | Boolean                                               | Automatically add numbering to tables                                 | `true`                |
| `equationNumbering`                    | Boolean                                               | Automatically add numbering to equations                              | `true`                |
| `tableOfContents`                      | Boolean                                               | Show a table of contents                                              | `true`                |
| `localization.label.footnotes`         | String                                                |                                                                       | `"Footnotes"`         |
| `localization.label.bibliography`      | String                                                |                                                                       | `"Bibliography"`      |
| `localization.label.tableOfContents`   | String                                                |                                                                       | `"Table of Contents"` |
| `localization.label.figureNumbering`   | String                                                | # will be replaced by the current index                               | `"Figure (#)"`        |
| `localization.label.tableNumbering`    | String                                                |                                                                       | `"Table (#)"`         |
| `localization.label.equationNumbering` | String                                                |                                                                       | `"Equation (#)"`      |
| `localization.dateTimeFormat`          | String                                                |                                                                       | `"D MMMM YYYY"`       |
