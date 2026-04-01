import { HomeTreeView } from '@/components/HomeTreeView';
import { TreePine, Users, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-earth-100 to-sage-100 dark:from-earth-900 dark:via-earth-950 dark:to-sage-950" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage-500 rounded-full blur-3xl" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-4 sm:mb-6">
              <TreePine className="w-4 h-4" />
              Preserving Our Heritage
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-earth-900 dark:text-earth-50 mb-4 sm:mb-6 tracking-tight">
              Arap Taa
              <span className="block text-amber-600 dark:text-amber-400">Family Legacy</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-earth-600 dark:text-earth-300 mb-6 sm:mb-10 leading-relaxed">
              Celebrating the rich heritage of the Arap Taa family. From our great patriarch through three noble houses, our legacy grows stronger with each generation.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/tree"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-lg shadow-amber-600/25 hover:shadow-amber-600/40 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <TreePine className="w-5 h-5" />
                Explore Family Tree
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-white dark:bg-earth-800 text-earth-700 dark:text-earth-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 w-full sm:w-auto"
              >
                <Users className="w-5 h-5" />
                People Directory
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-earth-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Family Members', value: '50+', icon: Users },
              { label: 'Generations', value: '5', icon: TreePine },
              { label: 'Houses', value: '3', icon: BookOpen },
              { label: 'Stories', value: '∞', icon: Sparkles },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-6 rounded-2xl bg-earth-50 dark:bg-earth-800">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-amber-500" />
                <p className="text-3xl font-bold text-earth-900 dark:text-earth-100">{stat.value}</p>
                <p className="text-sm text-earth-600 dark:text-earth-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Family Tree Section */}
      <section className="py-16 bg-earth-50 dark:bg-earth-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 dark:text-earth-100 mb-4">
              Our Family Tree
            </h2>
            <p className="text-earth-600 dark:text-earth-400 max-w-xl mx-auto">
              Click on any family member to view their profile. Expand houses to explore different branches of the family.
            </p>
          </div>
          
          <HomeTreeView />
        </div>
      </section>

      {/* Houses Overview */}
      <section className="py-16 bg-white dark:bg-earth-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-earth-900 dark:text-earth-100 mb-4">
              The Three Houses
            </h2>
            <p className="text-earth-600 dark:text-earth-400">
              The Arap Taa legacy branches through three noble houses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'House of Bot Evaline',
                color: 'amber',
                borderColor: 'border-amber-500',
                bgColor: 'bg-amber-50 dark:bg-amber-950/20',
                dotColor: 'bg-amber-500',
                desc: 'The most extensively documented lineage, tracing from Elizabeth (Lesebet) through five generations to the present day.',
              },
              {
                name: 'House of Bot Jonah',
                color: 'cyan',
                borderColor: 'border-cyan-500',
                bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
                dotColor: 'bg-cyan-500',
                desc: 'The second house of the Arap Taa family. Details of this lineage are being gathered and will be added soon.',
              },
              {
                name: 'House of Bot Samson',
                color: 'violet',
                borderColor: 'border-violet-500',
                bgColor: 'bg-violet-50 dark:bg-violet-950/20',
                dotColor: 'bg-violet-500',
                desc: 'The third house of the Arap Taa family. This branch is being documented and will be expanded.',
              },
            ].map((house) => (
              <div 
                key={house.name}
                className={`p-8 rounded-2xl border-l-4 ${house.borderColor} ${house.bgColor} transition-transform hover:-translate-y-1`}
              >
                <div className={`w-4 h-4 rounded-full ${house.dotColor} mb-4`} />
                <h3 className="text-xl font-bold text-earth-900 dark:text-earth-100 mb-3">
                  {house.name}
                </h3>
                <p className="text-earth-600 dark:text-earth-400 leading-relaxed">
                  {house.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
