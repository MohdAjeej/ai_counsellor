/**
 * Country → currency (code + full name) for display when user searches/filters by country.
 * Tuition in the database is stored in the university's local currency.
 */

export interface CountryCurrency {
  code: string;
  name: string;
}

/** Country name (as used in API/filter) → currency code and full name */
export const COUNTRY_CURRENCY: Record<string, CountryCurrency> = {
  'United States': { code: 'USD', name: 'US Dollar' },
  'Canada': { code: 'CAD', name: 'Canadian Dollar' },
  'United Kingdom': { code: 'GBP', name: 'British Pound' },
  'Australia': { code: 'AUD', name: 'Australian Dollar' },
  'India': { code: 'INR', name: 'Indian Rupee' },
  'Germany': { code: 'EUR', name: 'Euro' },
  'France': { code: 'EUR', name: 'Euro' },
  'Netherlands': { code: 'EUR', name: 'Euro' },
  'Spain': { code: 'EUR', name: 'Euro' },
  'Italy': { code: 'EUR', name: 'Euro' },
  'Belgium': { code: 'EUR', name: 'Euro' },
  'Austria': { code: 'EUR', name: 'Euro' },
  'Portugal': { code: 'EUR', name: 'Euro' },
  'Poland': { code: 'EUR', name: 'Euro' },
  'Greece': { code: 'EUR', name: 'Euro' },
  'Ireland': { code: 'EUR', name: 'Euro' },
  'Finland': { code: 'EUR', name: 'Euro' },
  'Switzerland': { code: 'CHF', name: 'Swiss Franc' },
  'Singapore': { code: 'SGD', name: 'Singapore Dollar' },
  'Japan': { code: 'JPY', name: 'Japanese Yen' },
  'South Korea': { code: 'KRW', name: 'South Korean Won' },
  'China': { code: 'CNY', name: 'Chinese Yuan' },
  'Hong Kong': { code: 'HKD', name: 'Hong Kong Dollar' },
  'Taiwan': { code: 'TWD', name: 'New Taiwan Dollar' },
  'Malaysia': { code: 'MYR', name: 'Malaysian Ringgit' },
  'Thailand': { code: 'THB', name: 'Thai Baht' },
  'Indonesia': { code: 'IDR', name: 'Indonesian Rupiah' },
  'Philippines': { code: 'PHP', name: 'Philippine Peso' },
  'Vietnam': { code: 'VND', name: 'Vietnamese Dong' },
  'New Zealand': { code: 'NZD', name: 'New Zealand Dollar' },
  'Sweden': { code: 'SEK', name: 'Swedish Krona' },
  'Norway': { code: 'NOK', name: 'Norwegian Krone' },
  'Denmark': { code: 'DKK', name: 'Danish Krone' },
  'Russia': { code: 'RUB', name: 'Russian Ruble' },
  'Ukraine': { code: 'UAH', name: 'Ukrainian Hryvnia' },
  'Turkey': { code: 'TRY', name: 'Turkish Lira' },
  'Israel': { code: 'ILS', name: 'Israeli Shekel' },
  'United Arab Emirates': { code: 'AED', name: 'UAE Dirham' },
  'Saudi Arabia': { code: 'SAR', name: 'Saudi Riyal' },
  'Qatar': { code: 'QAR', name: 'Qatari Riyal' },
  'Kuwait': { code: 'KWD', name: 'Kuwaiti Dinar' },
  'Bahrain': { code: 'BHD', name: 'Bahraini Dinar' },
  'Oman': { code: 'OMR', name: 'Omani Rial' },
  'Jordan': { code: 'JOD', name: 'Jordanian Dinar' },
  'Lebanon': { code: 'LBP', name: 'Lebanese Pound' },
  'Iran': { code: 'IRR', name: 'Iranian Rial' },
  'Pakistan': { code: 'PKR', name: 'Pakistani Rupee' },
  'Bangladesh': { code: 'BDT', name: 'Bangladeshi Taka' },
  'Sri Lanka': { code: 'LKR', name: 'Sri Lankan Rupee' },
  'Nepal': { code: 'NPR', name: 'Nepalese Rupee' },
  'Kazakhstan': { code: 'KZT', name: 'Kazakhstani Tenge' },
  'Czech Republic': { code: 'CZK', name: 'Czech Koruna' },
  'Hungary': { code: 'HUF', name: 'Hungarian Forint' },
  'Brazil': { code: 'BRL', name: 'Brazilian Real' },
  'Mexico': { code: 'MXN', name: 'Mexican Peso' },
  'Argentina': { code: 'ARS', name: 'Argentine Peso' },
  'Chile': { code: 'CLP', name: 'Chilean Peso' },
  'Colombia': { code: 'COP', name: 'Colombian Peso' },
  'Peru': { code: 'PEN', name: 'Peruvian Sol' },
  'Ecuador': { code: 'USD', name: 'US Dollar' },
  'Uruguay': { code: 'UYU', name: 'Uruguayan Peso' },
  'Costa Rica': { code: 'CRC', name: 'Costa Rican Colón' },
  'South Africa': { code: 'ZAR', name: 'South African Rand' },
  'Egypt': { code: 'EGP', name: 'Egyptian Pound' },
  'Nigeria': { code: 'NGN', name: 'Nigerian Naira' },
  'Kenya': { code: 'KES', name: 'Kenyan Shilling' },
  'Ghana': { code: 'GHS', name: 'Ghanaian Cedi' },
  'Morocco': { code: 'MAD', name: 'Moroccan Dirham' },
  'Tanzania': { code: 'TZS', name: 'Tanzanian Shilling' },
  'Uganda': { code: 'UGX', name: 'Ugandan Shilling' },
  'Ethiopia': { code: 'ETB', name: 'Ethiopian Birr' },
  'Algeria': { code: 'DZD', name: 'Algerian Dinar' },
  'Tunisia': { code: 'TND', name: 'Tunisian Dinar' },
};

