import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ParticlesBackground } from '../components/ParticlesBackground';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { findUserByEmail, saveUser, saveAuth } from '../utils/auth';

export function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      setError('Este email já está em uso');
      return;
    }

    const user = {
      id: crypto.randomUUID(),
      email,
      username,
      password,
      balance: 0,
      createdAt: new Date().toISOString(),
    };

    saveUser(user);
    saveAuth(user);
    navigate('/');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      <ParticlesBackground />
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface p-4 sm:p-8 rounded-lg shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            Registro
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
              label="Nome de usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              Registrar
            </Button>
          </form>
          <p className="mt-4 text-sm sm:text-base text-center text-gray-400">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-primary hover:underline">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}