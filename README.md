# Olympic Gym — Projects

Training Program Builder V2 & Nutrition Plan Maker by Coach Loai Hassan.

## Project Structure

```text
├── index.html                  # Application Shell (Topbar, Background, App Frame Switcher)
├── manifest.json               # Web App Manifest (PWA)
├── vercel.json                 # Vercel Static Routing & Caching Configuration
├── assets/
│   ├── shield.png              # Olympic Gym Shield Logo
│   ├── gym-bg.jpg              # Shared Gym Backdrop Image
│   └── js/
│       ├── storage-shim.js     # iOS Safari localStorage Fallback Shim
│       └── shield-b64.js       # Shared Shield Base64 Data URI
├── vendor/
│   ├── docx.iife.js            # Shared docx.js Bundle (.docx Export)
│   └── exceljs.min.js          # ExcelJS Bundle (.xlsx Export)
├── css/
│   ├── shell.css               # Shell Layout & Splash Styles
│   ├── liquid-programs.css     # Liquid-Glass Theme for Training Program Builder
│   └── liquid-nutrition.css    # Liquid-Glass Mobile Navigation for Nutrition Plan Maker
├── js/
│   └── shell.js                # Frame Orchestration, Focus Keeper & Sidebar Switcher
├── programs/
│   ├── index.html              # Training Program Builder V2 Markup
│   ├── css/                    # Modular Stylesheets (main, gif-modal, db-page)
│   └── js/                     # Modular Scripts (app, docx-export, xlsx-export, dataset-layer, clients, etc.)
└── nutrition/
    ├── index.html              # Nutrition Plan Maker Markup
    ├── css/                    # Modular Stylesheets (splash, main, assistant)
    └── js/                     # Modular Scripts (boot, app, enhancements, assistant, clients, docx-import, etc.)
```

## Deployment (Vercel)

This project is a zero-build static site configured via `vercel.json`:
- `/` serves `index.html`.
- `/Olympic_Gym_Projects.html` automatically rewrites to `/index.html` for backward compatibility.
