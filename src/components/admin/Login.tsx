import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAuth } from '../../context/AuthContext';

export function Login({ onSuccess }: { onSuccess?: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e?: any) => {
    e?.preventDefault();
    setError(null);
    const ok = await login(password);
    if (!ok) setError('كلمة المرور غير صحيحة');
    else onSuccess?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A]">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-gray-900/60 border border-[#FFC107]/20 rounded-xl">
        <h2 className="text-2xl text-[#FFC107] mb-4">تسجيل دخول المدير</h2>
        <label className="block text-sm text-white mb-2">كلمة المرور</label>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 bg-gray-800 text-white" />
        {error && <p className="text-red-400 mb-2">{error}</p>}
        <div className="flex justify-end">
          <Button type="submit" className="bg-[#FFC107] text-black">دخول</Button>
        </div>
      </form>
    </div>
  );
}