/** Currency code → full name (for display on university cards when country not in map) */
export const CURRENCY_NAME: Record<string, string> = {
  USD: 'US Dollar',
  CAD: 'Canadian Dollar',
  GBP: 'British Pound',
  AUD: 'Australian Dollar',
  INR: 'Indian Rupee',
  EUR: 'Euro',
  CHF: 'Swiss Franc',
  SGD: 'Singapore Dollar',
  JPY: 'Japanese Yen',
  KRW: 'South Korean Won',
  CNY: 'Chinese Yuan',
  HKD: 'Hong Kong Dollar',
  TWD: 'New Taiwan Dollar',
  MYR: 'Malaysian Ringgit',
  THB: 'Thai Baht',
  IDR: 'Indonesian Rupiah',
  PHP: 'Philippine Peso',
  VND: 'Vietnamese Dong',
  NZD: 'New Zealand Dollar',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  RUB: 'Russian Ruble',
  UAH: 'Ukrainian Hryvnia',
  TRY: 'Turkish Lira',
  ILS: 'Israeli Shekel',
  AED: 'UAE Dirham',
  SAR: 'Saudi Riyal',
  QAR: 'Qatari Riyal',
  KWD: 'Kuwaiti Dinar',
  BHD: 'Bahraini Dinar',
  OMR: 'Omani Rial',
  JOD: 'Jordanian Dinar',
  LBP: 'Lebanese Pound',
  IRR: 'Iranian Rial',
  PKR: 'Pakistani Rupee',
  BDT: 'Bangladeshi Taka',
  LKR: 'Sri Lankan Rupee',
  NPR: 'Nepalese Rupee',
  KZT: 'Kazakhstani Tenge',
  CZK: 'Czech Koruna',
  HUF: 'Hungarian Forint',
  BRL: 'Brazilian Real',
  MXN: 'Mexican Peso',
  ARS: 'Argentine Peso',
  CLP: 'Chilean Peso',
  COP: 'Colombian Peso',
  PEN: 'Peruvian Sol',
  UYU: 'Uruguayan Peso',
  CRC: 'Costa Rican Colón',
  ZAR: 'South African Rand',
  EGP: 'Egyptian Pound',
  NGN: 'Nigerian Naira',
  KES: 'Kenyan Shilling',
  GHS: 'Ghanaian Cedi',
  MAD: 'Moroccan Dirham',
  TZS: 'Tanzanian Shilling',
  UGX: 'Ugandan Shilling',
  ETB: 'Ethiopian Birr',
  DZD: 'Algerian Dinar',
  TND: 'Tunisian Dinar',
};

/** Currency code → symbol for country-wise display (e.g. EUR → €, INR → ₹) */
export const CURRENCY_SYMBOL: Record<string, string> = {
  USD: '$',
  CAD: 'C$',
  GBP: '£',
  AUD: 'A$',
  INR: '₹',
  EUR: '€',
  CHF: 'CHF',
  SGD: 'S$',
  JPY: '¥',
  KRW: '₩',
  CNY: '¥',
  HKD: 'HK$',
  TWD: 'NT$',
  MYR: 'RM',
  THB: '฿',
  IDR: 'Rp',
  PHP: '₱',
  VND: '₫',
  NZD: 'NZ$',
  SEK: 'kr',
  NOK: 'kr',
  DKK: 'kr',
  RUB: '₽',
  UAH: '₴',
  TRY: '₺',
  ILS: '₪',
  AED: 'د.إ',
  SAR: '﷼',
  QAR: 'QR',
  KWD: 'KD',
  BHD: 'BD',
  OMR: 'OMR',
  JOD: 'JD',
  LBP: 'L£',
  IRR: '﷼',
  PKR: 'Rs',
  BDT: '৳',
  LKR: 'Rs',
  NPR: 'Rs',
  KZT: '₸',
  CZK: 'Kč',
  HUF: 'Ft',
  BRL: 'R$',
  MXN: 'MX$',
  ARS: '$',
  CLP: '$',
  COP: '$',
  PEN: 'S/',
  UYU: '$U',
  CRC: '₡',
  ZAR: 'R',
  EGP: 'E£',
  NGN: '₦',
  KES: 'KSh',
  GHS: '₵',
  MAD: 'DH',
  TZS: 'TSh',
  UGX: 'USh',
  ETB: 'Br',
  DZD: 'DA',
  TND: 'DT',
};

/** Get currency symbol for code (e.g. EUR → €, INR → ₹). Falls back to code if unknown. */
export function getCurrencySymbol(code: string): string {
  return CURRENCY_SYMBOL[code] || code + ' ';
}

/** Get currency display for a country (e.g. "Indian Rupee (INR)"). Normalizes country name for lookup. */
export function getCurrencyForCountry(country: string): CountryCurrency | null {
  if (!country?.trim()) return null;
  const key = country.trim();
  return COUNTRY_CURRENCY[key] ?? null;
}

/** Get full currency label for display: "Indian Rupee (INR)" */
export function formatCurrencyLabel(countryOrCode: string, isCountry: boolean = true): string {
  if (isCountry) {
    const cc = getCurrencyForCountry(countryOrCode);
    return cc ? `${cc.name} (${cc.code})` : countryOrCode;
  }
  const name = CURRENCY_NAME[countryOrCode] || countryOrCode;
  return `${name} (${countryOrCode})`;
}

/** Get currency full name from code (e.g. INR → "Indian Rupee") */
export function getCurrencyName(code: string): string {
  return CURRENCY_NAME[code] || code;
}
