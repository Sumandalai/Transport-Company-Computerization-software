"use client";
import React, { useState, useEffect } from "react";

interface CountryCode {
  code: string;
  label: string;
}

interface PhoneInputProps {
  countries: CountryCode[];
  placeholder?: string;
  onChange?: (phoneNumber: string) => void;
  selectPosition?: "start" | "end";
  value?: string; // Added value prop
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  countries,
  placeholder = "+1 (555) 000-0000",
  onChange,
  selectPosition = "start",
  value: propValue,
}) => {
  // State for uncontrolled mode
  const [internalValue, setInternalValue] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  // Determine if component is controlled
  const isControlled = propValue !== undefined;
  const phoneNumber = isControlled ? propValue : internalValue;

  // Country code mapping and initialization
  const countryCodes = countries.reduce(
    (acc, country) => ({ ...acc, [country.code]: country.label }),
    {} as Record<string, string>
  );

  // Update country when value changes
  useEffect(() => {
    if (isControlled) {
      const findCountry = (number: string) => {
        const sortedCountries = [...countries].sort(
          (a, b) => b.label.length - a.label.length
        );
        return (
          sortedCountries.find((c) => number.startsWith(c.label))?.code || "US"
        );
      };

      const newCountry = findCountry(phoneNumber);
      setSelectedCountry(newCountry);
    }
  }, [phoneNumber, countries, isControlled]);

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountry = e.target.value;
    const newDialCode = countryCodes[newCountry];
    const oldDialCode = countryCodes[selectedCountry];
    
    // Preserve the number part when changing country code
    const numberPart = phoneNumber.replace(oldDialCode, "");
    const newPhoneNumber = newDialCode + numberPart;

    setSelectedCountry(newCountry);
    updatePhoneNumber(newPhoneNumber);
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    updatePhoneNumber(newNumber);
  };

  const updatePhoneNumber = (newNumber: string) => {
    if (!isControlled) {
      setInternalValue(newNumber);
    }
    onChange?.(newNumber);
  };

  return (
    <div className="relative flex">
      {selectPosition === "start" && (
        <div className="absolute">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none bg-none rounded-l-lg border-0 border-r border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
        </div>
      )}

      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder={placeholder}
        className={`dark:bg-dark-900 h-11 w-full ${
          selectPosition === "start" ? "pl-[84px]" : "pr-[84px]"
        } rounded-lg border border-gray-300 bg-transparent py-3 px-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800`}
      />

      {selectPosition === "end" && (
        <div className="absolute right-0">
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="appearance-none bg-none rounded-r-lg border-0 border-l border-gray-200 bg-transparent py-3 pl-3.5 pr-8 leading-tight text-gray-700 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:text-gray-400"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code}
              </option>
            ))}
          </select>
          {/* Chevron icon */}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;