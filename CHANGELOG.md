# Changelog

## 2026-10-04

### Performance and motion tuning
- Removed layout reads from the scroll update path by caching section offsets and updating the page counter from a single throttled animation loop in Atmosphere.
- Stopped the app from re-rendering on every wheel/touch event by keeping page state changes to actual index changes and splitting the counter into a memoized component.
- Replaced blur-heavy photo animations with opacity/scale/clip-based reveal transitions so scrolling stays compositor-friendly on mobile.
- Simplified the background visual treatment by removing the expensive SVG turbulence grain, reducing box-shadow cost, and keeping cloud motion transform-only.
- Added `contain` and `content-visibility` safeguards on sections to reduce paint work for off-screen content.
- Tuned Lenis to a low-drift mobile configuration and routed the animation loop through one requestAnimationFrame tick.
- Added a small dev-only performance meter accessible via `?perf=1` and kept reduced-motion behavior respectful.

### Build and asset delivery
- Switched production output away from the single-file inline build to chunked bundles with manual splits for React, motion, and smooth-scroll code.
- Kept the inline build as an opt-in `build:single` script for use only when needed.
- Optimized the gallery images to WebP at max 720px width and kept the app’s original content and ordering intact.

### Notes
- The main trade-off is that a few subtle visual effects are intentionally toned down to prioritize steady 60fps scrolling on mid-range phones. The design language and content remain unchanged.
