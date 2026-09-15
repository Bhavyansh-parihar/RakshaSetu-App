# MASTER FIGMA PROMPT — AEGIS AI Citizen Mobile App (Innovik Hackathon)

You are a Senior Product Designer and Design System Engineer. Create a **production-ready, fully editable Figma file** for the **Citizen Panel** of a disaster management mobile application called **AEGIS AI**. This is for the **Innovik Hackathon 2026**, and the design quality should be comparable to apps by Google, Apple, Uber, Airbnb, and India's emergency response apps.

## IMPORTANT FIGMA REQUIREMENTS

Do NOT create static mockups. Build a proper Figma project with:

* Auto Layout on every screen.
* Reusable Components & Variants.
* Variables (Color, Typography, Radius, Spacing).
* Component Properties.
* Proper layer naming.
* Constraints for responsiveness.
* Interactive prototype connections wherever applicable.
* Icons should be editable vectors (Lucide / Material Symbols style).
* Everything should be editable inside Figma.

---

# FILE STRUCTURE

Create the following pages inside the Figma file:

1. 🎨 Design System
2. 📱 Citizen App — Light Mode
3. 🌙 Citizen App — Dark Mode
4. 🇮🇳 Hindi Localization
5. ✨ Prototype Flows

Frame size:

* Android Primary: 412 × 915 (Pixel 9 / Nothing Phone style)
* iPhone Secondary: 393 × 852 (Reusable through constraints)

Use an 8pt spacing system throughout.

---

# BRAND IDENTITY

App Name:
**AEGIS AI**

Tagline:
**Protect • Respond • Recover**

Design Language:

* Apple Human Interface + Material 3.
* Premium emergency response application.
* Minimalistic.
* Clean white backgrounds.
* Blue primary branding.
* High accessibility.
* Large touch targets.
* Rounded modern cards.

---

# COLOR VARIABLES

Create global color variables.

Primary

* Royal Blue — #2563EB
* Navy Blue — #1E3A8A

Emergency

* SOS Red — #DC2626
* Warning Orange — #EA580C
* Success Green — #16A34A

Neutrals

* White
* Surface Gray
* Background Gray
* Divider Gray
* Text Primary
* Text Secondary

Dark Mode

* Background
* Surface
* Primary Text
* Secondary Text

Semantic Colors

* Safe
* Danger
* Flood
* Fire
* Shelter Open
* Shelter Closed

---

# TYPOGRAPHY VARIABLES

Use Inter.

Create styles:

Display Large

Display Medium

Headline Large

Headline Medium

Title Large

Title Medium

Body Large

Body Medium

Label Large

Label Small

Maintain proper hierarchy.

---

# COMPONENT LIBRARY

Create reusable components with variants.

Buttons

* Primary
* Secondary
* Outline
* Danger (SOS)
* Success
* Icon Button
* Floating Action Button

Cards

* Status Card
* Shelter Card
* Incident Card
* Notification Card
* Contact Card
* AI Chat Card
* Profile Card

Inputs

* Text Field
* Search Field
* OTP Field
* Multiline Input
* Voice Input
* Upload Field

Chips

* Disaster Category
* Status Chip
* Language Chip
* Priority Chip

Navigation

* Top App Bar
* Bottom Sheet
* Navigation Drawer
* Notification Badge
* Hamburger Menu

Timeline Component

States:

* Pending
* Assigned
* In Progress
* Completed

Map Marker Components

* User
* Shelter Open
* Shelter Closed
* Danger Zone
* Flood Zone
* Responder

---

# SCREEN 1 — SPLASH SCREEN

Create a premium splash screen.

Background:

Blue gradient.

Center:

AEGIS shield logo.

Animated pulse placeholder.

Bottom:

Protect • Respond • Recover

Innovik Hackathon 2026.

Prototype transition after 2 seconds.

---

# SCREEN 2 — LANGUAGE SELECTION

Create onboarding language selector.

Illustration:

India + Globe.

Two large selection cards:

English

हिन्दी

Selected state.

Continue button.

All text switches using localization variables.

---

# SCREEN 3 — REGISTRATION FLOW

Multi-step onboarding.

Step Indicator Component.

### Step 1

Personal Details

* Name
* DOB
* Age (Auto)
* Gender
* Blood Group

### Step 2

Contact Information

* Phone
* Email

### Step 3

Emergency Contacts

Allow three contacts.

Relationship dropdown.

Add Contact button.

### Step 4

Permissions

Cards requesting:

* Location
* Notifications
* Microphone
* Battery Optimization

Each card has illustration and Allow button.

---

# SCREEN 4 — LOGIN

Minimal login screen.

Phone / Email toggle.

Password.

OTP option.

Forgot Password.

Continue button.

Biometric login placeholder.

---

# SCREEN 5 — HOME (MAIN SOS PAGE)

This is the hero screen.

Layout hierarchy:

## Header

Hamburger Menu

Greeting:
Good Morning, Bhavyansh

Citizen ID Badge

Notification Bell.

## Disaster Status Card

Shows:

Safe

Warning

Flood Alert

Earthquake Alert

Color-coded.

## HERO SOS BUTTON

