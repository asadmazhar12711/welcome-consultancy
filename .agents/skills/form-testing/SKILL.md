---
name: form-testing
description: Fill and submit every form with valid/invalid data, verifying validation, mobile number capture, and API response.
---

# Form Testing Skill

Use this skill when testing lead capture forms, callback popups, calculators, and appointment booking widgets.

## Checklist

1. **Validation**: Submitting empty required fields displays native HTML5 validation or inline error toasts.
2. **Mobile Number Capture**: Mobile input accepts digits, spaces, and country codes (e.g. `+91 98201 45678`).
3. **Payload Verification**: Form submits JSON payload to Cloudflare D1 API endpoint (`/api/leads` or `/api/slots/book`).
4. **User Feedback**: Displays success toast notification and resets form inputs upon successful submission.
