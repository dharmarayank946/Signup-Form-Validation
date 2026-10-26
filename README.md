# Signup Form with Validation

A clean, modern, accessible, and responsive **Signup Form with Validation** web application built purely with **HTML5**, **CSS3**, and vanilla **JavaScript (ES6+)**.

Designed with an elegant light theme featuring soft pastel green accents, this project provides instant client-side validation, live password strength analysis, real-time complexity checklists, inline error messages, and a show/hide password toggle. It is 100% dependency-free and ready for deployment to GitHub Pages.

---

## ✨ Features

1. **Name, Email, and Password Fields**
   - Clean, centered card interface with accessible `<label>` associations and semantic form controls.
2. **Robust Name Validation**
   - Validates that the full name is not empty, meets a minimum length of 2 characters, and contains only valid alphabetic characters, spaces, hyphens, and apostrophes.
3. **Regular Expression Email Format Validation**
   - Ensures standard RFC-compliant email structure (e.g., `user@domain.com`).
4. **Password Length & Complexity Verification**
   - Requires at least 8 characters.
   - Enforces uppercase letter (`A-Z`), lowercase letter (`a-z`), number (`0-9`), and special character (`!@#$%^&*`).
5. **Inline Error Messages Beside/Below Fields**
   - Error messages render directly below the relevant input with high-contrast red alerts and visual icons.
   - Associated with `aria-describedby` and `aria-invalid` for complete screen reader accessibility.
   - No intrusive browser `alert()` popups.
6. **Live Password Strength Indicator (Weak, Medium, Strong)**
   - Evaluates password strength dynamically as you type.
   - 3-segment visual progress track with color-coded badges:
     - **Weak** (Orange/Red): Less than 8 characters or only 1–2 criteria met.
     - **Medium** (Amber): 8+ characters meeting 3–4 criteria.
     - **Strong** (Pastel Forest Green): 8+ characters meeting all 5 requirements.
7. **Interactive Password Checklist**
   - Visual bullet checklist changes to a verified checkmark in real time when each condition is met.
8. **Prevents Form Submission Until Valid**
   - Prevents page reload (`e.preventDefault()`).
   - If any field is invalid, highlights all invalid fields and automatically focuses the first invalid input.
9. **Accessible Success Confirmation**
   - When all fields pass validation, the form smoothly switches to a personalized success screen summarizing the verified user credentials.
   - Includes a "Sign Up Another Account" reset button.
10. **Show / Hide Password Toggle**
    - Accessible button allowing users to toggle between obscured and plaintext password input with eye and eye-slash SVG icons.
11. **Instant Error Clearing**
    - Clears error states and marks fields valid immediately as the user corrects their input.

---

## 🎨 Design System

- **Theme:** Clean, modern light theme with white surfaces and soft pastel green accents.
- **Color Palette:**
  - Page Background: `#F4F8F5` (Soft mint tint)
  - Card Surface: `#FFFFFF` (Clean white)
  - Primary Green: `#2D6A4F` (High-contrast Forest/Sage Green)
  - Hover Green: `#1E4D38`
  - Pastel Tint / Badge: `#EAF5EE`
  - Soft Accent: `#D8F3DC`
  - Border: `#D5E5DA`
  - Text Primary: `#1C2B21`
  - Text Secondary: `#506658`
  - Error Accent: `#D9383A`
  - Focus Ring: `0 0 0 3px rgba(45, 106, 79, 0.18)`
- **Typography:** Plus Jakarta Sans (Google Fonts) with system sans-serif fallback.
- **Responsiveness:** Mobile-first layout seamlessly scaling from 320px smartphones to wide desktop monitors.

---

## 📂 File Structure

```
├── index.html       # Semantic HTML5 markup, form controls, and accessible labels
├── style.css        # Clean CSS3 design system, responsive layout, and transitions
├── script.js        # Vanilla JavaScript validation logic, strength meter, and UI states
└── README.md        # Project documentation and guide
```

---

## 🚀 Getting Started

### Local Setup
1. Clone or download this repository:
   ```bash
   git clone https://github.com/dharmarayank946/Signup-Form-Validation.git
   ```
2. Open the directory:
   ```bash
   cd Signup-Form-Validation
   ```
3. Open `index.html` in any modern web browser:
   - On Windows: Double-click `index.html` or open in Chrome/Edge/Firefox.
   - Or use VS Code Live Server extension.

### Deploying to GitHub Pages
1. Push this project folder to your GitHub repository.
2. Go to **Settings** > **Pages** in your repository.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo-name>/`.

---

## 🧪 Validation Test Cases

| Test Case | Input | Expected Result |
| :--- | :--- | :--- |
| **Empty Submission** | All fields blank | All 3 inline errors appear; focus shifts to Name input |
| **Invalid Name** | `J` or `John123` | Inline error: "Name must be at least 2 characters long" / "can only contain letters..." |
| **Valid Name** | `Jane Doe` | Error clears; green checkmark appears |
| **Invalid Email** | `jane.doe@` or `test` | Inline error: "Please enter a valid email address..." |
| **Valid Email** | `jane.doe@example.com` | Error clears; green checkmark appears |
| **Weak Password** | `pass` | Strength shows "Weak", 1 orange segment; missing checklist items unchecked |
| **Medium Password**| `Password123` | Strength shows "Medium", 2 amber segments; special symbol remaining |
| **Strong Password**| `Secure#2026Pass` | Strength shows "Strong", 3 green segments; all checklist items met |
| **Show/Hide Password** | Click eye toggle | Input type switches between `password` and `text` with updated icon |
| **Valid Form Submit**| All fields valid | Form disappears; personalized verified success screen appears |

---

## 📄 License
This project is open-source and free to use for educational and development purposes.