Largest element on screen.

Requirements:

* Circular 220px button.
* Gradient red.
* 3-second hold ring around button.
* Countdown numbers.
* Ripple animation placeholders.
* "Hold for 3 Seconds to Send SOS".

Design interaction variants:

Idle

Holding

Sent

Cancelled

## MAP SECTION

Rounded map preview.

Current location marker.

Open shelters.

Danger zones.

Bottom Sheet Card above map.

Nearest Shelter card contains:

* Name
* Distance
* Capacity
* ETA
* Navigate Button

## QUICK ACTION GRID

4 rounded cards:

Report Incident

AI Assistant

Safety Guidelines

Emergency Helpline

---

# SCREEN 6 — SHELTERS MAP

Full screen map.

OpenStreetMap style.

Bottom sheet draggable.

Shelter cards.

Search shelter field.

Filter chips:

Open

Nearby

Medical

Food

Water

Navigate button.

---

# SCREEN 7 — REPORT INCIDENT

Premium upload screen.

Incident Type Chips.

Upload area supports:

* Camera
* Gallery
* Video

Metadata Verification Card.

Confidence Progress Indicator.

Description text field.

Voice-to-text button inside input.

Submit Report button.

---

# SCREEN 8 — REPORT HISTORY

Timeline interface.

Each report expands.

Card contains:

* Image Preview
* Priority Score
* Responder Assigned
* Timestamp
* Current Status
* Progress Bar

Filter chips:

All

Active

Resolved

Rejected

---

# SCREEN 9 — CHATBOT

Gemini Survival Assistant.

Top app bar.

Robot avatar.

Chat bubbles.

Suggestion chips:

Flood Safety

Earthquake

First Aid

Nearby Shelter

SOS Help

Bottom Input

Mic button.

Waveform listening animation placeholder.

Language toggle.

---

# SCREEN 10 — SAFETY GUIDELINES

Disaster category cards.

Categories:

Flood

Fire

Earthquake

Cyclone

Landslide

First Aid

Each opens dedicated guideline page.

Top segmented control:

English | हिन्दी

Accordion layout.

Illustrations for each disaster.

---

# SCREEN 11 — EMERGENCY CONTACTS

Profile cards.

Primary contact highlighted.

Edit/Delete buttons.

Add Contact FAB.

Relationship chips.

---

# SCREEN 12 — HELPLINE NUMBERS

Grid of emergency services.

Cards:

Police

Ambulance

Fire

Disaster Management

Women Helpline

NDRF

Each contains:

* Icon
* Number
* Call Button

Prototype action placeholder.

---

# SCREEN 13 — NOTIFICATIONS

Notification Center.

Grouped by Today / Yesterday.

Card variants.

Unread badge.

Icons based on notification type.

---

# SCREEN 14 — PROFILE

Citizen profile.

Profile photo placeholder.

Citizen ID Card.

QR Code placeholder.

Medical Information Card.

Emergency Contacts preview.

Language preference.

Logout button.

---

# SCREEN 15 — SETTINGS

Grouped settings.

Language.

Dark Mode.

Notifications.

Location Permission.

Microphone Permission.

About.

Privacy Policy.

Terms.

Version Card.

---

# NAVIGATION DRAWER

Modern drawer.

Rounded top corners.

Profile section.

Navigation items:

Home

Nearby Shelters

Report History

AI Assistant

Safety Guidelines

Emergency Contacts

Helplines

Profile

Settings

Bottom:

Version.

Innovik badge.

---

# DARK MODE

Duplicate every screen.

Use dark variables.

Maintain accessibility contrast.

---

# HINDI LOCALIZATION PAGE

Duplicate major screens.

Every visible string translated into Hindi.

Buttons, labels, cards, chatbot suggestions, guidelines, menus, dialogs.

Maintain Auto Layout.

---

# PROTOTYPE FLOWS

Connect interactive prototype.

Flow 1

Splash → Language → Registration → Home

Flow 2

Hold SOS Button

Idle → Holding → Countdown → Sent

Flow 3

Shelter Navigation

Home → Shelter → Map → Route

Flow 4

Report Incident

Upload → Metadata Verified → Submitted → History

Flow 5

Chatbot

Voice → Text → AI Response

Flow 6

Language Toggle

English ↔ Hindi across all screens.

---

# MICRO INTERACTIONS

Create interactive component variants for:

* SOS hold animation.
* Notification badge.
* Bottom sheet expand/collapse.
* Drawer open/close.
* Language toggle.
* Buttons pressed state.
* Chips selected/unselected.
* Timeline completed state.
* Upload progress.

---

# ACCESSIBILITY

Follow WCAG AA.

Minimum touch target 48px.

Readable typography.

High contrast colors.

Icons with labels.

Safe area spacing.

---

# FINAL OUTPUT

The final Figma file should include:

* 15 complete citizen app screens.
* Light and Dark mode.
* Hindi localization screens.
* Complete design system.
* 100% Auto Layout.
* Reusable components and variants.
* Variables for colors, spacing, typography.
* Interactive prototype flow.
* Clean developer-friendly layer naming ready for React Native implementation.
