# AI Political Poster Maker — Frontend

A responsive Next.js frontend for the **AI Political Poster Maker** MVP.

The application allows authenticated users to select reusable poster templates, provide poster information and photos, generate a high-resolution poster through the backend AI generation pipeline, preview the result, regenerate it within the allowed limit, download the generated poster, and view their poster history.

## Features

- Responsive UI for desktop and mobile
- User registration and login
- JWT-based authentication with the backend API
- Template library
- Template filtering by occasion
- Template selection before poster creation
- Poster creation form
- Support for:
  - Name
  - Designation
  - Party / organization
  - Union
  - Thana
  - District
  - Occasion
  - Bangla headline
  - Up to 3 photos
- Client-side form validation with React Hook Form and Zod
- Photo upload through the backend API
- AI-assisted poster generation through the backend
- Poster generation status handling
- Poster preview
- Poster regeneration
- Poster history
- Poster detail view
- Poster deletion
- High-resolution generated poster download
- Loading and error states
- Protected authenticated functionality
- Server-state management with TanStack Query
- Reusable UI components
- Responsive Tailwind CSS styling

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod
- Lucide React
- Fetch API
- JWT authentication through the backend API

## Project Structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── templates/
│   │   └── page.tsx
│   ├── create-poster/
│   │   └── page.tsx
│   ├── posters/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   └── not-found.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── PageContainer.tsx
│   │
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   │
│   ├── templates/
│   │   ├── TemplateCard.tsx
│   │   ├── TemplateGrid.tsx
│   │   └── OccasionFilter.tsx
│   │
│   ├── poster/
│   │   ├── PhotoUploader.tsx
│   │   ├── PosterForm.tsx
│   │   ├── PosterPreview.tsx
│   │   ├── PosterActions.tsx
│   │   ├── GenerationStatus.tsx
│   │   └── PosterCard.tsx
│   │
│   └── providers/
│       └── QueryProvider.tsx
│
├── hooks/
│   ├── useAuth.ts
│   ├── useTemplates.ts
│   ├── usePosters.ts
│   └── usePosterGeneration.ts
│
├── lib/
│   ├── api-client.ts
│   ├── auth.ts
│   └── query-client.ts
│
├── schemas/
│   ├── auth.schema.ts
│   └── poster.schema.ts
│
├── types/
│   ├── auth.ts
│   ├── template.ts
│   └── poster.ts
│
└── constants/
    ├── occasions.ts
    └── poster.ts
```

## Application Routes

| Route | Purpose | Authentication |
|---|---|---|
| `/` | Application landing page | Public |
| `/login` | User login | Public |
| `/register` | User registration | Public |
| `/templates` | Browse poster templates | Public |
| `/create-poster` | Create and generate a poster | Required |
| `/posters` | View authenticated user's poster history | Required |
| `/posters/[id]` | View a generated poster and available actions | Required |

## API Integration

The frontend communicates with the separate Express backend through the configured API base URL.

The frontend API client handles:

- JSON requests
- FormData requests for image uploads
- Authorization headers
- API response parsing
- API error handling

Protected requests use the authenticated user's JWT as a Bearer token.

### Backend API Base URL

Development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

For production, replace the value with the deployed backend API URL.

## Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Only values that are safe to expose to the browser should use the `NEXT_PUBLIC_` prefix.

Backend secrets such as the MongoDB connection string, JWT secret, Gemini API key, and Cloudinary secret are never stored in the frontend environment.

## Authentication

The frontend uses JWT authentication provided by the Express backend.

The authentication flow is:

```text
Register / Login
       ↓
Backend validates credentials
       ↓
Backend returns JWT
       ↓
Frontend stores authentication state/token
       ↓
API client attaches Bearer token
       ↓
Protected backend endpoints become available
```

Unauthenticated users cannot access authenticated poster functionality.

## Template Flow

```text
Templates
   ↓
Select template
   ↓
Create Poster
   ↓
Template ID is passed to the poster creation flow
   ↓
User completes poster information
```

Templates are retrieved from the backend rather than being hardcoded as the application's primary data source.

## Poster Creation Flow

```text
Create Poster
      ↓
