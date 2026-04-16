---
agent: agent
description: Shared login procedure for agents that need to authenticate via browser before inspecting protected pages
---

# Authentication Procedure

Run this procedure when DOM inspection requires a logged-in session.

1. **Read credentials** — `read_file` → `.env` in the project root.
   Extract `TEST_USER_EMAIL` and `TEST_USER_PASSWORD`.
   If either value is empty or the variables are missing, **stop and ask the user**
   for credentials — do not proceed with empty fields.
2. **Navigate to login page** — `browser_navigate` →
   the `BASE_URL` from `.env` (fallback: `https://www.automationexercise.com/`).
3. **Dismiss cookie consent** — if a consent dialog is visible in the snapshot,
   click the "Consent" button before interacting with the login form.
4. **Open login form** — click the "Signup / Login" navigation link.
5. **Fill login form** — use `browser_type` to enter:
   - Email into the login email field
   - Password into the login password field
6. **Submit** — click the "Login" button.
7. **Verify** — take a `browser_snapshot` and confirm the page shows
   "Logged in as" text. If login fails (e.g., "incorrect" message visible),
   **stop and report the failure** — do not continue with a broken session.
