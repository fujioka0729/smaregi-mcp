import { z } from "zod";
import { DEFAULT_IDP_HOST, DEFAULT_API_HOST, DEFAULT_SCOPES } from "../constants.js";

export const ConfigSchema = z.object({
  contractId: z.string(),
  clientId: z.string().optional(),
  clientSecret: z.string().optional(),
  idpHost: z.string().default(DEFAULT_IDP_HOST),
  apiHost: z.string().default(DEFAULT_API_HOST),
  scopes: z.array(z.string()).default(DEFAULT_SCOPES),
});

export type Config = z.infer<typeof ConfigSchema>;

export const TokenSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  token_type: z.string(),
  obtained_at: z.number(),
});

export type Token = z.infer<typeof TokenSchema>;
