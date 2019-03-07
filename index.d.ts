
// Type definitions for kuuid
// Project: https://github.com/glynnbird/kuuid
// Definitions by: Glynn Bird <https://github.com/glynnbird>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace kuuid {
  /**
   * Generate the 8-character prefix
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 8-character prefix string
   */
  function prefix(t? : string | number): string;

  /**
   * Generate the 8-character prefix - reverse mode
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 8-character prefix string
   */
  function prefix(t? : string | number): string;

  /**
   * Generate 128-bits of random date encoded as 24 character string
   * @return 24-character prefix string
   */
  function rand(): string;

  /**
   * Generate a date/time sortable 32 character unique identifier
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 32-character id
   */
  function id(t? : string | number): string;

  /**
   * Generate a reverse date/time sortable 32 character unique identifier
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 32-character id
   */
  function id(t? : string | number): string;
}

export = kuuid

