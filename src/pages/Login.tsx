import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { validateCredentials, saveAuth } from '../utils/auth';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const user = validateCredentials(email, password);
    if (!user) {
      setError('Email ou senha inválidos');
      return;
    }

    saveAuth(user);
    navigate('/', { replace: true });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface p-4 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
          <p className="mt-4 text-sm sm:text-base text-center text-gray-400">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-primary hover:underline">
              Registre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}