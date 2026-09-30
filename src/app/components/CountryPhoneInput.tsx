"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
  getExampleNumber,
  isValidPhoneNumber,
  validatePhoneNumberLength,
} from "libphonenumber-js";
import examples from "libphonenumber-js/examples.mobile.json";

export interface CountryItem {
  code: CountryCode;
  name: string;
  dialCode: string;
  maxLen: number;
  flag: string;
}

// Convert ISO 2-letter country code to flag emoji
function getCountryFlagEmoji(countryCode: string): string {
  try {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  } catch {
    return "🌐";
  }
}

// Build standard country metadata using Intl.DisplayNames and libphonenumber-js
function buildCountryList(): CountryItem[] {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });
  const allCodes = getCountries();

  const priorityCodes = new Set(["IN", "US", "GB", "AE", "CA", "AU", "SG", "DE", "SA"]);

  const items: CountryItem[] = allCodes.map((code) => {
    let name = code as string;
    try {
      name = regionNames.of(code) || code;
    } catch {
      name = code;
    }
    const dialCode = `+${getCountryCallingCode(code)}`;
    const ex = getExampleNumber(code, examples);
    const maxLen = ex ? ex.nationalNumber.length : 15;
    const flag = getCountryFlagEmoji(code);

    return {
      code,
      name,
      dialCode,
      maxLen,
      flag,
    };
  });

  // Sort: Priority countries first, then alphabetically
  const priorityList = items
    .filter((item) => priorityCodes.has(item.code))
    .sort((a, b) => {
      const order = ["IN", "US", "GB", "AE", "CA", "AU", "SG", "DE", "SA"];
      return order.indexOf(a.code) - order.indexOf(b.code);
    });

  const remainingList = items
    .filter((item) => !priorityCodes.has(item.code))
    .sort((a, b) => a.name.localeCompare(b.name));

  return [...priorityList, ...remainingList];
}

const ALL_COUNTRIES = buildCountryList();
const COUNTRY_MAP = new Map<CountryCode, CountryItem>(
  ALL_COUNTRIES.map((c) => [c.code, c])
);

/**
 * Validates a national phone number according to country rules.
 * Returns null if valid, or a descriptive error message if invalid.
 */
export function validatePhoneForCountry(
  phone: string,
  countryCode: CountryCode = "IN",
  customCountryName?: string
): string | null {
  const trimmed = (phone || "").trim();
  if (!trimmed) {
    return "Phone Number is required.";
  }

  const cleanDigits = trimmed.replace(/\D/g, "");
  const country = COUNTRY_MAP.get(countryCode);
  const countryName = customCountryName || country?.name || countryCode;
  const expectedLen = country?.maxLen || 10;

  // Strict check for India (10 digits)
  if (countryCode === "IN") {
    if (cleanDigits.length !== 10) {
      return "Phone Number must be exactly 10 digits for India.";
    }
    if (!isValidPhoneNumber(cleanDigits, "IN")) {
      return "Enter a valid 10-digit Indian phone number.";
    }
    return null;
  }

  // Length validation for other countries
  const lengthError = validatePhoneNumberLength(cleanDigits, countryCode);
  if (lengthError === "TOO_SHORT") {
    return `Phone number is too short for ${countryName} (${expectedLen} digits expected).`;
  }
  if (lengthError === "TOO_LONG") {
    return `Phone number cannot exceed ${expectedLen} digits for ${countryName}.`;
  }

  // Full format validation
  if (!isValidPhoneNumber(cleanDigits, countryCode)) {
    return `Enter a valid phone number for ${countryName}.`;
  }

  return null;
}

export interface CountryPhoneInputProps {
  id?: string;
  value: string;
  onChange: (
    nationalNumber: string,
    fullNumberWithDialCode: string,
    country: CountryItem
  ) => void;
  selectedCountry?: CountryCode;
  onCountryChange?: (country: CountryItem) => void;
  error?: string;
  placeholder?: string;
  variant?: "modal" | "contact";
  required?: boolean;
  disabled?: boolean;
}

