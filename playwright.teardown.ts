/**
 * Global teardown to force clean exit when using channel:'chrome' with multiple workers.
 * Chrome subprocesses (GPU helper, renderer) can linger after tests complete,
 * preventing Node.js from exiting naturally.
 */
export default async function globalTeardown(): Promise<void> {
  process.exit(process.exitCode ?? 0);
}
