import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
:root {
  /* Indigo */
 

  /* Grey */
   &, &.light-mode {

	--color-grey-0: #fff;
  --color-grey-50: #f9fafb;
  --color-grey-100: #f3f4f6;
  --color-grey-200: #e5e7eb;
  --color-grey-300: #d1d5db;
  --color-grey-400: #9ca3af;
  --color-grey-500: #6b7280;
  --color-grey-600: #4b5563;
  --color-grey-700: #374151;
  --color-grey-800: #1f2937;
  --color-grey-900: #111827;

  --color-blue-100: #e0f2fe;
  --color-blue-700: #0369a1;
  --color-green-100: #dcfce7;
  --color-green-700: #15803d;
  --color-yellow-100: #fef9c3;
  --color-yellow-700: #a16207;
  --color-silver-100: #e5e7eb;
  --color-silver-700: #374151;
  --color-indigo-100: #e0e7ff;
  --color-indigo-700: #4338ca;

  --color-red-100: #fee2e2;
  --color-red-700: #b91c1c;
  --color-red-800: #991b1b;

  --backdrop-color: rgba(255, 255, 255, 0.1);

  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
  --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
  --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);

  --image-grayscale: 0;
  --image-opacity: 100%;

   }
  

  &.dark-mode {
	--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
  }

  --color-brand-50: #eef2ff;
  --color-brand-100: #e0e7ff;
  --color-brand-200: #c7d2fe;
  --color-brand-500: #6366f1;
  --color-brand-600: #4f46e5;
  --color-brand-700: #4338ca;
  --color-brand-800: #3730a3;
  --color-brand-900: #312e81;

  --border-radius-tiny: 3px;
  --border-radius-sm: 5px;
  --border-radius-md: 7px;
  --border-radius-lg: 9px;

  /* For dark mode */
  
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
}

html {
  font-size: 62.5%;
}

body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);

  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

input[type="checkbox"] {
  height: 2.4rem;
  width: 2.4rem;
  cursor: pointer;
  border-radius: 0.4rem;
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  
  /* Remove default appearance */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  /* Custom checkmark */
  position: relative;
  display: inline-block;
}

input[type="checkbox"]:checked {
  background-color: var(--color-brand-600);
  border-color: var(--color-brand-600);
}

input[type="checkbox"]:checked::after {
  content: "✓";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
}

input[type="checkbox"]:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: 2px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
}



/* DatePicker Input Styling */
.react-datepicker-wrapper {
  width: 100% !important;
  max-width: 100% !important;
  display: block !important;
}

.react-datepicker__input-container {
  width: 100% !important;
  max-width: 100% !important;
  display: block !important;
}

.react-datepicker__input-container input {
  width: 100% !important;
  max-width: 100% !important;
  min-width: 0 !important;
  box-sizing: border-box !important;
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  font-size: 1.4rem;
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  transition: background-color 0.3s, border-color 0.3s, color 0.3s;
}

.react-datepicker__input-container input::placeholder {
  color: var(--color-grey-400);
}

.react-datepicker__input-container input:focus {
  outline: none;
  border-color: var(--color-brand-600);
}

/* CRITICAL: Remove calendar from document flow */
.react-datepicker-popper {
  z-index: 9999 !important;
}

.react-datepicker-popper[data-placement^="bottom"] {
  margin-top: 0.4rem;
}

.react-datepicker {
  font-family: inherit;
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  font-size: 1.4rem;
}

.react-datepicker__triangle {
  display: none;
}

/* Header */
.react-datepicker__header {
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-300);
  border-top-left-radius: var(--border-radius-md);
  border-top-right-radius: var(--border-radius-md);
  padding-top: 1rem;
}

.react-datepicker__current-month {
  color: var(--color-grey-800);
  font-weight: 600;
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}

.react-datepicker__day-names {
  display: flex;
  justify-content: space-around;
  margin-bottom: 0.5rem;
}

.react-datepicker__day-name {
  color: var(--color-grey-600);
  font-weight: 600;
  width: 3.2rem;
  line-height: 3.2rem;
  margin: 0.2rem;
  font-size: 1.2rem;
}

/* Navigation Arrows */
.react-datepicker__navigation {
  top: 1.2rem;
  width: 3rem;
  height: 3rem;
  border: none;
  background-color: transparent;
  line-height: 3rem;
  text-align: center;
}

.react-datepicker__navigation:hover {
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
}

.react-datepicker__navigation-icon::before {
  border-color: var(--color-grey-700);
  border-width: 2px 2px 0 0;
  top: 1rem;
}

/* Month Container */
.react-datepicker__month-container {
  background-color: var(--color-grey-0);
}

.react-datepicker__month {
  margin: 1rem;
}

.react-datepicker__week {
  display: flex;
  justify-content: space-around;
}

/* Days */
.react-datepicker__day {
  color: var(--color-grey-700);
  width: 3.2rem;
  line-height: 3.2rem;
  margin: 0.2rem;
  border-radius: var(--border-radius-sm);
  font-size: 1.3rem;
  transition: background-color 0.2s, color 0.2s;
}

.react-datepicker__day:hover {
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-sm);
}

.react-datepicker__day--selected,
.react-datepicker__day--in-selecting-range,
.react-datepicker__day--in-range,
.react-datepicker__day--keyboard-selected {
  background-color: var(--color-brand-600) !important;
  color: var(--color-brand-50) !important;
  font-weight: 600;
}

.react-datepicker__day--range-start,
.react-datepicker__day--range-end {
  background-color: var(--color-brand-700) !important;
  color: var(--color-brand-50) !important;
}

.react-datepicker__day--disabled {
  color: var(--color-grey-400) !important;
  cursor: not-allowed;
  text-decoration: line-through;
}

.react-datepicker__day--disabled:hover {
  background-color: transparent !important;
}

.react-datepicker__day--outside-month {
  color: var(--color-grey-400);
}

.react-datepicker__day--today {
  font-weight: 700;
  border: 2px solid var(--color-brand-600);
}



img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}

/*
FOR DARK MODE

--color-grey-0: #18212f;
--color-grey-50: #111827;
--color-grey-100: #1f2937;
--color-grey-200: #374151;
--color-grey-300: #4b5563;
--color-grey-400: #6b7280;
--color-grey-500: #9ca3af;
--color-grey-600: #d1d5db;
--color-grey-700: #e5e7eb;
--color-grey-800: #f3f4f6;
--color-grey-900: #f9fafb;

--color-blue-100: #075985;
--color-blue-700: #e0f2fe;
--color-green-100: #166534;
--color-green-700: #dcfce7;
--color-yellow-100: #854d0e;
--color-yellow-700: #fef9c3;
--color-silver-100: #374151;
--color-silver-700: #f3f4f6;
--color-indigo-100: #3730a3;
--color-indigo-700: #e0e7ff;

--color-red-100: #fee2e2;
--color-red-700: #b91c1c;
--color-red-800: #991b1b;

--backdrop-color: rgba(0, 0, 0, 0.3);

--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
--shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
--shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);

--image-grayscale: 10%;
--image-opacity: 90%;
*/
`;

export default GlobalStyles;
