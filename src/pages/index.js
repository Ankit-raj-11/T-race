import Header from '../components/header';

export default function Home() {
  return (
    <>
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold">Home Page</h1>
        <p>Welcome to the project! This is the home page.</p>
      </main>
    </>
  );
}
