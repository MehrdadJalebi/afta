import type { Metadata } from 'next';

import { Login } from './components/Login';

export const metadata: Metadata = {
  title: 'ورود',
  description: 'افتا',
};

export default function LoginPage() {
  return <Login />;
}
