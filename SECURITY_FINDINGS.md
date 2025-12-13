# Security Scan Findings

**Scan ID:** 483875
**Date:** 2025-12-13T15:12:42.492124Z
**Repository:** https://github.com/Ankit-raj-11/T-race
**Branch:** main

## Summary

- Total Issues: 1
- High Severity: 0
- Medium Severity: 0
- Low Severity: 0

## Findings

### semgrep - INFO
**File:** `src/lib/badge/badgeService.js`  
**Line:** 102  
**Rule:** javascript.lang.security.audit.unsafe-formatstring.unsafe-formatstring  
**Message:** Detected string concatenation with a non-literal variable in a util.format / console.log function. If an attacker injects a format specifier in the string, it will forge the log message. Try to use constant values for the format string.

