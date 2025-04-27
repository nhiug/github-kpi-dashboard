import { Box, Heading, HStack, Input, VStack } from '@chakra-ui/react';
import ComparativeTable from './components/ComparativeTable';
import KPICards from './components/KPICards';
import LanguageCharts from './components/LanguageCharts';
import useGetUsers from './hooks/useGetUsers';
import AddUserButton from './components/AddUserButton';
import UsernamePill from './hooks/UsernamePill';
import GitHubCalendar     from 'react-github-calendar'; 
const defaultUsernames = ["torvalds", "gaearon", "mojombo",  "pjhyett"];
import KPICardLoader from './components/KpiCardLoader';

const App = () => {
  const {users, isLoading ,searchTerm , onSearch, addUser, removeUser} = useGetUsers(defaultUsernames);
    return (
      <Box p="2rem">
        <Heading size="2xl">GitHub KPI Dashboard</Heading>
        <HStack justifyContent="space-between">
          <Input
            my="2rem"
            type='text'
            placeholder="🔍 Search by username"
            value={searchTerm}
            onChange={e => onSearch(e.target.value)}
            variant="outline"
            maxW="400px"
          />
          <AddUserButton addUser={addUser} />
        </HStack>
   
   
 
        {/* — KPI cards with badge below each — */}
       <HStack
          alignItems="flex-start"
         justifyContent="center"
          gap="2rem"
          flexWrap="wrap"
        >
          {isLoading
          ? Array.from({ length: 5 }).map((_, i) => <KPICardLoader key={i} />)
            : users.map(u => (
                <VStack key={u.username} >
                  <KPICards
                    user={u}
                   isLoading={isLoading}
                   onRemove={removeUser}
                  />
                 {/* badge stuck right under its card */}
                  <UsernamePill
                    username={u.username}
                    onRemove={removeUser}
                  />
                </VStack>
              ))
          }
        </HStack>
        
        <LanguageCharts users={users} />
        <ComparativeTable users={users}  isLoading={isLoading} />
             {/* ─── CONTRIBUTION CALENDARS ───────────────────────────────────────── */}
        {users.map(u => (
        <Box key={u.username} mt="2rem" borderWidth="1px" p="3" borderRadius="md">
          <details>
            <summary style={{ cursor: 'pointer', fontWeight: '600', marginBottom: '8px' }}>
              {u.username}’s Contributions
            </summary>
            <GitHubCalendar
              username={u.username}
            //year={new Date().getFullYear()}
           />
          </details>
        </Box>
      ))}
       
      </Box>
      
    );
  }

export default App
