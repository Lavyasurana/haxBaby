# Pip's DreamOS ✦

A tiny, sleepy operating system floating above Midnight Nursery. Built solo for **haX.baby — Baby's First Website**, Track 1: The Skull Baby (Pip), 17–19 October 2026.

## Run locally

Requires Node.js 20.19+ or 22.12+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. To check the production bundle:

```sh
npm run build
npm run preview
```

## The little story behind the build

I imagined Pip's workshop as a computer that fell asleep on a cloud and kept dreaming. The desktop borrows the odd warmth of early personal websites: homemade shortcuts, little status messages, a counter, and a secret worth finding. The projects are Pip's actual tools: a music box that plays synthesized lullabies, a lantern collection, and a delivery map that sends dreams to the nursery. The dream builder lets the visitor make something with Pip rather than just read about them.

## Feature and judging checklist

- **Functionality and polish:** responsive windowed desktop; click, close, stack and drag windows on desktop; mobile panels; local clock; audio controls; local persistence.
- **Early-web soul:** boot sequence, start menu, shortcuts, taskbar, cursor sparkles, little sound effects and a local dreams-delivered odometer.
- **Creativity and surprises:** deterministic dream builder, three interactive showcase projects, four illustrated storybook chapters, reactive Pip and a hidden room.
- **Clean craft:** React, TypeScript, Vite, CSS tokens, Motion, semantic controls, keyboard-operable buttons, reduced-motion CSS, and local assets. No paid API or credentials required.

### Bonus features, honestly described

Sparkle trail, UI sounds with mute, a **local** delivery counter, and responsive desktop/mobile layouts are implemented. The guestbook saves wishes only in the visitor's browser; it is **not** a live shared guestbook and does not claim that bonus. No backend is included.

## Credits

- Pip waving on a cloud, Pip portrait, music box and lantern: [official haX.baby Pip Creator Asset Pack](https://hax.baby/baby-problem#official-brief).
- Original interface design, copy, CSS illustrations, and synthesized audio created for this project with Codex assistance.
- [React](https://react.dev/), [Vite](https://vite.dev/), [TypeScript](https://www.typescriptlang.org/), [Motion](https://motion.dev/), and [Google Fonts](https://fonts.google.com/) (DM Sans, DM Serif Display, Space Mono).

## Deployment and submission

For Vercel, import a public GitHub repository containing this project. Vercel should detect Vite; use `npm run build` and `dist` as the output directory. Or from a terminal with GitHub CLI authenticated:

```sh
git init
git add .
git commit -m "Build Pip's DreamOS"
gh repo create pips-dreamos --public --source=. --remote=origin --push
```

Then import the repository in Vercel, deploy, and submit the public URL, public repository URL, credits, and build story through the hackathon portal. **Do not backdate commits.** The official brief requires public commit history during the sprint and submission by 19 October 2026 at 17:17 IST; confirm eligibility and deadline before submitting.

## Known limitations

- Guestbook and counter are browser-local, not shared across visitors or devices.
- Google Fonts require a network connection; system font fallbacks are provided. Artwork is bundled locally.
- This is a static app: no server-side storage, login, or live guestbook.
- Performance scores have not been measured with Lighthouse.
