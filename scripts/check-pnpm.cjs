const userAgent = process.env.npm_config_user_agent || "";

if (!userAgent.startsWith("pnpm/")) {
  console.error("This workspace uses pnpm. Run `corepack pnpm install` or install pnpm, then try again.");
  process.exit(1);
}