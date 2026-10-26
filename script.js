/**
 * Signup Form with Validation
 * Vanilla JavaScript (ES6+) Implementation
 * 
 * Features:
 * - Real-time and on-submit validation for Name, Email, and Password
 * - Regular expression verification for standard email formats
 * - Name length and valid character set validation
 * - Dynamic Password Strength Meter (Weak, Medium, Strong)
 * - Live interactive checklist for password complexity requirements
 * - Accessible Show / Hide Password toggle
 * - Instant error clearing upon user correction
 * - Inline accessible success screen upon verification
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const signupForm = document.getElementById('signupForm');
  const nameInput = document.getElementById('fullName');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');

  // Error Containers
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const passwordError = document.getElementById('passwordError');

  // Password Strength Meter Elements
  const strengthBadge = document.getElementById('strengthBadge');
  const seg1 = document.getElementById('seg1');
  const seg2 = document.getElementById('seg2');
  const seg3 = document.getElementById('seg3');

  // Password Requirements Elements
  const reqLength = document.getElementById('reqLength');
  const reqUppercase = document.getElementById('reqUppercase');
  const reqLowercase = document.getElementById('reqLowercase');
  const reqNumber = document.getElementById('reqNumber');
  const reqSpecial = document.getElementById('reqSpecial');

  // Success Card Elements
  const successCard = document.getElementById('successCard');
  const successDisplayName = document.getElementById('successDisplayName');
  const summaryName = document.getElementById('summaryName');
  const summaryEmail = document.getElementById('summaryEmail');
  const resetFormBtn = document.getElementById('resetFormBtn');

  // Validation Patterns
  // Name: letters, spaces, hyphens, and apostrophes (2 to 50 chars)
  const NAME_REGEX = /^[A-Za-z\s'-]{2,50}$/;
  // Email: RFC-compliant standard format
  const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  // Special characters: common symbols
  const SPECIAL_CHAR_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/;

  // Track if user has attempted to submit (to tune error reactivity)
  let hasSubmitted = false;

  // ==========================================================================
  // Validation Logic
  // ==========================================================================

  /**
   * Validate Full Name
   * @returns {Object} { isValid: boolean, message: string }
   */
  function validateName() {
    const value = nameInput.value.trim();

    if (!value) {
      return { isValid: false, message: 'Full name is required.' };
    }

    if (value.length < 2) {
      return { isValid: false, message: 'Name must be at least 2 characters long.' };
    }

    if (!NAME_REGEX.test(value)) {
      return { 
        isValid: false, 
        message: 'Name can only contain letters, spaces, hyphens, and apostrophes.' 
      };
    }

    return { isValid: true, message: '' };
  }

  /**
   * Validate Email Address
   * @returns {Object} { isValid: boolean, message: string }
   */
  function validateEmail() {
    const value = emailInput.value.trim();

    if (!value) {
      return { isValid: false, message: 'Email address is required.' };
    }

    if (!EMAIL_REGEX.test(value)) {
      return { 
        isValid: false, 
        message: 'Please enter a valid email address (e.g. name@example.com).' 
      };
    }

    return { isValid: true, message: '' };
  }

  /**
   * Check Individual Password Criteria
   * @param {string} value 
   * @returns {Object} Criteria booleans
   */
  function getPasswordCriteria(value) {
    return {
      length: value.length >= 8,
      uppercase: /[A-Z]/.test(value),
      lowercase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      special: SPECIAL_CHAR_REGEX.test(value)
    };
  }

  /**
   * Validate Password against all rules
   * @returns {Object} { isValid: boolean, message: string }
   */
  function validatePassword() {
    const value = passwordInput.value;

    if (!value) {
      return { isValid: false, message: 'Password is required.' };
    }

    const criteria = getPasswordCriteria(value);

    if (!criteria.length) {
      return { isValid: false, message: 'Password must be at least 8 characters long.' };
    }

    const missing = [];
    if (!criteria.uppercase) missing.push('an uppercase letter');
    if (!criteria.lowercase) missing.push('a lowercase letter');
    if (!criteria.number) missing.push('a number');
    if (!criteria.special) missing.push('a special character');

    if (missing.length > 0) {
      return { 
        isValid: false, 
        message: `Password must include ${missing.join(', ')}.` 
      };
    }

    return { isValid: true, message: '' };
  }

  // ==========================================================================
  // UI Display & Error Handling
  // ==========================================================================

  /**
   * Display an inline error message for a specific input field
   * @param {HTMLInputElement} input 
   * @param {HTMLElement} errorElement 
   * @param {string} message 
   */
  function showFieldError(input, errorElement, message) {
    input.classList.add('has-error');
    input.classList.remove('is-valid');
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }

  /**
   * Clear error message and mark field valid if applicable
   * @param {HTMLInputElement} input 
   * @param {HTMLElement} errorElement 
   * @param {boolean} markValid 
   */
  function clearFieldError(input, errorElement, markValid = true) {
    input.classList.remove('has-error');
    input.setAttribute('aria-invalid', 'false');
    errorElement.textContent = '';
    errorElement.classList.remove('visible');

    if (markValid && input.value.trim().length > 0) {
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
    }
  }

  // ==========================================================================
  // Live Password Strength & Criteria Checklist Updater
  // ==========================================================================

  /**
   * Update the live password strength meter and checklist UI
   */
  function updatePasswordStrength() {
    const value = passwordInput.value;
    const criteria = getPasswordCriteria(value);

    // Update requirements checklist
    updateRequirementItem(reqLength, criteria.length);
    updateRequirementItem(reqUppercase, criteria.uppercase);
    updateRequirementItem(reqLowercase, criteria.lowercase);
    updateRequirementItem(reqNumber, criteria.number);
    updateRequirementItem(reqSpecial, criteria.special);

    // Reset segments
    seg1.className = 'strength-segment';
    seg2.className = 'strength-segment';
    seg3.className = 'strength-segment';
    strengthBadge.className = 'strength-badge';

    if (!value) {
      strengthBadge.textContent = 'None';
      return;
    }

    // Calculate score
    let score = 0;
    if (criteria.length) score++;
    if (criteria.uppercase) score++;
    if (criteria.lowercase) score++;
    if (criteria.number) score++;
    if (criteria.special) score++;

    // Evaluate strength level:
    // Strong: must meet min 8 characters and all 4 complexity criteria (score === 5)
    // Medium: at least 8 characters and meeting 3 or 4 criteria total
    // Weak: less than 8 characters, or meeting 1-2 criteria
    if (criteria.length && score === 5) {
      // Strong
      strengthBadge.textContent = 'Strong';
      strengthBadge.classList.add('strong');
      seg1.classList.add('active-strong');
      seg2.classList.add('active-strong');
      seg3.classList.add('active-strong');
    } else if (criteria.length && score >= 3) {
      // Medium
      strengthBadge.textContent = 'Medium';
      strengthBadge.classList.add('medium');
      seg1.classList.add('active-medium');
      seg2.classList.add('active-medium');
    } else {
      // Weak
      strengthBadge.textContent = 'Weak';
      strengthBadge.classList.add('weak');
      seg1.classList.add('active-weak');
    }
  }

  /**
   * Helper to update visual checklist state
   * @param {HTMLElement} item 
   * @param {boolean} isMet 
   */
  function updateRequirementItem(item, isMet) {
    if (isMet) {
      item.classList.add('met');
    } else {
      item.classList.remove('met');
    }
  }

  // ==========================================================================
  // Event Listeners for Live Correction & Feedback
  // ==========================================================================

  // --- Name Input Listeners ---
  nameInput.addEventListener('input', () => {
    const result = validateName();
    if (result.isValid) {
      clearFieldError(nameInput, nameError, true);
    } else if (hasSubmitted || nameInput.classList.contains('has-error')) {
      showFieldError(nameInput, nameError, result.message);
    }
  });

  nameInput.addEventListener('blur', () => {
    // Validate on blur if user entered anything or has already submitted
    if (nameInput.value.trim().length > 0 || hasSubmitted) {
      const result = validateName();
      if (result.isValid) {
        clearFieldError(nameInput, nameError, true);
      } else {
        showFieldError(nameInput, nameError, result.message);
      }
    }
  });

  // --- Email Input Listeners ---
  emailInput.addEventListener('input', () => {
    const result = validateEmail();
    if (result.isValid) {
      clearFieldError(emailInput, emailError, true);
    } else if (hasSubmitted || emailInput.classList.contains('has-error')) {
      showFieldError(emailInput, emailError, result.message);
    }
  });

  emailInput.addEventListener('blur', () => {
    if (emailInput.value.trim().length > 0 || hasSubmitted) {
      const result = validateEmail();
      if (result.isValid) {
        clearFieldError(emailInput, emailError, true);
      } else {
        showFieldError(emailInput, emailError, result.message);
      }
    }
  });

  // --- Password Input Listeners ---
  passwordInput.addEventListener('input', () => {
    // Always update live strength meter & checklist
    updatePasswordStrength();

    const result = validatePassword();
    if (result.isValid) {
      clearFieldError(passwordInput, passwordError, true);
    } else if (hasSubmitted || passwordInput.classList.contains('has-error')) {
      showFieldError(passwordInput, passwordError, result.message);
    }
  });

  passwordInput.addEventListener('blur', () => {
    if (passwordInput.value.length > 0 || hasSubmitted) {
      const result = validatePassword();
      if (result.isValid) {
        clearFieldError(passwordInput, passwordError, true);
      } else {
        showFieldError(passwordInput, passwordError, result.message);
      }
    }
  });

  // --- Show / Hide Password Toggle ---
  togglePasswordBtn.addEventListener('click', () => {
    const isPassword = passwordInput.getAttribute('type') === 'password';
    if (isPassword) {
      passwordInput.setAttribute('type', 'text');
      togglePasswordBtn.classList.add('is-visible');
      togglePasswordBtn.setAttribute('aria-label', 'Hide password');
      togglePasswordBtn.setAttribute('title', 'Hide password');
    } else {
      passwordInput.setAttribute('type', 'password');
      togglePasswordBtn.classList.remove('is-visible');
      togglePasswordBtn.setAttribute('aria-label', 'Show password');
      togglePasswordBtn.setAttribute('title', 'Show password');
    }
    // Return focus to password input for smooth keyboard experience
    passwordInput.focus();
  });

  // ==========================================================================
  // Form Submission
  // ==========================================================================
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    hasSubmitted = true;

    // Validate all fields
    const nameResult = validateName();
    const emailResult = validateEmail();
    const passwordResult = validatePassword();

    let firstInvalidInput = null;

    // Process Name
    if (!nameResult.isValid) {
      showFieldError(nameInput, nameError, nameResult.message);
      if (!firstInvalidInput) firstInvalidInput = nameInput;
    } else {
      clearFieldError(nameInput, nameError, true);
    }

    // Process Email
    if (!emailResult.isValid) {
      showFieldError(emailInput, emailError, emailResult.message);
      if (!firstInvalidInput) firstInvalidInput = emailInput;
    } else {
      clearFieldError(emailInput, emailError, true);
    }

    // Process Password
    if (!passwordResult.isValid) {
      showFieldError(passwordInput, passwordError, passwordResult.message);
      if (!firstInvalidInput) firstInvalidInput = passwordInput;
    } else {
      clearFieldError(passwordInput, passwordError, true);
    }

    // If any validation failed, halt submission and focus the first invalid field
    if (firstInvalidInput) {
      firstInvalidInput.focus();
      return;
    }

    // All validation passed successfully!
    const submittedName = nameInput.value.trim();
    const submittedEmail = emailInput.value.trim();

    // Populate success card details
    successDisplayName.textContent = submittedName.split(' ')[0] || submittedName;
    summaryName.textContent = submittedName;
    summaryEmail.textContent = submittedEmail;

    // Transition from form to success view
    signupForm.style.display = 'none';
    successCard.classList.remove('hidden');

    // Move focus to success card header for screen reader announcement
    successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });

  // ==========================================================================
  // Reset / Sign Up Another Account
  // ==========================================================================
  resetFormBtn.addEventListener('click', () => {
    // Reset flags
    hasSubmitted = false;

    // Reset form fields
    signupForm.reset();

    // Reset password visibility if it was revealed
    passwordInput.setAttribute('type', 'password');
    togglePasswordBtn.classList.remove('is-visible');
    togglePasswordBtn.setAttribute('aria-label', 'Show password');
    togglePasswordBtn.setAttribute('title', 'Show password');

    // Clear all field styles and error messages
    clearFieldError(nameInput, nameError, false);
    clearFieldError(emailInput, emailError, false);
    clearFieldError(passwordInput, passwordError, false);

    // Reset strength meter and checklist
    updatePasswordStrength();

    // Switch views
    successCard.classList.add('hidden');
    signupForm.style.display = 'flex';

    // Focus name input for user convenience
    nameInput.focus();
  });
});
