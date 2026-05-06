# Materials Bulk Upload Format

Use **Excel `.xlsx`** for bulk material upload.

Reason: materials are structured data in the app: course -> indexes -> slides -> content blocks -> files. Excel maps cleanly to database rows and can be validated before import. PPT is better for visual presentation, but extracting reliable indexes, slide titles, tables, lists, and attached files from PPT is inconsistent.

Sample Excel file: [materials-bulk-upload-sample.xlsx](./materials-bulk-upload-sample.xlsx)

PDF version: [materials-bulk-upload-format.pdf](./materials-bulk-upload-format.pdf)

## Workbook Rules

The workbook must contain these sheets:

1. `Indexes`
2. `Slides`
3. `Blocks`
4. `Assets` optional

Do not rename sheets. Do not merge cells. Keep the first row as headers. Every row must have stable IDs so the importer can connect indexes, slides, blocks, and files.

The sample workbook locks the first header row and freezes it while scrolling. Team members should edit only data rows below the headers. Do not add, remove, or rename columns.

## Sheet: Indexes

| Column | Required | Rule |
| --- | --- | --- |
| `index_id` | Yes | Unique key, for example `IDX-001`. |
| `index_order` | Yes | Number starting from `1`. |
| `index_title` | Yes | Display name shown in Materials. |
| `index_summary` | No | Short internal summary. |

## Sheet: Slides

| Column | Required | Rule |
| --- | --- | --- |
| `slide_id` | Yes | Unique key, for example `SLD-001`. |
| `index_id` | Yes | Must match an `Indexes.index_id`. |
| `slide_order` | Yes | Number starting from `1` inside each index. |
| `slide_title` | Yes | Display title for the slide. |
| `slide_summary` | No | Optional slide summary. |

## Sheet: Blocks

| Column | Required | Rule |
| --- | --- | --- |
| `block_id` | Yes | Unique key, for example `BLK-001`. |
| `slide_id` | Yes | Must match a `Slides.slide_id`. |
| `block_order` | Yes | Number starting from `1` inside each slide. |
| `block_type` | Yes | One of `heading`, `paragraph`, `assignment_note`, `bullet_list`, `nested_bullet_list`, `table`. |
| `block_title` | No | Optional title shown above the block. |
| `text` | Conditional | Required for heading/paragraph/note/list blocks. |
| `columns` | Conditional | Required for table blocks. Separate columns with `\|`. |
| `rows` | Conditional | Required for table blocks. Separate cells with `\|` and rows with new lines. |

List rules:
- `bullet_list`: put one bullet per line in `text`.
- `nested_bullet_list`: put one item per line in `text`; indent child items with two spaces.

Table example:
- `columns`: `Term|Meaning`
- `rows`: `Anterior|Front surface` then new line `Posterior|Back surface`

## Sheet: Assets

Use this sheet only when slide files are already uploaded or stored in a known path.

| Column | Required | Rule |
| --- | --- | --- |
| `asset_id` | Yes | Unique key, for example `AST-001`. |
| `slide_id` | Yes | Must match a `Slides.slide_id`. |
| `asset_order` | Yes | Number starting from `1` inside each slide. |
| `asset_type` | Yes | One of `image`, `video`, `document`, `link`. |
| `title` | No | File name or display title. |
| `url` | Yes | Existing uploaded URL, external URL, or server-imported file path. |

## Validation Rules

- IDs must be unique inside each sheet.
- All references must exist: `Slides.index_id`, `Blocks.slide_id`, and `Assets.slide_id`.
- Orders must be numeric and must not duplicate inside the same parent.
- Empty rows are ignored.
- Unsupported `block_type` or `asset_type` should fail import.
- The importer should save as draft first. Publishing must be a separate action after review.

## Recommended Workflow

1. Team fills the Excel file using the required sheets.
2. Admin/instructor uploads the workbook.
3. System validates the workbook.
4. System creates/updates draft course content.
5. User reviews the draft in Materials.
6. User clicks `Publish` only after review.

## Complete Sample Workbook

Use the following sample exactly as a reference when creating the Excel file. Each table below is one Excel sheet.

### Sample Sheet: Indexes

| index_id | index_order | index_title | index_summary |
| --- | ---: | --- | --- |
| IDX-001 | 1 | Basic to Anatomy & Physiology | Introduction to anatomy terms, body positions, and cavities. |
| IDX-002 | 2 | Integumentary System | Skin, hair, nails, and related structures. |
| IDX-003 | 3 | Blood and Circulatory System | Blood, heart, vessels, and circulation overview. |

How to enter:
- `index_id` must be short and unique.
- `index_order` controls display order in the Indexes list.
- `index_title` is what students see.

### Sample Sheet: Slides

