// import.meta.env.* works default everywhere
// env.* is for cloudflare
const nodeEnv = typeof process !== 'undefined' ? process.env : undefined;

export const getCmsBaseUrl = () =>
  import.meta.env.VITE_CMS_BASE_URL ??
  nodeEnv?.VITE_CMS_BASE_URL ??
  'https://gitlab.com/turnipxenon-personal/test-obdisian/-/raw/main';
export const getWebBaseUrl = () =>
  import.meta.env.VITE_WEB_BASE_URL ?? nodeEnv?.VITE_WEB_BASE_URL ?? '/pineapple';
