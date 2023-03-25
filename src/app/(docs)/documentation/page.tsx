import { FC } from 'react';
import LargeHeading from '@/ui/LargeHeading';
import Paragraph from '@/ui/Paragraph';
import DocumentationTabs from '@/components/DocumentationTabs';
import 'simplebar-react/dist/simplebar.min.css'

import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Similarity API | documentation',
  description: 'Free & open-source text similatity API'
}

const Page: FC = ({}) => {
  return (
    <div className='container max-w-7xl mx-auto'>
      <div className='flex flex-col items-center gap-6'>
        <LargeHeading>
          Making a request
        </LargeHeading>

        <Paragraph>
          api/v1/similarity
        </Paragraph>

        <DocumentationTabs />
      </div>
    </div>
  )
}

export default Page;