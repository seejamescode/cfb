import Head from "next/head";
import Link from "next/link";
import getTeams from "../utils/getTeams";

export default function Home({ conferences = {} }) {
  return (
    <>
      <Head>
        <title>CFB Now</title>
      </Head>
      <ul>
        {Object.entries(conferences).map(([conference, teams]) => (
          <li key={conference}>
            <h2>{conference}</h2>
            <ul>
              {teams.map(({ color, id, mascot, school }) => (
                <li key={id}>
                  <Link href={`/${encodeURIComponent(school)}`}>
                    <a>
                      {school} {mascot}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const { conferences } = await getTeams();

  return {
    props: {
      conferences,
    },
    revalidate: 60 * 60 * 24 * 30, // Refetch teams each month
  };
}
