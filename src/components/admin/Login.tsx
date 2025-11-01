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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A]">
      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-md p-8 bg-gray-900/80 backdrop-blur-sm border border-[#FFC107]/30 rounded-2xl shadow-2xl shadow-[#FFC107]/10"
        dir="rtl"
      >
        <h2 className="text-3xl text-[#FFC107] mb-6 font-['Playfair_Display'] italic text-center">
          لوحة التحكم
        </h2>
        <div className="mb-6">
          <label className="block text-sm text-gray-300 mb-2 font-['Inter']">كلمة المرور</label>
          <Input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="bg-gray-800/90 border-gray-700 text-white focus:border-[#FFC107] focus:ring-[#FFC107] h-12 text-base"
            placeholder="أدخل كلمة المرور"
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-red-400 mb-4 text-sm font-['Inter']">{error}</p>}
        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-[#FFC107] to-[#FFD54F] hover:from-[#FFD54F] hover:to-[#FFC107] text-black font-bold h-12 text-base shadow-lg"
        >
          دخول
        </Button>
      </form>
    </div>
  );
}
