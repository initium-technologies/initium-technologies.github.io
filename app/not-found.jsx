import Link from 'next/link';
import TextPage from '@/components/TextPage';

export default function NotFound() {
  return (
    <TextPage label="404" headline="Nothing at this address.">
      <p className="body"><Link className="link" href="/">Back to the start</Link></p>
    </TextPage>
  );
}
