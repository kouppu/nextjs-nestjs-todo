import Link from 'next/link';
import Container from '@mui/material/Container';
import Header from 'components/organisms/Header';
import LoginForm from 'components/organisms/LoginForm';

const LoginTemplate = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Container maxWidth="sm">
          <section>
            <h1>Login</h1>
            <LoginForm />
          </section>

          <section>
            <Link href="/join">Create an account.</Link>
          </section>
        </Container>
      </main>
    </>
  );
};

export default LoginTemplate;
