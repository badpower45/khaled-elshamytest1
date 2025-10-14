import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  placeholder?: string;
}

export function ImageUploadField({ value, onChange, label, placeholder }: ImageUploadFieldProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">{label}</label>
      
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-gray-800 border-gray-700 text-white flex-1"
          placeholder={placeholder || "https://images.unsplash.com/..."}
        />
        
        <Button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="bg-[#FFC107]/20 border border-[#FFC107]/40 text-[#FFC107] hover:bg-[#FFC107]/30 flex-shrink-0"
        >
          <ImageIcon className="w-4 h-4" />
        </Button>
      </div>

      {showPreview && value && (
        <div className="relative rounded-lg overflow-hidden border border-[#FFC107]/30 mt-2">
          <img 
            src={value} 
            alt="Preview" 
            className="w-full h-48 object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+Image+URL';
            }}
          />
          <Button
            type="button"
            onClick={() => setShowPreview(false)}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 p-2 h-auto"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

      <p className="text-xs text-gray-500 font-['Inter']">
        💡 استخدم Unsplash أو أي رابط صورة مباشر
      </p>
    </div>
  );
}
