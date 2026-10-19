import LegalPage from '@/components/LegalPage';
import { legal } from '@/content/company';

export const metadata = legal.privacy.meta;

export default function Page() {
  return <LegalPage doc={legal.privacy} />;
}
