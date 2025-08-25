
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, CheckCircle, Car, Home, Paintbrush, Wrench, ChefHat } from 'lucide-react';
import Image from 'next/image';
import { useTranslation } from '@/components/i18n-provider';

const categories = [
  { name: "Driver", icon: <Car className="w-12 h-12 text-primary mb-4" />, descriptionKey: "recruiter_home_category_driver_desc" },
  { name: "House Helper", icon: <Home className="w-12 h-12 text-primary mb-4" />, descriptionKey: "recruiter_home_category_helper_desc" },
  { name: "Painter", icon: <Paintbrush className="w-12 h-12 text-primary mb-4" />, descriptionKey: "recruiter_home_category_painter_desc" },
  { name: "Technician", icon: <Wrench className="w-12 h-12 text-primary mb-4" />, descriptionKey: "recruiter_home_category_technician_desc" },
  { name: "Cook", icon: <ChefHat className="w-12 h-12 text-primary mb-4" />, descriptionKey: "recruiter_home_category_cook_desc" },
];

export default function RecruiterWelcomePage() {
  const { user, isProfileComplete } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (isProfileComplete) {
      router.replace('/recruiter');
    }
  }, [isProfileComplete, router]);

  const handleCompleteProfile = () => {
    router.push('/recruiter/profile');
  };

  if (!user) return null;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
              {t('recruiter_home_title')}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t('recruiter_home_subtitle')}
            </p>
            <Button size="lg" onClick={handleCompleteProfile}>
              {t('recruiter_home_cta_button')} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('recruiter_home_categories_title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {categories.map((category) => (
              <Card key={category.name} className="text-center hover:shadow-xl transition-shadow border-0 bg-white">
                <CardHeader className="items-center">
                  {category.icon}
                  <CardTitle>{category.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{t(category.descriptionKey as any)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-10">{t('recruiter_home_why_title')}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">{t('recruiter_home_why_verified')}</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">{t('recruiter_home_why_fast')}</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">{t('recruiter_home_why_direct')}</h3>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-none">
              <CardContent className="flex flex-col items-center text-center p-6">
                <CheckCircle className="w-12 h-12 text-primary mb-4"/>
                <h3 className="text-xl font-semibold mb-2">{t('recruiter_home_why_support')}</h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">{t('recruiter_home_how_title')}</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="space-y-2">
              <span className="text-primary font-bold text-lg">Step 1</span>
              <h3 className="text-xl font-semibold">{t('recruiter_home_how_step1_title')}</h3>
              <p className="text-muted-foreground">{t('recruiter_home_how_step1_desc')}</p>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-bold text-lg">Step 2</span>
              <h3 className="text-xl font-semibold">{t('recruiter_home_how_step2_title')}</h3>
              <p className="text-muted-foreground">{t('recruiter_home_how_step2_desc')}</p>
            </div>
            <div className="space-y-2">
              <span className="text-primary font-bold text-lg">Step 3</span>
              <h3 className="text-xl font-semibold">{t('recruiter_home_how_step3_title')}</h3>
              <p className="text-muted-foreground">{t('recruiter_home_how_step3_desc')}</p>
            </div>
          </div>
          <Button size="lg" className="mt-12" onClick={handleCompleteProfile}>{t('recruiter_home_how_cta_button')}</Button>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('recruiter_home_final_cta_title')}</h2>
          <Button variant="secondary" size="lg" onClick={handleCompleteProfile} className="text-primary bg-white hover:bg-gray-200">
            {t('recruiter_home_final_cta_button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
