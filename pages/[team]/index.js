import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import getSeasonYear from "../../utils/getSeasonYear";
import getTeams from "../../utils/getTeams";

export default function Team(props) {
  const { conference, mascot, schedule = [], school } = props;

  return (
    <>
      <Head>
        <title>
          {school} {mascot}
        </title>
      </Head>
      <h2>
        {school} {mascot}
      </h2>
      <p>{conference}</p>
      <ul>
        {schedule.map(
          ({ away_team, id, home_team, start_date, start_time_tbd, venue }) => (
            <li key={id}>
              <p>
                <Link href={`/${encodeURIComponent(school)}/${id}`}>
                  <a>
                    {away_team} at {home_team}
                  </a>
                </Link>
              </p>
              <p>
                <small>
                  {start_time_tbd
                    ? format(parseISO(start_date.substring(0, 10)), "M/d/y")
                    : format(parseISO(start_date), "M/d/y, h:mmaaaa")}
                  <br />
                  {venue}
                </small>
              </p>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export async function getStaticProps({ params }) {
  const { team } = params;
  const teamProper = decodeURIComponent(team);
  const year = await getSeasonYear();
  const [{ teams = [] }, resSchedule] = await Promise.all([
    getTeams(),
    fetch(
      `https://api.collegefootballdata.com/games?year=${year}&team=${teamProper}`
    ),
  ]);
  const schedule = await resSchedule.json();
  const teamInfo = teams.find(({ school }) => school === teamProper);

  return {
    props: { ...teamInfo, schedule },
    revalidate: 60 * 60 * 24, // Refetch schedule once a day
  };
}

export async function getStaticPaths() {
  const { teams } = await getTeams();

  return {
    paths: teams.map((team) => ({
      params: { team: team.school },
    })),
    fallback: true,
  };
}
