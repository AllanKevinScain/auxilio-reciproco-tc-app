namespace NodeJS {
  interface ProcessEnv {
    //Next
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    //Github keys
    GITHUB_ID: string;
    GITHUB_SECRET: string;
    //Google keys
    GOOGLE_ID: string;
    GOOGLE_SECRET: string;
    //api
    API_BASE_URL: string;
    API_KEY: string;
  }
}
