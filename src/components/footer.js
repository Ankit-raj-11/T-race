export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-4 flex justify-center items-center w-full fixed bottom-0">
      <p className="text-sm">
        © {new Date().getFullYear()} T-Race |{' '}
        <a
          href="https://github.com/Ankit-raj-11/T-race"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-300 transition-colors duration-200"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}
