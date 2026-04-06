// utils/email-test-data.ts

import { faker } from "@faker-js/faker";

/**
 * Generates invalid email addresses with random prefixes
 * to avoid collision with existing accounts on automationexercise.com
 */
export function buildInvalidEmail(pattern: string): string {
  const rand = faker.internet
    .username()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
  // strips dots/underscores faker sometimes adds — keeps prefix clean

  const map: Record<string, string> = {
    missing_domain: `${rand}@`,
    missing_local: `@${rand}.com`,
    missing_at: `${rand}domain.com`,
    multiple_at: `${rand}@@${rand}.com`,
    missing_tld: `${rand}@${rand}`,
    space_local: `${rand} part@${rand}.com`,
    space_domain: `${rand}@${rand} part.com`,
    consecutive_dots_local: `${rand}..${rand}@${rand}.com`,
    consecutive_dots_domain: `${rand}@${rand}..com`,
    leading_dot_local: `.${rand}@${rand}.com`,
    trailing_dot_local: `${rand}.@${rand}.com`,
    leading_hyphen_domain: `${rand}@-${rand}.com`,
    trailing_hyphen_domain: `${rand}@${rand}-.com`,
  };

  return (
    map[pattern] ??
    (() => {
      throw new Error(`Unknown email pattern: ${pattern}`);
    })()
  );
}
