import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <header>
        <h1>
          <Link href="/">
            <a>CFB Now</a>
          </Link>
        </h1>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
