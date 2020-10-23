import { groupBy } from "lodash";
import getSeasonYear from "./getSeasonYear";

const getTeams = async () => {
  const year = await getSeasonYear();
  const resTeams = await fetch(
    `https://api.collegefootballdata.com/teams/fbs?year=${year}`
  );
  const teams = await resTeams.json();
  const conferences = groupBy(teams, "conference");

  return { conferences, teams };
};

export default getTeams;
