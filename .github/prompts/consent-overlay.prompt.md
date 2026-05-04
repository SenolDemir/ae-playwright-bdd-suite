---
description: Consent/overlay dialog handling for all agents and runtime prompts
---

# Consent Overlay Handling (Runtime)

Whenever a consent, cookie, or overlay dialog is present and blocks interaction with the page:

1. **Detect Overlay**
   - Use `browser_snapshot` to check for dialogs, overlays, or banners that intercept pointer events or obscure the UI.
   - Look for elements with classes or roles like `.fc-dialog-overlay`, `.fc-consent-root`, `[role="dialog"]`, or visible consent banners.

2. **Handle Overlay**
   - If a visible consent/overlay dialog is detected, attempt to close it by:
     - Clicking the primary consent/accept button (e.g., "Consent", "Accept", "Agree") using `browser_handle_dialog` or `browser_click`.
     - If no button is available, use `browser_evaluate` to remove overlay elements from the DOM.
   - Always confirm the overlay is gone by taking another `browser_snapshot` before proceeding.

3. **Fallback**
   - If the overlay cannot be dismissed, log the failure and skip the blocked step, marking the scenario as "blocked by overlay".

4. **Scenario Design**
   - For negative scenarios, explicitly test the behavior when overlays block interaction (e.g., user cannot proceed, navigation is prevented).


# Agent Integration
- All agents and runtime prompts must include these overlay handling steps before any interaction that could be blocked.
- If overlay handling is already present in the agent, ensure it follows these best practices.
