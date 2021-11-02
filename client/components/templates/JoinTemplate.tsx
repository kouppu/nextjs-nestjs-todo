import Container from '@mui/material/Container';
import Header from 'components/organisms/Header';
import JoinForm from 'components/organisms/JoinForm';

const JoinTemplate = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="sm">
          <section>
            <h1>Join</h1>
            <JoinForm />
          </section>
        </Container>
      </main>
    </>
  );
};

export default JoinTemplate;
