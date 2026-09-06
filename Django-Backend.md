# Django Backend Blueprint

This document describes how to build the backend for the portfolio in Django
while preserving the current frontend contract.

The current app is a Vite + React frontend. It uses local mock data by default
and can switch to a remote API through `VITE_API_URL`. No Django content API is
implemented yet. This document is the recommended backend design for replacing
the mock data with an editable, production-ready service.

## Goals

The Django backend should:

- Serve the portfolio's disciplines, projects, timeline, and contact endpoint.
- Keep the existing frontend response shapes so the React app needs little or
  no change.
- Give the owner a secure admin/content workflow for publishing work.
- Support project images, galleries, and optional `.glb` 3D models.
- Keep public read endpoints fast and cacheable.
- Validate and sanitize all content before it reaches the frontend.
- Store contact submissions safely and provide a reliable notification path.

## Recommended stack

- Python 3.12+
- Django 5+
- Django REST Framework
- PostgreSQL
- `django-cors-headers`
- Pillow for image validation
- Wagtail for rich project case-study content, if the editorial workflow needs
  structured blocks
- `django-storages` with an S3-compatible bucket for production media, if
  media should not live on the application filesystem
- Gunicorn or an ASGI server for production

### Why Django REST Framework and Wagtail

The frontend already expects JSON endpoints, while the project body is typed as
rendered HTML from a Wagtail StreamField. Django REST Framework maps cleanly to
the existing API contract, and Wagtail provides an editor-friendly way to
compose case studies from trusted content blocks.

If Wagtail is not needed, use a Django `TextField` containing sanitized HTML or
Markdown rendered and sanitized on the server. Never pass arbitrary,
user-submitted HTML directly into the frontend.

## Backend location

Create a dedicated Python service alongside the frontend:

```text
backend/
├── manage.py
├── pyproject.toml              # or requirements.txt
├── config/
│   ├── settings/
│   │   ├── base.py
│   │   ├── local.py
│   │   └── production.py
│   ├── urls.py
│   ├── asgi.py
│   └── wsgi.py
├── portfolio/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   ├── views.py
│   ├── filters.py
│   ├── permissions.py
│   └── tests/
├── contact/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   ├── views.py
│   └── tests/
├── media/
└── fixtures/
```

The existing `artifacts/api-server` package is an Express health-check
scaffold. It currently exposes `/healthz` only and does not serve the
portfolio's content endpoints. Treat the Django service as the replacement
content backend rather than trying to make the existing TypeScript scaffold
and Django own the same routes.

## Frontend contract to preserve

The frontend reads `VITE_API_URL` as the API origin and appends the paths below.
Set it to an origin such as `http://localhost:8000`, not to an origin that
already includes `/api`.

| Method | Endpoint | Used by |
| --- | --- | --- |
| `GET` | `/api/disciplines/` | Home, discipline pages, header, project details |
| `GET` | `/api/projects/` | Home and discipline pages |
| `GET` | `/api/projects/<slug>/` | Project detail page |
| `GET` | `/api/timeline/` | About page |
| `POST` | `/api/contact/` | Contact form |

The read endpoints should return JSON arrays directly. Do not wrap them in
`{"results": [...]}` unless the frontend is updated at the same time.

## API response shapes

### `GET /api/disciplines/`

Return an ordered array:

```json
[
  {
    "slug": "software",
    "name": "Software",
    "description": "Fullstack web applications, from product idea to shipped code.",
    "theme_color": "#3b5bdb",
    "icon_ref": null
  }
]
```

Requirements:

- `slug` must be unique, lowercase, URL-safe, and stable.
- `theme_color` must be a valid hex color because the frontend uses it for
  borders and labels.
- `icon_ref` may be `null`.
- Return disciplines in editorial order. The current frontend expects
  `software`, `hardware`, and `impact` behaviorally, so changing those slugs
  requires a coordinated frontend change.
- Only return published/active disciplines.

### `GET /api/projects/`

Return project summaries, not full case-study bodies:

```json
[
  {
    "slug": "realtime-ops-dashboard",
    "title": "Realtime Ops Dashboard",
    "summary": "A live operations dashboard used by a 40-person logistics team.",
    "cover_image": "https://cdn.example.com/projects/realtime-ops-dashboard/cover.jpg",
    "discipline": "software",
    "is_featured": true,
    "tech_stack": ["Next.js", "Django", "WebSockets", "PostgreSQL"],
    "date": "2025-11-02"
  }
]
```

