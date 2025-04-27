
import { useEffect, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import drilldownModule from 'highcharts/modules/drilldown.js';
import { User } from '@/hooks/useGetUsers';
import { Box } from '@chakra-ui/react';

interface LanguateChartProps {
  users: User[];
}
interface UserSummary {
  total: number;
  languages: Record<string, number>;
}
interface LanguageSummary {
  total: number;
  users: Record<string, number>
}

const LanguageCharts = ({ users }: LanguateChartProps) => {
 
  const { languagesSummary, usersSummary } = useMemo(() => {
    const languagesSummary: Record<string, LanguageSummary> = {};
    const usersSummary: Record<string, UserSummary> = {};
    users.forEach(u => {
      usersSummary[u.username] = { total: 0, languages: {} };
      u.repos.forEach((repo: { language: string; }) => {
        const lang = repo.language || 'Other';

        if (!languagesSummary[lang]) languagesSummary[lang] = { total: 0, users: {} };
        languagesSummary[lang].total++;
        languagesSummary[lang].users[u.username] =
          (languagesSummary[lang].users[u.username] || 0) + 1;

        // user-centric
        usersSummary[u.username].total++;
        usersSummary[u.username].languages[lang] =
          (usersSummary[u.username].languages[lang] || 0) + 1;
      });
    });

    return { languagesSummary, usersSummary };
  }, [users]);

  useEffect(() => {
    const initDrilldown = drilldownModule;
    if (typeof initDrilldown === 'function') {
      initDrilldown(Highcharts);
    }
  }, [])

  // A
  const langSeries = Object.entries(languagesSummary).map(([lang, o]) => ({
    name: lang,
    y: o.total,
    drilldown: lang
  }));
  const langDrill = Object.entries(languagesSummary).map(([lang, o]) => ({
    id: lang,
    data: Object.entries(o.users)
  }));
  const langOpts = {
    chart: { type: 'column' },
    title: { text: 'Repos per Language (click for users)' },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Repo count' } },
    series: [{ name: 'Languages', colorByPoint: true, data: langSeries }],
    drilldown: { series: langDrill }
  };

  // B
  const userSeries = Object.entries(usersSummary).map(([user, o]) => ({
    name: user,
    y: o.total,
    drilldown: user
  }));
  const userDrill = Object.entries(usersSummary).map(([user, o]) => ({
    id: user,
    data: Object.entries(o.languages)
  }));
  const userOpts = {
    chart: { type: 'bar' },
    title: { text: 'Repos per User (click for languages)' },
    xAxis: { type: 'category' },
    yAxis: { title: { text: 'Repo count' } },
    series: [{ name: 'Users', colorByPoint: true, data: userSeries }],
    drilldown: { series: userDrill }
  };

  return (
    <>
    <Box
      mt="2rem"
      w="full"
      p="1rem"
      bg="white"
      borderRadius="10px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.05)"
    >
      <HighchartsReact highcharts={Highcharts} options={langOpts} />
    </Box>
    <Box
      mt="2rem"
      w="full"
      p="1rem"
      bg="white"
      borderRadius="10px"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.05)"
    >
      <HighchartsReact highcharts={Highcharts} options={userOpts} />
    </Box>
    </>
  );
};

export default LanguageCharts;
