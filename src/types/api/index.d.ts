import { ApiKey } from "@prisma/client";

export interface CreateApiData {
  error: string | ZodIssue[] | null;
	createdApiKey: ApiKey | null;
}

export interface RevokeApiData {
  error: string | ZodIssue[] | null;
	success: boolean;
}