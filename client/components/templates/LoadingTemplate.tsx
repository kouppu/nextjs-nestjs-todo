import Container from '@mui/material/Container';
import Header from 'components/organisms/Header';
import Loading from 'components/molecules/Loading';

const LoadingTemplate = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="sm">
          <section>
            <Loading />
          </section>
        </Container>
      </main>
    </>
  );
};

export default LoadingTemplate;