export default function CountryPhoneInput({
  id = "phone-input",
  value,
  onChange,
  selectedCountry = "IN",
  onCountryChange,
  error,
  placeholder,
  variant = "contact",
  required = false,
  disabled = false,
}: CountryPhoneInputProps) {
  const [currentCountryCode, setCurrentCountryCode] = useState<CountryCode>(selectedCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);

  // Sync if prop changes externally
  useEffect(() => {
    if (selectedCountry && selectedCountry !== currentCountryCode) {
      setCurrentCountryCode(selectedCountry);
    }
  }, [selectedCountry, currentCountryCode]);

  const currentCountry = useMemo(() => {
    return COUNTRY_MAP.get(currentCountryCode) || COUNTRY_MAP.get("IN")!;
  }, [currentCountryCode]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Filter countries by query (name, code, or dial code)
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ALL_COUNTRIES;

    const queryClean = q.replace(/^\+/, "");
    return ALL_COUNTRIES.filter((c) => {
      return (
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.dialCode.includes(queryClean) ||
        c.dialCode.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  const handleSelectCountry = useCallback(
    (country: CountryItem) => {
      setCurrentCountryCode(country.code);
      setIsOpen(false);
      setSearchQuery("");
      onCountryChange?.(country);

      // Truncate existing digits if they exceed the new country's maximum
      const trimmedValue = value.slice(0, country.maxLen);
      const full = trimmedValue ? `${country.dialCode} ${trimmedValue}` : "";
      onChange(trimmedValue, full, country);

      // Refocus phone number input
      setTimeout(() => {
        numberInputRef.current?.focus();
      }, 50);
    },
    [value, onChange, onCountryChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Strip non-digits and cap at selected country's max length
    const clean = raw.replace(/\D/g, "").slice(0, currentCountry.maxLen);
    const full = clean ? `${currentCountry.dialCode} ${clean}` : "";
    onChange(clean, full, currentCountry);
  };

  const dynamicPlaceholder =
    placeholder ||
    (currentCountry.code === "IN"
      ? "Enter 10-digit number"
      : `Enter ${currentCountry.maxLen}-digit number`);

  const isModal = variant === "modal";

  return (
    <div
      ref={containerRef}
      className={`cpi-wrapper ${isModal ? "cpi-modal-theme" : "cpi-contact-theme"}`}
    >
      <style>{`
        .cpi-wrapper {
          position: relative;
          width: 100%;
          font-family: 'Inter', sans-serif;
        }

        .cpi-row {
          display: flex;
          align-items: stretch;
          width: 100%;
          gap: 8px;
        }

        /* ── Trigger Button (Prefix) ── */
        .cpi-trigger-btn {
          display: inline-flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
          border: none;
          outline: none;
          cursor: pointer;
          user-select: none;
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          flex-shrink: 0;
        }

        /* Modal theme styling (White background with violet accents) */
        .cpi-modal-theme .cpi-trigger-btn {
          height: 46px;
          min-width: 96px;
          padding: 0 10px;
          background: #FFFFFF;
          border: 1px solid rgba(178, 178, 178, 0.85);
          border-radius: 9px;
          color: #744FE7;
          font-weight: 600;
          font-size: 13.5px;
        }
        .cpi-modal-theme .cpi-trigger-btn:hover {
          border-color: #744FE7;
          background: rgba(116, 79, 231, 0.04);
        }
        .cpi-modal-theme .cpi-trigger-btn.active {
          border-color: #744FE7;
          box-shadow: 0 0 0 3px rgba(116, 79, 231, 0.12);
        }

        /* Contact theme styling (Translucent lilac on light card) */
        .cpi-contact-theme .cpi-trigger-btn {
          height: 52px;
          min-width: 104px;
          padding: 0 14px;
          background: rgba(140, 132, 166, 0.21);
          border: 1.5px solid transparent;
          border-radius: 6px;
          color: #111111;
          font-weight: 600;
          font-size: 14px;
        }
        .cpi-contact-theme .cpi-trigger-btn:hover {
          background: rgba(140, 132, 166, 0.32);
        }
        .cpi-contact-theme .cpi-trigger-btn.active {
          background: rgba(140, 132, 166, 0.32);
          box-shadow: 0 0 0 2px rgba(153, 120, 255, 0.4);
        }

        /* Flag Image & Fallback */
        .cpi-flag-img {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 0 1px rgba(0,0,0,0.4);
          flex-shrink: 0;
        }
        .cpi-flag-emoji {
          font-size: 16px;
          line-height: 1;
        }

        .cpi-dial-code {
          letter-spacing: 0.01em;
          white-space: nowrap;
        }

        .cpi-chevron {
          width: 12px;
          height: 12px;
          transition: transform 0.2s ease;
          opacity: 0.65;
          flex-shrink: 0;
        }
        .cpi-trigger-btn.active .cpi-chevron {
          transform: rotate(180deg);
        }

        /* ── Input Box ── */
        .cpi-input {
          flex: 1;
          box-sizing: border-box;
          outline: none;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.02em;
          transition: background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
        }

        /* Modal theme input */
        .cpi-modal-theme .cpi-input {
          height: 46px;
          background: #FFFFFF;
          border: 1px solid rgba(178, 178, 178, 0.85);
          border-radius: 9px;
          padding: 0 16px;
          color: #141415;
          font-size: 13.5px;
        }
        .cpi-modal-theme .cpi-input::placeholder {
          color: rgba(46, 46, 47, 0.45);
        }
        .cpi-modal-theme .cpi-input:focus {
          border-color: #744FE7;
          box-shadow: 0 0 0 3px rgba(116, 79, 231, 0.12);
        }
        .cpi-modal-theme .cpi-input.error {
          border-color: #E53935 !important;
          background: #FFFDFD;
        }

        /* Contact theme input */
        .cpi-contact-theme .cpi-input {
          height: 52px;
          background: rgba(140, 132, 166, 0.21);
          border: 1.5px solid transparent;
          border-radius: 6px;
          padding: 0 18px;
          color: #111111;
          font-size: 14px;
        }
        .cpi-contact-theme .cpi-input::placeholder {
          color: rgba(17, 16, 21, 0.45);
        }
        .cpi-contact-theme .cpi-input:focus {
          background: rgba(140, 132, 166, 0.32);
          box-shadow: 0 0 0 2px rgba(153, 120, 255, 0.4);
        }
        .cpi-contact-theme .cpi-input.error {
          border-color: #E53935 !important;
          background: rgba(229, 57, 53, 0.04);
        }

        /* ── Dropdown Panel ── */
        .cpi-dropdown {
          position: absolute;
          top: calc(100% + 6px);
          left: 0;
          width: min(340px, 92vw);
          max-height: 340px;
          background: #FFFFFF;
          border: 1px solid rgba(116, 79, 231, 0.24);
          border-radius: 12px;
          box-shadow: 0 14px 40px rgba(18, 9, 45, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
          z-index: 999999;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          animation: cpiSlideDown 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes cpiSlideDown {
          from {
            opacity: 0;
            transform: translateY(-8px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Search Header */
        .cpi-search-header {
          padding: 10px 12px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
          background: #F9F8FD;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .cpi-search-icon {
          color: #744FE7;
          opacity: 0.7;
          flex-shrink: 0;
        }

        .cpi-search-input {
          flex: 1;
          border: none;
          background: transparent;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #111111;
          outline: none;
          padding: 2px 0;
        }
        .cpi-search-input::placeholder {
          color: rgba(0, 0, 0, 0.4);
        }

        .cpi-search-clear {
          background: transparent;
          border: none;
          cursor: pointer;
          color: rgba(0, 0, 0, 0.4);
          font-size: 16px;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 4px;
        }
        .cpi-search-clear:hover {
          color: #744FE7;
          background: rgba(116, 79, 231, 0.08);
        }

        /* Country Items List */
        .cpi-list {
          overflow-y: auto;
          max-height: 270px;
          padding: 6px 0;
          margin: 0;
          list-style: none;
        }

        .cpi-list::-webkit-scrollbar {
          width: 6px;
        }
        .cpi-list::-webkit-scrollbar-thumb {
          background: rgba(116, 79, 231, 0.2);
          border-radius: 4px;
        }
        .cpi-list::-webkit-scrollbar-thumb:hover {
          background: rgba(116, 79, 231, 0.4);
        }

        .cpi-item {
          padding: 8px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: background 0.15s ease;
          user-select: none;
        }
        .cpi-item:hover {
          background: rgba(116, 79, 231, 0.08);
        }
        .cpi-item.selected {
          background: rgba(116, 79, 231, 0.14);
        }

        .cpi-item-flag {
          width: 20px;
          height: 14px;
          object-fit: cover;
          border-radius: 2px;
          box-shadow: 0 0 1px rgba(0,0,0,0.3);
          flex-shrink: 0;
        }

        .cpi-item-name {
          flex: 1;
          font-size: 13px;
          font-weight: 500;
          color: #111111;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cpi-item-code {
          font-size: 12.5px;
          font-weight: 600;
          color: #744FE7;
          white-space: nowrap;
        }

        .cpi-item-check {
          color: #744FE7;
          font-size: 14px;
          font-weight: 700;
        }

        .cpi-no-results {
          padding: 24px 16px;
          text-align: center;
          font-size: 13px;
          color: rgba(0, 0, 0, 0.5);
        }

        /* Error Text */
        .cpi-error-text {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 11.5px;
          color: #E53935;
          margin-top: 5px;
          font-weight: 500;
          line-height: 1.3;
        }
      `}</style>

      <div className="cpi-row">
        {/* Country code prefix trigger button */}
        <button
          type="button"
          className={`cpi-trigger-btn ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen((prev) => !prev)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-label={`Select country code, currently ${currentCountry.name} (${currentCountry.dialCode})`}
        >
          {/* Flag */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w40/${currentCountry.code.toLowerCase()}.png`}
            alt=""
            className="cpi-flag-img"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const next = e.currentTarget.nextElementSibling as HTMLElement;
              if (next) next.style.display = "inline";
            }}
          />
          <span className="cpi-flag-emoji" style={{ display: "none" }}>
            {currentCountry.flag}
          </span>

          {/* Dial code */}
          <span className="cpi-dial-code">{currentCountry.dialCode}</span>

          {/* Chevron */}
          <svg
            className="cpi-chevron"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* National Number Input */}
        <input
          ref={numberInputRef}
          id={id}
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={currentCountry.maxLen}
          className={`cpi-input ${error ? "error" : ""}`}
          value={value}
          onChange={handleInputChange}
          placeholder={dynamicPlaceholder}
          required={required}
          disabled={disabled}
          autoComplete="tel-national"
        />
      </div>

      {/* Error message */}
      {error && <span className="cpi-error-text">{error}</span>}

      {/* Searchable Country Dropdown */}
      {isOpen && (
        <div ref={dropdownRef} className="cpi-dropdown" role="listbox">
          {/* Search bar */}
          <div className="cpi-search-header">
            <svg
              className="cpi-search-icon"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="cpi-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search country or code..."
              aria-label="Search country or dial code"
            />
            {searchQuery && (
              <button
                type="button"
                className="cpi-search-clear"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>

          {/* Country List */}
          <ul className="cpi-list">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => {
                const isSelected = country.code === currentCountry.code;
                return (
                  <li
                    key={country.code}
                    className={`cpi-item ${isSelected ? "selected" : ""}`}
                    onClick={() => handleSelectCountry(country)}
                    role="option"
                    aria-selected={isSelected}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                      alt=""
                      className="cpi-item-flag"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        const next = e.currentTarget.nextElementSibling as HTMLElement;
                        if (next) next.style.display = "inline";
                      }}
                    />
                    <span className="cpi-flag-emoji" style={{ display: "none" }}>
                      {country.flag}
                    </span>
                    <span className="cpi-item-name">{country.name}</span>
                    <span className="cpi-item-code">{country.dialCode}</span>
                    {isSelected && <span className="cpi-item-check">✓</span>}
                  </li>
                );
              })
            ) : (
              <li className="cpi-no-results">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
