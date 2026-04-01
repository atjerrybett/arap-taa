import { TreePine, Heart, Globe, BookOpen, Users, Star } from 'lucide-react';
import Link from 'next/link';
import { FAQ } from '@/components/FAQ';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-earth-50 dark:bg-earth-950">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-amber-100 via-earth-100 to-sage-100 dark:from-earth-900 dark:via-earth-950 dark:to-sage-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-200/50 dark:bg-amber-900/40 rounded-full text-amber-700 dark:text-amber-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-earth-900 dark:text-earth-100 mb-6">
            About the <span className="text-amber-600 dark:text-amber-400">Arap Taa</span> Legacy
          </h1>
          <p className="text-lg text-earth-600 dark:text-earth-300 leading-relaxed max-w-2xl mx-auto">
            This digital archive preserves and celebrates the heritage of the Arap Taa family, 
            connecting generations past, present, and future through shared history and stories.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Origin */}
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-4">
                Our Origin
              </h2>
              <p className="text-earth-600 dark:text-earth-400 leading-relaxed mb-4">
                The Arap Taa family traces its roots to our great patriarch, Arap Taa, whose 
                vision and values have shaped generations. Through his three marriages, he 
                established three noble houses, each carrying forward his legacy in unique ways.
              </p>
              <p className="text-earth-600 dark:text-earth-400 leading-relaxed">
                Today, the family spans five generations and continues to grow, with each 
                member adding their own chapter to this remarkable story.
              </p>
            </div>
            <div className="p-8 bg-white dark:bg-earth-900 rounded-2xl shadow-sm">
              <div className="space-y-4">
                {[
                  { name: 'House of Bot Evaline', color: 'bg-amber-500', desc: 'First wife — the most documented lineage' },
                  { name: 'House of Bot Jonah', color: 'bg-cyan-500', desc: 'Second wife — branch being documented' },
                  { name: 'House of Bot Samson', color: 'bg-violet-500', desc: 'Third wife — branch being documented' },
                ].map((house) => (
                  <div key={house.name} className="flex items-start gap-3">
                    <div className={`w-3 h-3 rounded-full ${house.color} mt-1.5 flex-shrink-0`} />
                    <div>
                      <p className="font-semibold text-earth-900 dark:text-earth-100">{house.name}</p>
                      <p className="text-sm text-earth-500 dark:text-earth-400">{house.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mission */}
          <div className="text-center p-12 bg-white dark:bg-earth-900 rounded-2xl shadow-sm">
            <Star className="w-12 h-12 mx-auto text-amber-500 mb-6" />
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-4">
              Our Mission
            </h2>
            <p className="text-earth-600 dark:text-earth-400 leading-relaxed max-w-2xl mx-auto text-lg">
              To preserve our family heritage through digital storytelling, connecting every 
              member of the Arap Taa family to their roots and to each other, ensuring that 
              our stories, traditions, and bonds endure for generations to come.
            </p>
          </div>

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-8 text-center">
              What You Can Do Here
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: TreePine,
                  title: 'Explore the Tree',
                  desc: 'Navigate the interactive family tree and discover connections between family members.',
                },
                {
                  icon: Users,
                  title: 'Find Family',
                  desc: 'Search and browse the people directory to learn about every family member.',
                },
                {
                  icon: Heart,
                  title: 'Trace Lineage',
                  desc: 'Highlight paths between family members to visualize generational connections.',
                },
                {
                  icon: Globe,
                  title: 'Three Houses',
                  desc: 'Explore the three distinct houses founded by Arap Taa\'s marriages.',
                },
                {
                  icon: BookOpen,
                  title: 'Read Stories',
                  desc: 'Learn about each family member through their profiles, bios, and memories.',
                },
                {
                  icon: Star,
                  title: 'Grow the Legacy',
                  desc: 'The archive is designed to grow as new family members and stories are added.',
                },
              ].map((feature) => (
                <div key={feature.title} className="p-6 bg-white dark:bg-earth-900 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <feature.icon className="w-8 h-8 text-amber-500 mb-4" />
                  <h3 className="font-semibold text-earth-900 dark:text-earth-100 mb-2">{feature.title}</h3>
                  <p className="text-sm text-earth-600 dark:text-earth-400 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <FAQ />
          </div>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-earth-900 dark:text-earth-100 mb-4">
              Ready to Explore?
            </h2>
            <p className="text-earth-600 dark:text-earth-400 mb-8">
              Start discovering the Arap Taa family legacy today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tree"
                className="inline-flex items-center gap-2 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-lg shadow-amber-600/25 transition-all hover:-translate-y-0.5"
              >
                <TreePine className="w-5 h-5" />
                View Family Tree
              </Link>
              <Link
                href="/people"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-earth-800 text-earth-700 dark:text-earth-200 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
              >
                <Users className="w-5 h-5" />
                Browse People
              </Link>
            </div>
          </div>

          {/* Credits */}
          <div className="text-center pt-8 border-t border-earth-200 dark:border-earth-800">
            <p className="text-earth-500 dark:text-earth-400 flex items-center justify-center gap-1">
              Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> by Jerry
            </p>
            <p className="text-sm text-earth-400 dark:text-earth-500 mt-2">
              For the Arap Taa family — past, present, and future.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
