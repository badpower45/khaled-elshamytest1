import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { User, Briefcase, Image, MessageSquare, Award, Mail, Share2, Save, Plus, Trash2 } from 'lucide-react';
import { useSiteData } from '../../context/SiteDataContext';
import { ImageUploadField } from './ImageUploadField';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card } from '../ui/card';
import { toast } from 'sonner';
import { Login } from './Login';


// Dummy save handler for tabs that need explicit save
function handleSave(section: string) {
  toast.success(`تم حفظ التغييرات في قسم: ${section}`);
}

export function AdminPanel() {
  const { 
    data, 
    updatePersonalInfo, 
    updateService, 
    updatePortfolio, 
    addPortfolio,
    removePortfolio,
    updateTestimonial, 
    addTestimonial,
    removeTestimonial,
    updateAward, 
    addAward,
    removeAward,
    updateContactInfo, 
    updateSocialMedia,
    setAllData 
  } = useSiteData();
  const [activeTab, setActiveTab] = useState('personal');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const saveToCloud = async () => {
    try {
      const payload = [{ id: 1, data }];
      const { error } = await supabase.from('site').upsert(payload);
      if (error) toast.error('خطأ في الحفظ على السحابة: ' + error.message);
      else toast.success('تم الحفظ على السحابة');
    } catch (err: any) {
      toast.error('Save error: ' + String(err?.message || err));
    }
  };

  const loadFromCloud = async () => {
    try {
      const { data: rows, error } = await supabase.from('site').select('data').eq('id', 1).limit(1);
      if (error) return toast.error('خطأ في التحميل: ' + error.message);
      if (rows && rows.length) {
        setAllData(rows[0].data as any);
        toast.success('تم التحميل من السحابة');
      } else {
        toast('لا يوجد بيانات في السحابة');
      }
    } catch (err: any) {
      toast.error('Load error: ' + String(err?.message || err));
    }
  };

  if (!isAuthenticated) {
    return <Login onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl sm:text-4xl text-[#FFC107] font-['Playfair_Display'] italic" dir="rtl">
              لوحة التحكم
            </h1>
            <div className="flex gap-3">
              <Button 
                onClick={loadFromCloud} 
                className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 shadow-lg"
              >
                <span className="mr-2">📥</span>
                تحميل من السحابة
              </Button>
              <Button 
                onClick={saveToCloud} 
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white border-0 shadow-lg"
              >
                <span className="mr-2">💾</span>
                حفظ على السحابة
              </Button>
            </div>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 gap-2 bg-gray-900/70 p-2 rounded-xl mb-8 border border-[#FFC107]/10" dir="rtl">
            <TabsTrigger value="personal" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span className="hidden sm:inline">المعلومات</span>
              <span className="sm:hidden">معلومات</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>خدمات</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <Image className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>معرض</span>
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>شهادات</span>
            </TabsTrigger>
            <TabsTrigger value="awards" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>جوائز</span>
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>تواصل</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-[#FFC107] data-[state=active]:text-black text-xs sm:text-sm whitespace-nowrap">
              <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              <span>سوشيال</span>
            </TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal">
            <Card className="bg-gray-700/95 border-[#FFC107]/40 p-8">
              <h2 className="text-2xl text-[#FFC107] mb-6 font-['Playfair_Display'] text-right">
                المعلومات الشخصية
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">الاسم بالعربية</label>
                  <Input
                    value={data.personalInfo.nameAr}
                    onChange={(e) => updatePersonalInfo({ nameAr: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">الاسم بالإنجليزية</label>
                  <Input
                    value={data.personalInfo.nameEn}
                    onChange={(e) => updatePersonalInfo({ nameEn: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">العنوان المهني بالعربية</label>
                  <Input
                    value={data.personalInfo.titleAr}
                    onChange={(e) => updatePersonalInfo({ titleAr: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white text-right"
                    dir="rtl"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">العنوان المهني بالإنجليزية</label>
                  <Input
                    value={data.personalInfo.titleEn}
                    onChange={(e) => updatePersonalInfo({ titleEn: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2 text-right font-['Inter']">التخصص</label>
                  <Input
                    value={data.personalInfo.specialization}
                    onChange={(e) => updatePersonalInfo({ specialization: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2 text-right font-['Inter']">الشعار</label>
                  <Input
                    value={data.personalInfo.slogan}
                    onChange={(e) => updatePersonalInfo({ slogan: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">متابعين Instagram</label>
                  <Input
                    value={data.personalInfo.instagramFollowers}
                    onChange={(e) => updatePersonalInfo({ instagramFollowers: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">عدد المنشورات</label>
                  <Input
                    value={data.personalInfo.posts}
                    onChange={(e) => updatePersonalInfo({ posts: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2 text-right font-['Inter']">الرؤية بالعربية</label>
                  <Textarea
                    value={data.personalInfo.visionAr}
                    onChange={(e) => updatePersonalInfo({ visionAr: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white text-right"
                    rows={4}
                    dir="rtl"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2 text-right font-['Inter']">الرؤية بالإنجليزية</label>
                  <Textarea
                    value={data.personalInfo.visionEn}
                    onChange={(e) => updatePersonalInfo({ visionEn: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={4}
                  />
                </div>

                <div className="md:col-span-2">
                  <ImageUploadField
                    value={data.personalInfo.heroImage}
                    onChange={(url) => updatePersonalInfo({ heroImage: url })}
                    label="صورة البطل الرئيسية"
                    placeholder="https://images.unsplash.com/..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2 text-right font-['Inter']">رابط فيديو البطل (اختياري - YouTube/Vimeo)</label>
                  <Input
                    value={data.personalInfo.heroVideoUrl || ''}
                    onChange={(e) => updatePersonalInfo({ heroVideoUrl: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://player.vimeo.com/video/1126504175..."
                  />
                  <p className="text-xs text-gray-500 mt-1 font-['Inter']">
                    💡 استخدم رابط Vimeo Embed للحصول على أداء ممتاز
                  </p>
                  <p className="text-xs text-[#FFC107]/80 mt-1 font-['Inter']">
                    ⚡ يمنع بطء تحميل الصفحة - الفيديو يُحمل فقط عند الحاجة
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={() => handleSave('المعلومات الشخصية')}
                  className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services">
            <div className="space-y-6">
              {data.services.map((service, index) => (
                <Card key={service.id} className="bg-gray-700/95 border-[#FFC107]/40 p-6">
                  <h3 className="text-xl text-[#FFC107] mb-4 font-['Playfair_Display'] text-right">
                    خدمة {index + 1}
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">لعنوان بالعربية</label>
                      <Input
                        value={service.titleAr}
                        onChange={(e) => updateService(service.id, { titleAr: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">العنوان بالإنجليزية</label>
                      <Input
                        value={service.titleEn}
                        onChange={(e) => updateService(service.id, { titleEn: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الوصف بالعربية</label>
                      <Textarea
                        value={service.descriptionAr}
                        onChange={(e) => updateService(service.id, { descriptionAr: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        rows={2}
                        dir="rtl"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الوصف بالإنجليزية</label>
                      <Textarea
                        value={service.descriptionEn}
                        onChange={(e) => updateService(service.id, { descriptionEn: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        rows={2}
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">المميزات (مفصولة بفواصل)</label>
                      <Input
                        value={service.features.join(', ')}
                        onChange={(e) => updateService(service.id, { features: e.target.value.split(', ') })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button 
                  onClick={() => handleSave('الخدمات')}
                  className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ جميع الخدمات
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio">
            <div className="space-y-6">
              {/* Vimeo Privacy Instructions */}
              <Card className="bg-gradient-to-r from-[#FFC107]/10 to-[#FFD54F]/10 border-[#FFC107]/30 p-6">
                <div className="space-y-3" dir="rtl">
                  <h3 className="text-xl text-[#FFC107] font-['Playfair_Display'] flex items-center gap-2">
                    <span>✅</span>
                    <span>طريقة الحصول على رابط Vimeo الصحيح</span>
                  </h3>
                  
                  <p className="text-white font-['Inter']">
                    للحصول على رابط Embed من Vimeo، اتبع الخطوات التالية:
                  </p>
                  
                  <ol className="list-decimal list-inside space-y-2 text-white font-['Inter'] mr-4">
                    <li>افتح الفيديو على Vimeo (vimeo.com/[رقم_الفيديو])</li>
                    <li>اضغط على زر <span className="text-[#FFC107] font-bold">"Share"</span> (مشاركة)</li>
                    <li>اختر تبويب <span className="text-[#FFC107] font-bold">"Embed"</span></li>
                    <li>انسخ الرابط من داخل <code className="bg-black/50 px-2 py-1 rounded text-[#FFC107]">src="..."</code></li>
                    <li>الصق الرابط في خانة "رابط الفيديو" بالأسفل</li>
                  </ol>
                  
                  <div className="bg-black/30 p-3 rounded-lg border border-[#FFC107]/20">
                    <p className="text-gray-300 font-['Inter'] text-sm mb-2">مثال على الرابط الصحيح:</p>
                    <code className="text-[#FFC107] text-xs break-all font-mono">
                      https://player.vimeo.com/video/1126504175?title=0&byline=0&portrait=0&badge=0&autopause=0&player_id=0&app_id=58479
                    </code>
                  </div>
                  
                  <p className="text-gray-300 font-['Inter'] text-sm">
                    💡 تأكد من ضبط إعدادات الخصوصية على <span className="text-[#FFC107]">Anyone</span> و <span className="text-[#FFC107]">Anywhere</span>
                  </p>
                </div>
              </Card>

              {data.portfolio.map((item, index) => (
                <Card key={item.id} className="bg-gray-700/95 border-[#FFC107]/40 p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      onClick={() => {
                        if (data.portfolio.length > 1) {
                          removePortfolio(item.id);
                          toast.success('تم حذف العمل');
                        } else {
                          toast.error('يجب أن يكون هناك عمل واحد على الأقل');
                        }
                      }}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      حذف
                    </Button>
                    <h3 className="text-xl text-[#FFC107] font-['Playfair_Display'] text-right">
                      عمل {index + 1}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">العنوان بالعربية</label>
                      <Input
                        value={item.titleAr}
                        onChange={(e) => updatePortfolio(item.id, { titleAr: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">العنوان بالإنجليزية</label>
                      <Input
                        value={item.titleEn}
                        onChange={(e) => updatePortfolio(item.id, { titleEn: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الوصف بالعربية</label>
                      <Input
                        value={item.descriptionAr}
                        onChange={(e) => updatePortfolio(item.id, { descriptionAr: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الوصف بالإنجليزية</label>
                      <Input
                        value={item.descriptionEn}
                        onChange={(e) => updatePortfolio(item.id, { descriptionEn: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">رابط الفيديو (Vimeo) ⭐ مطلوب</label>
                      <Input
                        value={item.videoUrl || ''}
                        onChange={(e) => updatePortfolio(item.id, { videoUrl: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="https://player.vimeo.com/video/1126504175?title=0&byline=0..."
                      />
                      <p className="text-xs text-gray-500 mt-1 font-['Inter']">
                        💡 استخدم رابط Vimeo Embed من زر Share → Embed
                      </p>
                      <p className="text-xs text-[#FFC107]/80 mt-1 font-['Inter']">
                        ⚡ الفيديو سيُحمل فقط عند النقر عليه - سرعة ممتازة
                      </p>
                    </div>

                    <div className="md:col-span-2">
                      <ImageUploadField
                        value={item.image || ''}
                        onChange={(url) => updatePortfolio(item.id, { image: url })}
                        label="صورة مصغرة ⭐ مطلوبة (ستظهر في المعرض)"
                        placeholder="https://images.unsplash.com/..."
                      />
                      <p className="text-xs text-gray-500 mt-1 font-['Inter']">
                        💡 هذه الصورة ستظهر كمعاينة للفيديو في معرض الأعمال
                      </p>
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-between items-center">
                <Button 
                  onClick={() => {
                    addPortfolio();
                    toast.success('تم إضافة عمل جديد');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة عمل جديد
                </Button>
                <Button 
                  onClick={() => handleSave('المعرض')}
                  className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ جميع الأعمال
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="space-y-6">
              {data.testimonials.map((testimonial, index) => (
                <Card key={testimonial.id} className="bg-gray-700/95 border-[#FFC107]/40 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      onClick={() => {
                        if (data.testimonials.length > 1) {
                          removeTestimonial(testimonial.id);
                          toast.success('تم حذف الشهادة');
                        } else {
                          toast.error('يجب أن تكون هناك شهادة واحدة على الأقل');
                        }
                      }}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      حذف
                    </Button>
                    <h3 className="text-xl text-[#FFC107] font-['Playfair_Display'] text-right">
                      شهادة {index + 1}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">نص الشهادة</label>
                      <Textarea
                        value={testimonial.text}
                        onChange={(e) => updateTestimonial(testimonial.id, { text: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        rows={3}
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">اسم العميل</label>
                      <Input
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(testimonial.id, { name: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">المنصب</label>
                      <Input
                        value={testimonial.position}
                        onChange={(e) => updateTestimonial(testimonial.id, { position: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الشركة</label>
                      <Input
                        value={testimonial.company}
                        onChange={(e) => updateTestimonial(testimonial.id, { company: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-between items-center">
                <Button 
                  onClick={() => {
                    addTestimonial();
                    toast.success('تم إضافة شهادة جديدة');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة شهادة جديدة
                </Button>
                <Button 
                  onClick={() => handleSave('الشهادات')}
                  className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ جميع الشهادات
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Awards Tab */}
          <TabsContent value="awards">
            <div className="space-y-6">
              {data.awards.map((award, index) => (
                <Card key={award.id} className="bg-gray-700/95 border-[#FFC107]/40 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Button
                      onClick={() => {
                        if (data.awards.length > 1) {
                          removeAward(award.id);
                          toast.success('تم حذف الجائزة');
                        } else {
                          toast.error('يجب أن تكون هناك جائزة واحدة على الأقل');
                        }
                      }}
                      variant="destructive"
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      حذف
                    </Button>
                    <h3 className="text-xl text-[#FFC107] font-['Playfair_Display'] text-right">
                      جائزة {index + 1}
                    </h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">السنة</label>
                      <Input
                        value={award.year}
                        onChange={(e) => updateAward(award.id, { year: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الفئة</label>
                      <Input
                        value={award.category}
                        onChange={(e) => updateAward(award.id, { category: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الجائزة بالعربية</label>
                      <Input
                        value={award.titleAr}
                        onChange={(e) => updateAward(award.id, { titleAr: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الجائزة بالإنجليزية</label>
                      <Input
                        value={award.titleEn}
                        onChange={(e) => updateAward(award.id, { titleEn: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">المؤسسة</label>
                      <Input
                        value={award.organization}
                        onChange={(e) => updateAward(award.id, { organization: e.target.value })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </Card>
              ))}

              <div className="flex justify-between items-center">
                <Button 
                  onClick={() => {
                    addAward();
                    toast.success('تم إضافة جائزة جديدة');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  إضافة جائزة جديدة
                </Button>
                <Button 
                  onClick={() => handleSave('الجوائز')}
                  className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ جميع الجوائز
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="bg-gray-700/95 border-[#FFC107]/40 p-8">
              <h2 className="text-2xl text-[#FFC107] mb-6 font-['Playfair_Display'] text-right">
                معلومات التواصل
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">البريد الإلكتروني</label>
                  <Input
                    value={data.contactInfo.email}
                    onChange={(e) => updateContactInfo({ email: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">الهاتف</label>
                  <Input
                    value={data.contactInfo.phone}
                    onChange={(e) => updateContactInfo({ phone: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">عنوان الاستوديو</label>
                  <Input
                    value={data.contactInfo.studioAddress}
                    onChange={(e) => updateContactInfo({ studioAddress: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white text-right"
                    dir="rtl"
                  />
                </div>

                <div className="md:col-span-2">
                  <h3 className="text-lg text-white mb-4 text-right font-['Inter']">ساعات العمل</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">أيام الأسبوع</label>
                      <Input
                        value={data.contactInfo.workingHours.weekdays}
                        onChange={(e) => updateContactInfo({ workingHours: { ...data.contactInfo.workingHours, weekdays: e.target.value } })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الجمعة</label>
                      <Input
                        value={data.contactInfo.workingHours.friday}
                        onChange={(e) => updateContactInfo({ workingHours: { ...data.contactInfo.workingHours, friday: e.target.value } })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>

                    <div>
                      <label className="block text-white mb-2 text-right font-['Inter'] text-sm">الطوارئ</label>
                      <Input
                        value={data.contactInfo.workingHours.emergency}
                        onChange={(e) => updateContactInfo({ workingHours: { ...data.contactInfo.workingHours, emergency: e.target.value } })}
                        className="bg-gray-800 border-gray-700 text-white text-right"
                        dir="rtl"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* الحفظ التلقائي: لا يوجد زر حفظ */}
            </Card>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social">
            <Card className="bg-gray-700/95 border-[#FFC107]/40 p-8">
              <h2 className="text-2xl text-[#FFC107] mb-6 font-['Playfair_Display'] text-right">
                حسابات التواصل الاجتماعي
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">Instagram</label>
                  <Input
                    value={data.socialMedia.instagram}
                    onChange={(e) => updateSocialMedia({ instagram: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 text-right font-['Inter']">Facebook</label>
                  <Input
                    value={data.socialMedia.facebook}
                    onChange={(e) => updateSocialMedia({ facebook: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white mb-2 text-right font-['Inter']">TikTok</label>
                  <Input
                    value={data.socialMedia.tiktok}
                    onChange={(e) => updateSocialMedia({ tiktok: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    placeholder="https://tiktok.com/@..."
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button 
                  onClick={() => handleSave('حسابات التواصل')}
                  className="bg-[#FFC107] text-black hover:bg-[#FFD54F]"
                >
                  <Save className="w-4 h-4 mr-2" />
                  حفظ التغييرات
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}