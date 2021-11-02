import Container from '@mui/material/Container';
import Header from 'components/organisms/Header';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import TaskList from 'components/organisms/TaskList';
import TaskRegistrationForm from 'components/organisms/TaskRegistrationForm';

const HomeTemplate = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="sm">
          <section>
            <h1>Home</h1>
            <Card>
              <CardHeader title={'Tasks'} />
              <CardContent>
                <TaskRegistrationForm />
                <TaskList />
              </CardContent>
            </Card>
          </section>
        </Container>
      </main>
    </>
  );
};

export default HomeTemplate;
