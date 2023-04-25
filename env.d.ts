export {}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_MIXPANEL_TOKEN: string;
    }
  }
}
