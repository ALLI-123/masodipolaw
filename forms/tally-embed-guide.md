# Tally Form Integration Guide
## Barrister M. A. Sodipo Chambers

This guide explains how to set up and integrate Tally forms for the contact and consultation booking forms on the website.

---

## Table of Contents

1. [Creating Your Tally Account](#creating-your-tally-account)
2. [Setting Up the Contact Form](#setting-up-the-contact-form)
3. [Setting Up the Consultation Booking Form](#setting-up-the-consultation-booking-form)
4. [Configuring Email Notifications](#configuring-email-notifications)
5. [Setting Up Auto-Responses](#setting-up-auto-responses)
6. [Embedding Forms in the Website](#embedding-forms-in-the-website)
7. [Testing Your Forms](#testing-your-forms)
8. [Troubleshooting](#troubleshooting)

---

## Creating Your Tally Account

1. Go to [https://tally.so](https://tally.so)
2. Click "Sign Up" and create your account
3. Verify your email address
4. Complete your profile setup

---

## Setting Up the Contact Form

### Step 1: Create New Form

1. Click "Create Form" in your Tally dashboard
2. Name it: **"Contact Form - Sodipo Chambers"**
3. Add a description: "General enquiries for Barrister M. A. Sodipo Chambers"

### Step 2: Add Form Fields

Add the following fields in this order:

| Field Name | Field Type | Required | Notes |
|------------|------------|----------|-------|
| Full Name | Short Text | ✓ | Add placeholder: "Enter your full name" |
| Email Address | Email | ✓ | Enable email validation |
| Phone Number | Phone | Optional | Add placeholder: "+234 XXX XXX XXXX" |
| Subject | Short Text | ✓ | Add placeholder: "Brief subject of your enquiry" |
| Message | Long Text | ✓ | Add placeholder: "Please describe your enquiry..." |

### Step 3: Customize Appearance

1. Go to **Design** tab
2. Choose a clean, professional theme
3. Set brand colors to match website:
   - Primary: `#0A2540` (Deep Professional Blue)
   - Accent: `#C9A961` (Gold)
4. Enable "Transparent Background" for seamless embedding

### Step 4: Configure Settings

1. Go to **Settings** tab
2. Enable "Allow multiple submissions"
3. Disable "Collect email addresses" (we have our own field)
4. Set "Submit button text" to: "Send Message"

---

## Setting Up the Consultation Booking Form

### Step 1: Create New Form

1. Click "Create Form"
2. Name it: **"Consultation Booking - Sodipo Chambers"**
3. Add description: "Schedule a confidential legal consultation"

### Step 2: Add Form Fields

| Field Name | Field Type | Required | Notes |
|------------|------------|----------|-------|
| Full Name | Short Text | ✓ | |
| Email Address | Email | ✓ | |
| Phone Number | Phone | ✓ | |
| Preferred Date | Date Picker | ✓ | Set min date to today |
| Preferred Time | Dropdown | ✓ | Options: Morning (9am-12pm), Afternoon (1pm-4pm) |
| Type of Legal Matter | Dropdown | ✓ | Options below |
| Brief Description | Long Text | ✓ | Placeholder: "Briefly describe your legal matter..." |
| How Did You Hear About Us? | Dropdown | Optional | Options: Referral, Google Search, Social Media, Other |
| Preferred Consultation Mode | Radio Buttons | ✓ | Options: In-Person, Phone Call, Video Call |

**Type of Legal Matter Options:**
- Corporate Law
- Property Law
- Civil Litigation
- Commercial Law
- Family Law
- Employment Law
- Debt Recovery
- Legal Advisory
- Contract Drafting
- Dispute Resolution
- Other

### Step 3: Add Confirmation Message

1. Go to **Settings** → **Confirmation**
2. Set custom message: