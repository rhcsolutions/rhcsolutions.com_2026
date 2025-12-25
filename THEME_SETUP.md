# Theme Management Setup

## Overview
The theme system allows admins and editors to customize colors, fonts, and appearance.

## Theme Files
- **Theme Page**: `/admin/theme` - Full theme editor with color picker, font selector, and live preview
- **Theme API**: `/api/cms/theme` - GET/PUT endpoints to fetch/update theme
- **Theme Data**: `cms-data/theme.json` - Persisted theme configuration

## Test Users
Login credentials (password: `admin123`):

| Email | Role | Access |
|-------|------|--------|
| `admin@rhcsolutions.com` | Admin | All features, theme editing |
| `editor@rhcsolutions.com` | Editor | Page/theme editing, no user management |
| `jobs@rhcsolutions.com` | Jobs Manager | Jobs management only |

## How to Use

### Option 1: Preset Themes (Quick)
1. Login as admin or editor
2. In the top-right admin bar, find the **Theme** dropdown
3. Select **Brand** or **Dark** to apply a preset
4. See **Edit →** link next to it to open the full theme editor

### Option 2: Full Theme Editor (Custom)
1. Login as admin or editor
2. Navigate to **Admin > Theme** (or `/admin/theme`)
3. Customize colors, fonts, border radius, and shadow intensity
4. Preview changes in real-time on the right panel
5. Click **Save Theme** to persist

## API Endpoints

### GET /api/cms/theme
Fetch current theme configuration.
```bash
curl http://localhost:3003/api/cms/theme
```

### PUT /api/cms/theme
Update theme (requires admin/editor authentication).
```bash
curl -X PUT http://localhost:3003/api/cms/theme \
  -H 'Content-Type: application/json' \
  -d '{"colors": {...}, "fonts": {...}, ...}'
```

## Theme Structure
```json
{
  "colors": {
    "primary": "#00FF41",
    "primaryDark": "#050607",
    "secondary": "#00F0FF",
    "accent": "#00AAFF",
    "success": "#00FF88",
    "error": "#FF4458",
    "warning": "#FFB800",
    "info": "#00F0FF"
  },
  "fonts": {
    "primary": "Inter, system-ui, sans-serif",
    "secondary": "Space Grotesk, system-ui, sans-serif",
    "mono": "JetBrains Mono, monospace"
  },
  "borderRadius": "0.5rem",
  "shadowIntensity": "light|medium|heavy",
  "updatedAt": "2025-12-25T...",
  "updatedBy": "admin@rhcsolutions.com"
}
```

## Troubleshooting

### Theme changes not saving?
1. Check that you're logged in as **admin** or **editor**
2. Check browser **Console** for error messages
3. Check server logs for `[API] PUT /api/cms/theme` messages
4. Ensure `cms-data/` directory has write permissions

### Theme dropdown not appearing?
- Only visible on screens wider than `sm` (640px)
- On mobile, use `/admin/theme` page instead

## Notes
- Theme changes apply immediately on next page load
- Theme is stored in `cms-data/theme.json` (persisted locally)
- In production, consider migrating to a database backend
