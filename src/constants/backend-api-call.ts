import { SimilarityData } from "@/types/api";

export async function getSimilarity({sentence, texts}: {sentence: string, texts: string[]}) {
  const apiEndpoint: string = process.env.BACKEND_API_URL as string;
	try {
		const res = await fetch("http://api:8002/api/similatiry/calcul", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				sentence,
				texts
			})
		});
		console.log(res);
		const data = (await res.json()) as SimilarityData[];
		return data;
	} catch (error) {
		console.log(error);
		throw new Error('An error occurs on the server!');
	}
}