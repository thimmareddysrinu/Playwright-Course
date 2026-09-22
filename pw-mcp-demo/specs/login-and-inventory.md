# Test Plan: Login and Inventory

**Target:** https://www.saucedemo.com
**Seed:** tests/seed.spec.ts
**Date:** 2026-09-22

## Overview
This plan covers the core SauceDemo authentication flow and the first post-login inventory experience. It validates that a valid user can sign in, blocked/invalid credentials are handled correctly, and the products page exposes the expected shopping actions.

## Preconditions
- The application is available at the SauceDemo login URL.
- A browser session is started against the public app environment.
- Standard user credentials are known: username `standard_user`, password `secret_sauce`.
- The locked-out user account is available for negative-path verification.

## Scenarios

### Scenario 1.1 — Successful login reaches the products page
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** The user is on the login page with no active session.
- **Steps:**
  1. Enter `standard_user` in the username field — expected: the field accepts the value and remains editable.
  2. Enter `secret_sauce` in the password field — expected: the password is masked but accepted by the form.
  3. Click the Login button — expected: the app navigates to the inventory page and shows the Products heading.
- **Assertions:**
  - The inventory header and visible product cards are displayed after login.
  - The cart badge is present and the primary shopping controls are visible.
- **Edge cases considered:**
  - Browser autofill or stale session state
  - Password masking not leaking the value into the DOM

### Scenario 1.2 — Locked-out user is denied access
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** The user is on the login page and the account `locked_out_user` is known to be blocked.
- **Steps:**
  1. Enter `locked_out_user` in the username field — expected: the field accepts the value.
  2. Enter `secret_sauce` in the password field — expected: the field accepts the password.
  3. Click the Login button — expected: the app stays on the login page and shows an error message.
- **Assertions:**
  - A clear error message indicates the user is locked out.
  - The inventory page does not load and the page remains at the login screen.
- **Edge cases considered:**
  - Wrong password for a valid user
  - Empty form submission vs blocked account flow

### Scenario 1.3 — Invalid credentials display a user-friendly error state
- **Priority:** P1
- **Tags:** @regression
- **Preconditions:** The user is on the login page with no active session.
- **Steps:**
  1. Enter a non-existent username such as `wrong_user` — expected: the username field retains the value.
  2. Enter an incorrect password such as `wrong_pass` — expected: the password field accepts the value.
  3. Click the Login button — expected: the application displays an error without progressing to the product list.
- **Assertions:**
  - The login form remains active and the user is not redirected.
  - The visible error content clearly communicates invalid credentials.
- **Edge cases considered:**
  - Empty username or password fields
  - Extra whitespace in username or password values

### Scenario 2.1 — Inventory page renders the product catalog
- **Priority:** P0
- **Tags:** @smoke @regression
- **Preconditions:** A valid user has already logged in successfully and is on the products page.
- **Steps:**
  1. Observe the top of the page after login — expected: the header, shopping cart icon, and product list are visible.
  2. Review the visible product cards — expected: multiple items are rendered with names and pricing.
  3. Inspect the filter control or sort control if present — expected: the sorting control is available and usable.
- **Assertions:**
  - At least one product card is visible with a name and price.
  - The cart action controls are present for each product item.
- **Edge cases considered:**
  - Product list loaded with zero items in a degraded state
  - Missing image or alt text on product cards

### Scenario 2.2 — Add an item to the cart from the inventory list
- **Priority:** P1
- **Tags:** @critical @regression
- **Preconditions:** The user is logged in and the inventory page is loaded.
- **Steps:**
  1. Locate the first visible product and click the Add to cart action — expected: a cart count increments and the button label changes to Remove.
  2. Open the shopping cart from the header — expected: the selected item is present in the cart summary.
  3. Continue to the checkout flow if the action is available — expected: the app moves to the cart page or checkout start page.
- **Assertions:**
  - The cart badge updates from zero to a positive number after adding an item.
  - The selected item appears in the cart with an expected quantity.
- **Edge cases considered:**
  - Double-clicking Add to cart
  - Multiple item additions before checking out

## Not covered (and why)
- Checkout payment completion is intentionally not included because this plan is focused on login and the immediate post-login inventory flow.
- User logout is not covered in this plan because the primary objective is authentication and product availability rather than session teardown.
