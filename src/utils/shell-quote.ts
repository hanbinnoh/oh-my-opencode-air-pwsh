/**
 * Platform-aware shell argument quoting.
 *
 * @param value - The argument to quote
 * @param shell - Target shell type, defaults to auto-detected from process.platform.
 *   'posix' = single-quote escaping (bash/sh/zsh). 'powershell' = single-quote (safer than double-quote).
 *   Default: 'powershell' on win32, 'posix' otherwise.
 *
 * PowerShell uses single-quoted strings ('...') which do NOT perform variable expansion
 * or backtick substitution — making them safer than double-quoted strings for file paths
 * and URLs that may contain $ or ` characters.
 */
export function quoteShellArg(
  value: string,
  shell?: 'posix' | 'powershell',
): string {
  const shellType =
    shell ?? (process.platform === 'win32' ? 'powershell' : 'posix');

  if (shellType === 'powershell') {
    // Single-quote: escape single quotes by doubling them
    return `'${value.replace(/'/g, "''")}'`;
  }
  // POSIX single-quote style
  return `'${value.replace(/'/g, `'\\''`)}'`;
}