Supported query parameters:

```text
?discipline=software
?featured=true
?featured=false
```

Behavior:

- `discipline` filters by the discipline slug.
- `featured` accepts `true` or `false` and filters `is_featured`.
- Both filters can be supplied together.
- Invalid filter values should return `400` with a useful `detail` message, or
  be explicitly documented as ignored. Returning a silent, surprising result
  should be avoided.
- Order results deterministically using editorial order first, then date
  descending as a fallback.
- Do not include `body`, `gallery`, `links`, or `model_3d` in this response.

The home page requests `featured=true` and groups the returned projects under
the disciplines response. The discipline pages request a discipline-filtered
list and split it into featured and non-featured projects in the browser.

### `GET /api/projects/<slug>/`

Return the complete project:

```json
{
  "slug": "realtime-ops-dashboard",
  "title": "Realtime Ops Dashboard",
  "summary": "A live operations dashboard used by a 40-person logistics team.",
  "cover_image": "https://cdn.example.com/projects/realtime-ops-dashboard/cover.jpg",
  "discipline": "software",
  "is_featured": true,
  "tech_stack": ["Next.js", "Django", "WebSockets", "PostgreSQL"],
  "date": "2025-11-02",
  "body": "<p>Sanitized case-study content.</p>",
  "gallery": [
    "https://cdn.example.com/projects/realtime-ops-dashboard/detail-1.jpg"
  ],
  "links": {
    "repo": "https://github.com/example/ops-dashboard",
    "live_demo": "https://example.com",
    "video": null
  },
  "model_3d": null
}
```

Requirements:

- Return `404` for an unknown or unpublished slug.
- `body` must be sanitized trusted HTML.
- `gallery` must always be an array, including when it is empty.
- `links` must always be an object. Optional link values may be omitted or
  returned as `null`; choose one convention and keep it consistent.
- `model_3d` must be `null` when the project has no 3D model.
- Media URLs should be absolute URLs in production so the frontend can render
  them regardless of its own host.
- The frontend also checks that the returned `discipline` matches the route
  discipline. Keep the project's discipline relationship authoritative.

### `GET /api/timeline/`

Return an ordered array:

```json
[
  {
    "title": "Founded independent studio",
    "organization": "Self-employed",
    "date_range": "2023 — present",
    "description": "Operating as an independent consultant and builder.",
    "discipline": null
  }
]
```

Requirements:

- Return entries in reverse chronological/editorial order.
- `discipline` is either a discipline slug or `null`.
- Keep `date_range` as a display string for compatibility with the current
  frontend. Store normalized start/end dates as additional fields if sorting or
  filtering will be needed later.
- Only return published entries.

### `POST /api/contact/`

The current form submits:

```json
{
  "name": "Visitor name",
  "email": "visitor@example.com",
  "message": "A message with at least ten characters.",
  "honeypot": ""
}
```

Successful response:

```json
{
  "ok": true
}
```

Recommended behavior:

- Return `202 Accepted` or `201 Created` with `{"ok": true}` after validating
  and accepting the message.
- Validate `name`, `email`, and `message` on the server even though the
  frontend also validates them.
- Require a message length of at least 10 characters to match the frontend's
  current rule.
- Reject a non-empty `honeypot` value as spam. For privacy and abuse
  resistance, it is reasonable to return the same success-shaped response as a
  real submission without storing or notifying.
- Return a non-2xx response with a `detail` string for user-visible failures,
  because the current frontend reads `data.detail`.
- Never return stack traces, SMTP errors, database details, or secrets.
- Do not echo the submitted message in an error response.

Example validation error:

```json
{
  "detail": "Enter a valid email address."
}
```

## Django data model

The names below are a starting point. Internal fields such as `display_order`,
`is_published`, and timestamps do not need to be exposed in the public API.

