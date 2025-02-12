import Link from 'next/link';

export default function RootPage() {
  return (
    <main>
      <h1>All your races</h1>
      <Link href="/races/new">Create new race</Link>
    </main>
  );
}
