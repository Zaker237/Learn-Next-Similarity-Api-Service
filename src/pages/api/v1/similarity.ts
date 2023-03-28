import { getSimilarity } from "@/constants/backend-api-call";
import { withMethods } from "@/lib/api-middlewares/with-methods";
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const reqSchema = z.object({
	sentence: z.string().max(1000),
	texts: z.array(z.string().max(1000))
});

const handler = async (
	req: NextApiRequest,
	res: NextApiResponse
) => {
  const body = req.body as unknown;
	const apiKey = req.headers.authorization;
	if(!apiKey){
		return res.status(401).json({
			error: 'Unauthorize'
		});
	}

	try {
		const {sentence, texts} = reqSchema.parse(body);

		const validApiKey = await db.apiKey.findFirst({
			where: {
				key: apiKey,
				enabled: true
			}
		});

		if(!validApiKey){
			return res.status(401).json({
				error: 'Unauthorized'
			});
		}

		const start = new Date();

		const data = await getSimilarity({ sentence, texts });

		const duration = new Date().getTime() - start.getTime();

		// persist request
		await db.apiRequest.create({
			data: {
				duration: duration,
				method: req.method as string,
				path: req.url as string,
				status: 200,
				apiKeyId: validApiKey.id,
				usedApiKey: validApiKey.key,
			}
		});

		return res.status(200).json({
			success: true,
			data: data
		});

	} catch (error) {
		if(error instanceof z.ZodError){
			return res.status(400).json({
				error: error.issues
			});
		}

		return res.status(500).json({
			error: 'Internal Server Error'
		});
	}
}

export default withMethods(['POST'], handler);