### `Discipline`

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | `SlugField(unique=True)` | Stable API and route identifier |
| `name` | `CharField` | Display name |
| `description` | `TextField` | Intro shown on home and discipline pages |
| `theme_color` | `CharField` | Validate `#RRGGBB` |
| `icon_ref` | `CharField(null=True, blank=True)` | Optional frontend icon reference |
| `display_order` | `PositiveIntegerField` | Controls home/header ordering |
| `is_published` | `BooleanField` | Hide drafts from public APIs |
| `created_at` / `updated_at` | timestamps | Audit information |

### `Project`

| Field | Type | Notes |
| --- | --- | --- |
| `slug` | `SlugField(unique=True)` | Used by `/api/projects/<slug>/` |
| `title` | `CharField` | Project title |
| `summary` | `TextField` | Short card/detail summary |
| `discipline` | `ForeignKey(Discipline)` | Required relationship |
| `cover_image` | `ImageField` or URL-backed media field | Required for published projects |
| `is_featured` | `BooleanField` | Used by the home page |
| `tech_stack` | `JSONField(default=list)` | Array of display strings |
| `date` | `DateField` | Exposed as ISO `YYYY-MM-DD` |
| `body` | Wagtail StreamField or sanitized `TextField` | Full case study |
| `repo_url` | `URLField(blank=True)` | Serialized as `links.repo` |
| `live_demo_url` | `URLField(blank=True)` | Serialized as `links.live_demo` |
| `video_url` | `URLField(blank=True)` | Serialized as `links.video` |
| `model_3d` | `FileField(blank=True)` | Optional `.glb` file |
| `display_order` | `PositiveIntegerField` | Editorial tie-breaker |
| `is_published` | `BooleanField` | Hide drafts from public APIs |
| `created_at` / `updated_at` | timestamps | Audit information |

Validate `tech_stack` as a JSON array of non-empty strings. If technology
filtering or richer metadata is required later, migrate it to a
`Technology` many-to-many model without changing the API's `string[]` output.

For media, validate:

- `cover_image` and gallery images are supported image types.
- `model_3d` is a `.glb` file with an appropriate size limit.
- Uploaded names are not trusted for paths or HTML.
- Published projects cannot have missing required media.

### `ProjectImage` or Wagtail gallery blocks

The frontend expects `gallery` as an array of URLs. Implement it with either:

1. A related `ProjectImage` model with `project`, `image`, `caption`, and
   `display_order`, or
2. A Wagtail StreamField/gallery block when editorial captions and layout
   control are valuable.

The serializer should return only the ordered image URLs unless the frontend
is later expanded to display captions.

### `TimelineEntry`

| Field | Type | Notes |
| --- | --- | --- |
| `title` | `CharField` | Role or milestone |
| `organization` | `CharField` | Company, studio, or organization |
| `date_range` | `CharField` | Display value kept for frontend compatibility |
| `start_date` | `DateField(null=True)` | Optional normalized sort field |
| `end_date` | `DateField(null=True)` | Optional; null for current work |
| `description` | `TextField` | Experience description |
| `discipline` | `ForeignKey(null=True)` | Optional related discipline |
| `display_order` | `PositiveIntegerField` | Editorial ordering |
| `is_published` | `BooleanField` | Hide drafts |

Use `display_order` as the primary ordering when the CV needs intentional
curation. Otherwise, sort by `start_date` descending.

### `ContactMessage`

| Field | Type | Notes |
| --- | --- | --- |
| `name` | `CharField` | Required |
| `email` | `EmailField` | Required |
| `message` | `TextField` | Required |
| `status` | choice field | `received`, `notified`, `failed`, `spam` |
| `created_at` | timestamp | Submission time |
| `notified_at` | timestamp | When notification succeeded |
| `ip_hash` | nullable string | Optional short-lived abuse analysis; hash, do not store raw IP indefinitely |
| `user_agent` | nullable text | Optional and privacy-reviewed |

Do not store the honeypot value as a normal content field. If it is filled,
mark the event as spam or discard it according to the privacy policy.

## Serializers and views

Use separate serializers for summary and detail responses:

```text
DisciplineSerializer
ProjectSummarySerializer
ProjectDetailSerializer
TimelineEntrySerializer
ContactSubmissionSerializer
```

Recommended view behavior:

