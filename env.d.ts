/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ACTIVE_MQ_URL: string;
  readonly VITE_GCP_IAM_URL: string;
  readonly VITE_PASSWORD_LENGTH: number;
  readonly VITE_PASSWORD_SEQUENCE: string;
  readonly VITE_I18N_LOCALE: string;
  readonly VITE_I18N_FALLBACK_LOCALE: string;
  readonly VITE_EXAMPLE_TEAM_UUID: string;
  readonly VITE_SYNC_BANK_UUID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare const __VUE_I18N_FULL_INSTALL__: string;
declare const __VUE_I18N_LEGACY_API__: string;