Enter poster information
      ↓
Select / upload up to 3 photos
      ↓
Upload photos to backend
      ↓
Receive uploaded photo URLs
      ↓
Create poster request
      ↓
Backend performs AI-assisted generation
      ↓
Backend renders the final poster
      ↓
Generated poster URL returned
      ↓
Poster detail / preview
```

The frontend does not directly expose the Gemini API key or other backend-only credentials.

## Poster Generation

The frontend sends structured poster information to the backend.

The backend is responsible for:

- AI-assisted layout generation
- Poster rendering
- Image storage
- Poster persistence

The exact user-provided Bangla headline is preserved by the backend rendering pipeline rather than relying on the AI model to render text inside an image.

## Poster History

Authenticated users can view their generated posters through:

```text
GET /api/posters/me
```

The frontend uses TanStack Query for fetching and caching poster history.

Poster mutations invalidate the relevant query so that the history remains synchronized with the backend.

## State Management

TanStack Query is used for server state including:

- Templates
- Poster history
- Poster creation
- Photo uploads
- Poster regeneration
- Poster deletion

React Hook Form manages the poster creation form.

Zod provides client-side validation for form input.

Local component state is used only where appropriate for UI-specific state.

## Photo Upload

Users can upload a maximum of three photos.

The frontend sends selected files using `FormData`.

The browser automatically sets the required multipart boundary, so the frontend does not manually set:

```text
Content-Type: multipart/form-data
```

The backend returns uploaded image metadata, which is then used during poster creation.

## Error Handling

The UI provides error states for:

- Authentication failures
- API failures
- Form validation failures
- Photo upload failures
- Poster generation failures
- Regeneration failures
- Poster deletion failures

Loading states are provided for asynchronous operations such as:

- Template loading
- Poster history loading
- Photo uploading
- Poster generation
- Poster regeneration
- Poster deletion

## Responsive Design

The interface is designed for:

- Desktop
- Tablet
- Mobile

The poster gallery uses responsive grid layouts, while poster creation and preview areas adapt to smaller screens.

## Backend Dependency

This repository is only the frontend application.

It requires the separate Express backend to provide:

- Authentication
- Templates
- Photo uploads
- AI-assisted poster generation
- Poster rendering
- Poster storage
- Poster history
- Regeneration
- Deletion

See the backend repository README for backend setup and API details.

## Local Development

Install dependencies:

```bash
bun install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Start the development server:

```bash
bun run dev
```

The frontend will normally be available at:

```text
http://localhost:3000
```

Make sure the backend is running before using authenticated API functionality.

## Production Build

Build the application:

```bash
bun run build
```

Start the production server:

```bash
bun start
```

## MVP Scope

The frontend focuses on the required MVP workflow:

```text
Authentication
     ↓
Templates
     ↓
Create Poster
     ↓
Photo Upload
     ↓
AI-assisted Generation
     ↓
Preview
     ↓
Regenerate
     ↓
Download
     ↓
Poster History
```

The following features were intentionally kept outside the MVP scope:

- Admin dashboard
- Moderation workflow
- Analytics dashboard
- Bulk poster generation
- Payment/subscription system
- PDF export
- Advanced collaboration
- Real-time generation infrastructure
- Redis-based distributed state
- WebSocket-based generation updates

## Security Notes

- Backend secrets are never exposed through frontend environment variables.
- The frontend does not contain the Gemini API key.
- The frontend does not contain the MongoDB connection string.
- Protected API requests use JWT authentication.
- Authorization and ownership checks are enforced by the backend.
- Client-side validation is not treated as a replacement for backend validation.

## License

This project was created as an MVP assignment/project.

Implementation note: The poster-generation flow is implemented using the Google Gemini API (gemini-3.8-flash) with structured JSON output for layout generation and server-side rendering via Puppeteer. At the time of submission, the Gemini generation endpoint was returning an upstream availability/rate-limit error, so the generation portion may not complete successfully during live evaluation. The remaining authentication, template, upload, poster persistence, rendering, history, regeneration, and download flows are implemented.

1. Need to add image in hero section.