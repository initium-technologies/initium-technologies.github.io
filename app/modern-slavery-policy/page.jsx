import TextPage from '@/components/TextPage';
import { legal } from '@/content/company';

const doc = legal.slavery;
export const metadata = doc.meta;

export default function Page() {
  return (
    <TextPage headline={doc.title} updated={doc.updated}>
      {doc.sections.map((s) => (
        <div key={s.h}>
          <h2 className="h3">{s.h}</h2>
          <p className="body">{s.p}</p>
        </div>
      ))}
    </TextPage>
  );
}
