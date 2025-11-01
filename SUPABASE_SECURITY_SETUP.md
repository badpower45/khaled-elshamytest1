# إعداد الأمان لـ Supabase - Row Level Security (RLS)

## ⚠️ هام جداً: حماية البيانات

حالياً، أي شخص يملك المفاتيح يقدر يعدل البيانات في جدول `site`. لازم تفعّل **Row Level Security (RLS)** علشان تحمي بياناتك.

---

## الخطوات المطلوبة في Supabase

### 1️⃣ إنشاء جدول `site` (إذا لم يكن موجوداً)

افتح **SQL Editor** في لوحة تحكم Supabase وشغّل الكود ده:

```sql
-- إنشاء الجدول
CREATE TABLE IF NOT EXISTS public.site (
  id int PRIMARY KEY,
  data jsonb,
  updated_at timestamptz DEFAULT now()
);

-- إدخال سطر أولي
INSERT INTO public.site (id, data) 
VALUES (1, '{}')
ON CONFLICT (id) DO NOTHING;
```

---

### 2️⃣ تفعيل Row Level Security (RLS)

```sql
-- تفعيل RLS على جدول site
ALTER TABLE public.site ENABLE ROW LEVEL SECURITY;
```

---

### 3️⃣ إنشاء سياسات الأمان (Policies)

#### **السماح بالقراءة للجميع** (للموقع العادي):

```sql
-- أي شخص يقدر يقرأ البيانات
CREATE POLICY "Allow public read access"
ON public.site
FOR SELECT
TO anon, authenticated
USING (true);
```

#### **منع الكتابة تماماً من الـ anon key**:

```sql
-- منع أي تعديل من الـ anon role
CREATE POLICY "Block anon writes"
ON public.site
FOR INSERT, UPDATE, DELETE
TO anon
USING (false);
```

---

### 4️⃣ إنشاء حساب Admin في Supabase Auth (الحل الأمثل)

**لتأمين لوحة التحكم بشكل صحيح:**

1. اذهب إلى **Authentication** → **Users** في Supabase
2. اضغط **Add user** → **Create new user**
3. أدخل بريد إلكتروني وباسورد قوي
4. سجّل البريد والباسورد بأمان

ثم **أضف سياسة** تسمح فقط للمستخدم المُسجّل بالتعديل:

```sql
-- السماح بالكتابة فقط للمستخدمين المُسجّلين
CREATE POLICY "Allow authenticated admin writes"
ON public.site
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (true)
WITH CHECK (true);
```

---

### 5️⃣ تحديث كود لوحة التحكم (اختياري - للأمان الكامل)

إذا أردت استخدام Supabase Auth بدلاً من الباسورد:

1. افتح `src/context/AuthContext.tsx`
2. استبدل الـ `login` function بـ:

```typescript
const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) {
    console.error('Login error:', error);
    return false;
  }
  
  setIsAuthenticated(true);
  return true;
};
```

---

## ✅ التحقق من الأمان

بعد تطبيق الخطوات السابقة، جرّب:

1. **افتح Console المتصفح** (F12)
2. جرّب تشغيل:

```javascript
// محاولة التعديل بدون تصريح (يجب أن تفشل)
const { data, error } = await supabase
  .from('site')
  .update({ data: {} })
  .eq('id', 1);

console.log(error); // يجب أن ترى خطأ "new row violates row-level security policy"
```

إذا ظهر الخطأ، معناها RLS شغال صح! ✅

---

## 🔐 ملخص الأمان

| الحالة | الوصف | الحماية |
|--------|-------|---------|
| **بدون RLS** | ❌ أي شخص يعرف الـ anon key يقدر يمسح/يعدل كل البيانات | خطير جداً |
| **مع RLS** | ✅ فقط المستخدمين المسجّلين في Supabase Auth يقدروا يعدّلوا | آمن |
| **مع Supabase Auth** | ✅ أمان كامل مع session management وتسجيل خروج تلقائي | الحل الأمثل |

---

## 📞 دعم إضافي

- **Supabase RLS Docs**: https://supabase.com/docs/guides/auth/row-level-security
- **Supabase Auth Docs**: https://supabase.com/docs/guides/auth/quickstarts/react

---

**تم إنشاء هذا الملف بواسطة Replit Agent** 🤖
