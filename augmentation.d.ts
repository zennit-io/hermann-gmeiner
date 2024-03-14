import type { Currency } from "@/types/Currency";

declare global {
  interface String {
    splitCamelCase(): string[];
  }

  interface Number {
    parseCurrencyValue(currency: Currency): string;
  }

  interface Date {
    format(joiner?: string): {
      date: string;
      time: string;
    };
  }
}