| slide_id | index_id | slide_order | slide_title | slide_summary |
| --- | --- | ---: | --- | --- |
| SLD-001 | IDX-001 | 1 | Contents | Overview of topics in the first index. |
| SLD-002 | IDX-001 | 2 | Medical terminology is the language of medicine | Explains why terminology matters. |
| SLD-003 | IDX-001 | 3 | Body Views and Directional Terms | Directional body terms with meanings. |
| SLD-004 | IDX-001 | 4 | Body Cavities | Dorsal and ventral body cavities. |
| SLD-005 | IDX-002 | 1 | Functions of the Skin | Main functions of the integumentary system. |

How to enter:
- `index_id` must match a row from the `Indexes` sheet.
- `slide_order` starts again from `1` for each index.
- One slide can have many content blocks and many assets.

### Sample Sheet: Blocks

| block_id | slide_id | block_order | block_type | block_title | text | columns | rows |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| BLK-001 | SLD-001 | 1 | heading |  | Contents |  |  |
| BLK-002 | SLD-001 | 2 | nested_bullet_list |  | Medical Terminology:\n  Prefix\n  Suffix\n  Root Word\nWord Building\nBasic Human Anatomy and Physiology. |  |  |
| BLK-003 | SLD-002 | 1 | paragraph | Why terminology matters | Medical terminology is the standard language used by healthcare professionals to describe the body, diagnosis, and treatment. |  |  |
| BLK-004 | SLD-002 | 2 | bullet_list | Key Points | Improves communication\nReduces confusion\nSupports accurate documentation |  |  |
| BLK-005 | SLD-003 | 1 | table | Directional Terms |  | Term\|Meaning | Anterior (Ventral)\|Front surface\nPosterior (Dorsal)\|Back surface\nSuperior\|Above\nInferior\|Below |
| BLK-006 | SLD-004 | 1 | paragraph | Body cavities | Body cavities are spaces within the body that protect internal organs, support organs, and separate organs. |  |  |
| BLK-007 | SLD-004 | 2 | nested_bullet_list |  | Dorsal Body Cavity\n  Cranial cavity: contains the brain.\n  Spinal cavity: contains the spinal cord.\nVentral Body Cavity\n  Thoracic cavity: contains heart and lungs.\n  Abdominopelvic cavity: contains digestive and reproductive organs. |  |  |
| BLK-008 | SLD-005 | 1 | bullet_list | Functions | Protection\nTemperature regulation\nSensation\nVitamin D synthesis |  |  |

Important entry rules:
- In Excel, line breaks inside a cell can be entered with `Alt + Enter` on Windows or `Option + Command + Enter` on Mac.
- For `nested_bullet_list`, child items must start with two spaces.
- For `table`, keep `text` empty and fill `columns` and `rows`.
- In `columns`, separate each column with `|`.
- In `rows`, separate each cell with `|` and each row with a line break.

Table block clean example:

| block_type | columns | rows |
| --- | --- | --- |
| table | Term\|Meaning | Anterior\|Front surface\nPosterior\|Back surface |

Nested list clean example:

```text
Dorsal Body Cavity
  Cranial cavity: contains the brain.
  Spinal cavity: contains the spinal cord.
Ventral Body Cavity
  Thoracic cavity: contains heart and lungs.
```

### Sample Sheet: Assets

| asset_id | slide_id | asset_order | asset_type | title | url |
| --- | --- | ---: | --- | --- | --- |
| AST-001 | SLD-003 | 1 | image | Body views.png | /uploads/content/course-id/body-views.png |
| AST-002 | SLD-004 | 1 | image | Dorsal body cavity.png | /uploads/content/course-id/dorsal-body-cavity.png |
| AST-003 | SLD-004 | 2 | image | Ventral body cavity.png | /uploads/content/course-id/ventral-body-cavity.png |
| AST-004 | SLD-005 | 1 | document | Skin notes.pdf | /uploads/content/course-id/skin-notes.pdf |

How to enter:
- Use `image` for `.png`, `.jpg`, `.jpeg`, `.webp`.
- Use `document` for `.pdf`, `.doc`, `.docx`, `.ppt`, `.pptx`.
- Use `video` for `.mp4`, `.mov`, `.webm`.
- Use `link` when the `url` is an external link.
- `asset_order` controls file carousel order inside the slide.

## Minimal Example

If the team wants to test with the smallest valid workbook, use this:

`Indexes`

| index_id | index_order | index_title | index_summary |
| --- | ---: | --- | --- |
| IDX-001 | 1 | Anatomy Basics | Basic introduction. |

`Slides`

| slide_id | index_id | slide_order | slide_title | slide_summary |
| --- | --- | ---: | --- | --- |
| SLD-001 | IDX-001 | 1 | Introduction | First slide. |

`Blocks`

| block_id | slide_id | block_order | block_type | block_title | text | columns | rows |
| --- | --- | ---: | --- | --- | --- | --- | --- |
| BLK-001 | SLD-001 | 1 | heading |  | Introduction |  |  |
| BLK-002 | SLD-001 | 2 | paragraph |  | Welcome to Anatomy Basics. |  |  |

`Assets` can be empty or omitted for this minimal test.