- `GET /api/disciplines/`: `ListAPIView`, public read access.
- `GET /api/projects/`: `ListAPIView` with validated query filters.
- `GET /api/projects/<slug>/`: `RetrieveAPIView`, public read access.
- `GET /api/timeline/`: `ListAPIView`, public read access.
- `POST /api/contact/`: a dedicated `CreateAPIView` or API view with
  public-write validation and abuse controls.

Avoid exposing unrestricted Django model viewsets. The public API should expose
only fields and operations used by the portfolio.

## Content and admin workflow

The owner should be able to:

1. Create or edit a discipline.
2. Set its display order, theme color, slug, and publication state.
3. Create a project and assign it to a discipline.
4. Upload a cover image, gallery images, and an optional `.glb` model.
5. Write the case-study body using trusted rich-text/structured blocks.
6. Add repository, demo, and video links.
7. Toggle `is_featured`.
8. Set a project date and editorial order.
9. Preview a draft before publishing.
10. Manage timeline entries.
11. Review contact submissions and their delivery status.

If Wagtail is adopted, use its draft/publish workflow and image library. If
plain Django admin is used, register the models with list filters for
`is_published`, `is_featured`, and `discipline`, plus search by title and slug.

## Security requirements

### Public content

- Return published records only.
- Use serializer allow-lists; do not serialize model `__dict__`.
- Sanitize project HTML before storing or before serialization.
- Validate every URL and restrict schemes to `https` and, where necessary,
  `http` for local development.
- Set maximum lengths for titles, summaries, links, and text fields.
- Use `select_related("discipline")` and prefetch gallery media to avoid query
  explosions.

### Contact endpoint

The contact endpoint is public and must be treated as an abuse target:

- Rate-limit by IP and email, with a reasonable burst and daily limit.
- Enforce the honeypot.
- Add server-side validation and maximum message length.
- Consider a CAPTCHA or challenge only if spam volume justifies it.
- Queue email notifications rather than blocking the HTTP response on SMTP.
- Do not expose whether an email address has contacted the site before.
- Log operational failures without logging full message contents.
- Apply a retention policy for stored messages.

### Cross-origin requests

For local development, allow the Vite origin:

```text
http://localhost:5173
```

For production, allow only the deployed portfolio origin. Configure
`CORS_ALLOWED_ORIGINS` from environment variables; never use `*` together with
credentials.

If the frontend and API are served from different origins, decide explicitly
how CSRF protection will work for `POST /api/contact/`. Prefer same-origin
deployment or a CSRF-token flow. If a stateless public endpoint is exempted
from CSRF, compensate with strict CORS, rate limiting, validation, and
monitoring rather than treating the exemption as the only protection.

## Local development

### Backend setup on Windows PowerShell

From the repository root, once the `backend/` service exists:

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
```

Create `backend/.env` from a non-secret example file:

```text
DJANGO_SETTINGS_MODULE=config.settings.local
DJANGO_SECRET_KEY=replace-for-local-development
DJANGO_DEBUG=true
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1
DATABASE_URL=postgresql://portfolio:portfolio@localhost:5432/portfolio
CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173
FRONTEND_URL=http://localhost:5173
CONTACT_NOTIFICATION_EMAIL=owner@example.com
```

Do not commit `.env` files or real credentials.

Run migrations and create an admin user:

```powershell
python manage.py migrate
python manage.py createsuperuser
```

Load the initial portfolio content with a fixture or idempotent management
command. The import should preserve the existing mock slugs, dates, featured
flags, technology arrays, and discipline relationships.

Start Django:

```powershell
python manage.py runserver 0.0.0.0:8000
```

In a second PowerShell session, configure the frontend:

```powershell
$env:VITE_API_URL = "http://localhost:8000"
pnpm run dev:portfolio
```

Open `http://localhost:5173`. The Django admin should be available at
`http://localhost:8000/admin/`.

### Local API checks

```powershell
Invoke-RestMethod http://localhost:8000/healthz
Invoke-RestMethod http://localhost:8000/api/disciplines/
Invoke-RestMethod "http://localhost:8000/api/projects/?featured=true"
Invoke-RestMethod http://localhost:8000/api/timeline/
```

Test a contact submission:

```powershell
Invoke-RestMethod `
  -Method Post `
  -Uri http://localhost:8000/api/contact/ `
  -ContentType "application/json" `
  -Body '{"name":"Local test","email":"test@example.com","message":"Testing the contact endpoint.","honeypot":""}'
```

