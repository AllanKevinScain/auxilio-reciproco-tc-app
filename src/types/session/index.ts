interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface Account {
  provider: "credentials" | "google" | "github";
  type: "credentials" | "oauth";
  providerAccountId: string;
  access_token?: string;
  expires_at?: number;
  scope?: string;
  token_type?: string;
  id_token?: string;
}

interface Credentials {
  redirect: string;
  email: string;
  password: string;
  csrfToken: string;
  callbackUrl: string;
  json: string;
}

interface Profile {
  email: string;
  name: string;
  iss?: string;
  azp?: string;
  aud?: string;
  sub?: string;
  email_verified?: boolean;
  at_hash?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
  iat?: number;
  exp?: number;
  login?: string;
  node_id?: string;
  avatar_url?: string;
  gravatar_id?: string;
  url?: string;
  html_url?: string;
  followers_url?: string;
  following_url?: string;
  gists_url?: string;
  starred_url?: string;
  subscriptions_url?: string;
  organizations_url?: string;
  repos_url?: string;
  events_url?: string;
  received_events_url?: string;
  type?: string;
  site_admin?: boolean;
  company?: string | null;
  blog?: string;
  location?: string;
  hireable?: boolean | null;
  bio?: string;
  twitter_username?: string | null;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  updated_at?: string;
  private_gists?: number;
  total_private_repos?: number;
  owned_private_repos?: number;
  disk_usage?: number;
  collaborators?: number;
  two_factor_authentication?: boolean;
  plan?: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
}

export interface AuthData {
  user: User;
  account: Account;
  profile?: Profile;
  credentials?: Credentials;
}
