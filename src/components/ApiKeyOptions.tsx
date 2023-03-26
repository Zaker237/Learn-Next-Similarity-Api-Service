"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSubTrigger } from '@/ui/DropdownMenu';
import { FC, useState } from 'react'
import Button from '@/ui/Button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/ui/Toast';
import { createApiKey } from '@/constants/create-api-key';
import { useRouter } from "next/navigation";
import { revokeApiKey } from '@/constants/revoke-api-key';

interface ApiKeyOptionsProps {
  apiKeyId: string;
	apiKeyKey: string;
}
const ApiKeyOptions: FC<ApiKeyOptionsProps> = ({apiKeyId, apiKeyKey}) => {
	const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
	const [isRevoking, setIsRevoking] = useState<boolean>(false);
	const router = useRouter();

	const createNewApiKey = async () => {
		setIsCreatingNew(true);
		try {
			await revokeApiKey({keyId: apiKeyId});
			await createApiKey();
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error by creating API key',
				message: 'Please try again later',
				type: 'error'
			})
		} finally {
			setIsCreatingNew(false);
		}
	}

	const revokeCurrentApiKey = async () => {
		setIsRevoking(true);
		try {
			await revokeApiKey({keyId: apiKeyId});
			router.refresh();
		} catch (error) {
			toast({
				title: 'Error by revoking API key',
				message: 'Please try again later',
				type: 'error'
			})
		} finally {
			setIsRevoking(false);
		}
	}

  return (
    <DropdownMenu>
        <DropdownMenuSubTrigger disabled={isCreatingNew || isRevoking} asChild>
					<Button
						variant='ghost'
						className='flex gap-2 items-center'
					>
						<p>
							{isCreatingNew
								? 'Creating new kex'
								: isRevoking
								? 'Revoking key'
								: 'options'
							}
						</p>
						{isCreatingNew || isRevoking ? (
							<Loader2 className='animate-spin h-4 w-4' />
						) : null}
					</Button>
				</DropdownMenuSubTrigger>

				<DropdownMenuContent>
					<DropdownMenuItem
						onClick={() => {
							navigator.clipboard.writeText(apiKeyKey);
							toast({
								title: 'Copied',
								message: 'API key copied to clipboard',
								type: 'success'
							})
						}}
					>
						Copy
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={createNewApiKey}
					>
						Create new key
					</DropdownMenuItem>

					<DropdownMenuItem
						onClick={revokeCurrentApiKey}
					>
						Revoke key
					</DropdownMenuItem>
				</DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ApiKeyOptions;