The frontend can continue to run without Django because
`artifacts/portfolio/src/lib/api.ts` falls back to mock data whenever
`VITE_API_URL` is absent or a read request fails.

## Seed data migration

The initial fixture should be derived from
`artifacts/portfolio/src/mocks/data.ts`:

- Disciplines: `software`, `hardware`, `impact`
- Projects: preserve each slug, discipline, date, `is_featured`, `tech_stack`,
  links, and media values.
- Timeline entries: preserve title, organization, date range, description, and
  nullable discipline.

Replace placeholder image URLs and placeholder case-study bodies before the
first production publish. Do not treat the example GitHub, demo, or image URLs
as real project assets.

Prefer an idempotent import command over a one-time manual admin entry so local,
staging, and production environments can be populated consistently. The
command must use `update_or_create`-style behavior keyed by stable slugs and
must not silently delete content that an editor has changed.

## Testing plan

Add automated tests before connecting production content:

### Model and validation tests

- Discipline slug uniqueness and theme color validation.
- Project slug uniqueness and discipline relationship.
- ISO date serialization.
- `tech_stack` array validation.
- URL and `.glb` validation.
- Required media for published projects.
- Timeline entries with and without a discipline.

### API contract tests

- Every endpoint returns the exact field names expected by the TypeScript
  interfaces.
- Project list responses omit detail-only fields.
- `discipline` and `featured` filters work independently and together.
- Invalid filters return a predictable `400`.
- Unpublished records never appear publicly.
- Unknown project slugs return `404`.
- Results have deterministic ordering.
- Media URLs are absolute and valid.

### Contact tests

- Valid submissions are accepted.
- Invalid names, emails, messages, and oversized payloads are rejected.
- A filled honeypot is handled as spam without sending a notification.
- Rate limiting is enforced.
- Notification failure does not expose internal details.
- Duplicate requests do not create uncontrolled duplicate notifications.

### Frontend integration checks

With the Django server running, manually verify:

1. The home page receives disciplines and featured projects.
2. Each discipline page receives the correct filtered projects.
3. Software, hardware, and impact pages retain their current layouts.
4. A project detail page renders sanitized body HTML, links, gallery data, and
   optional 3D model data.
5. The About page renders the timeline.
6. The contact form shows success and error states.
7. A missing record renders the existing not-found behavior.

## Deployment checklist

Before production:

- Set `DEBUG=False`.
- Provide a strong secret key through the hosting secret manager.
- Configure `ALLOWED_HOSTS`.
- Configure `CORS_ALLOWED_ORIGINS` and `CSRF_TRUSTED_ORIGINS` with exact
  production origins.
- Use PostgreSQL and run migrations.
- Configure persistent media storage and backups.
- Run `collectstatic`.
- Serve media through a CDN or protected storage path as appropriate.
- Configure email delivery and a notification destination.
- Configure HTTPS and secure cookie settings.
- Add structured logs and error monitoring.
- Add database, media, and contact-message retention/backups.
- Run API contract tests against staging.
- Set the frontend `VITE_API_URL` to the Django API origin and rebuild the
  frontend.

A production process should run Django through Gunicorn/ASGI and a reverse
proxy or managed web service. The API must expose a lightweight health check,
for example:

```text
GET /healthz -> {"status": "ok"}
```

The existing Express scaffold already uses `/healthz`; retaining this path in
the Django service makes health monitoring and future migration simpler.

## Implementation order

Build the backend in these stages:

1. Create the Django project and environment-based settings.
2. Configure PostgreSQL, DRF, CORS, static files, and media storage.
3. Implement `Discipline`, `Project`, gallery, and `TimelineEntry` models.
4. Implement admin/Wagtail editing and publication controls.
5. Import the current mock data into local development.
6. Implement summary/detail serializers and the four public read endpoints.
7. Implement the validated, rate-limited contact endpoint.
8. Add health checks, logging, and API contract tests.
9. Point the frontend at Django with `VITE_API_URL`.
10. Replace placeholder content and media before production launch.

Keep the first Django release intentionally narrow: content management and the
contact workflow are enough. Authentication for public visitors, comments,
search, payments, and a general-purpose CMS API are not required by the
current app and should not be added without a product need.