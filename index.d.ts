
// Type definitions for kuuid
// Project: https://github.com/glynnbird/kuuid
// Definitions by: Glynn Bird <https://github.com/glynnbird>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.3

declare namespace kuuid {

  interface IDOpts {
    /** The timestamp used to generate the id. Either an ISO string or number of milliseconds
     * since 1970. Default: undefined, which 
     */
    timestamp?: string | number | undefined;
    /** The amount of random data to append to the time portion of the id. A number
     * between 1 and 4. Default: 4.
     */
    random?: number;
    /** Whether to generate the id in oldest-first order (false) or newest-first order (true).
     * Default: false
     */
    reverse?: boolean;
    /** Whether to generate the id to second precision (false) or millisecond precision (true).
     * Default: false
     */
    millsecond?: false;
  }

  /**
   * Generate the 8-character prefix
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 8-character prefix string
   */
  function prefix(opts?: IDOpts | string | number): string;

  /**
   * Generate the 8-character prefix - reverse mode
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 8-character prefix string
   */
  function prefixr(t?: string | number): string;

  /**
 * Generate the 8-character prefix - ms mode
 * @param t ISO-8601 date string or number of milliseconds since 1970
 * @return 8-character prefix string
 */
  function prefixms(t?: string | number): string;

  /**
   * Generate 128-bits of random date encoded as 24 character string
   * @return 24-character prefix string
   */
  function rand(): string;

  /**
   * Generate a date/time sortable 32 character unique identifier
   * @param t ISO-8601 date string or number of milliseconds since 1970 or options
   * @return 32-character id
   */
  function id(opts?: IDOpts | string | number): string;

  /**
   * Generate a reverse date/time sortable 32 character unique identifier
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 32-character id
   */
  function idr(t?: string | number): string;

  /**
 * Generate short a date/time sortable 32 character unique identifier
 * @param t ISO-8601 date string or number of milliseconds since 1970
 * @return 32-character id
 */
  function ids(t?: string | number): string;

  /**
   * Generate short a reverse date/time sortable 32 character unique identifier
   * @param t ISO-8601 date string or number of milliseconds since 1970
   * @return 32-character id
   */
  function idsr(t?: string | number): string;

  /**
 * Generate a millisecond, time sortable 32 character unique identifier
 * @param t ISO-8601 date string or number of milliseconds since 1970
 * @return 32-character id
 */
  function idms(t?: string | number): string;
}

export = kuuid

