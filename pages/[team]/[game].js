import Head from "next/head";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import useSWR from "swr";

export default function Game(props) {
  const {
    away_points,
    away_team,
    home_points,
    home_team,
    season,
    start_date,
    start_time_tbd,
    week,
    venue,
  } = props;
  const { data: drives = [] } = useSWR(
    `https://api.collegefootballdata.com/drives?team=${home_team}&week=${week}&year=${season}`
  );

  return (
    <>
      <Head>
        <title>
          {away_team} at {home_team} ({away_points} - {home_points})
        </title>
      </Head>
      <h2>
        <Link href={`/${encodeURIComponent(away_team)}`}>
          <a>{away_team}</a>
        </Link>{" "}
        {away_points}
        <br />
        <Link href={`/${encodeURIComponent(home_team)}`}>
          <a>{home_team}</a>
        </Link>{" "}
        {home_points}
      </h2>

      <p>
        <small>
          {start_time_tbd
            ? format(parseISO(start_date.substring(0, 10)), "M/d/y")
            : format(parseISO(start_date), "M/d/y, h:mmaaaa")}
          <br />
          Home Team: {home_team}
          <br />
          {venue}
        </small>
      </p>

      <ul>
        {drives.map(
          ({
            drive_number,
            drive_result,
            elapsed: { minutes, seconds },
            id,
            offense,
            plays,
            yards,
          }) => (
            <li key={id}>
              <p>
                Drive {drive_number}
                <br />
                Offense: {offense}
                <br />
                Yards Gained: {yards}
                <br />
                Length: {minutes} minutes, {seconds} seconds
                <br />
                Amount of Plays: {plays}
                <br />
                Result: {drive_result}
              </p>
            </li>
          )
        )}
      </ul>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { game } = params;
  const resGame = await fetch(
    `https://api.collegefootballdata.com/games?id=${game}`
  );
  const games = await resGame.json();

  return {
    props: games[0],
  };
}
