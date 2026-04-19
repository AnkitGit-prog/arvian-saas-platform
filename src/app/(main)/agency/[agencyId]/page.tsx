import { db } from "@/lib/db";
import { pricingCards } from "@/lib/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CreditCard,
  Rocket,
  Settings,
  LayoutDashboard,
  Shield,
  Database,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/components/global/logo-image";

type Props = {
  params: Promise<{ agencyId: string }>;
};

const Page = async ({ params }: Props) => {
  const { agencyId } = await params;

  const agency = await db.agency.findUnique({
    where: { id: agencyId },
    include: {
      SubAccount: true,
      Subscription: true,
    },
  });

  if (!agency) return null;

  const currentPlan = pricingCards.find(
    (c) => c.priceId === agency.Subscription?.priceId
  );

  const subAccountCount = agency.SubAccount.length;
  const isSubscribed = agency.Subscription?.active === true;

  const quickLinks = [
    {
      label: "Launchpad",
      href: `/agency/${agencyId}/launchpad`,
      icon: Rocket,
      description: "Set up your account",
    },
    {
      label: "Sub Accounts",
      href: `/agency/${agencyId}/all-subaccounts`,
      icon: Users,
      description: `${subAccountCount} account${subAccountCount !== 1 ? "s" : ""}`,
    },
    {
      label: "Billing",
      href: `/agency/${agencyId}/billing`,
      icon: CreditCard,
      description: isSubscribed ? currentPlan?.title ?? "Active" : "No plan",
    },
    {
      label: "Team",
      href: `/agency/${agencyId}/team`,
      icon: Shield,
      description: "Manage members",
    },
    {
      label: "Media",
      href: `/agency/${agencyId}/media`,
      icon: Database,
      description: "Your media library",
    },
    {
      label: "Settings",
      href: `/agency/${agencyId}/settings`,
      icon: Settings,
      description: "Agency configuration",
    },
  ];

  return (
    <div className="flex flex-col p-4 sm:p-8 min-h-screen relative overflow-hidden bg-[#0a0a0f]">
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Welcome Unit */}
      <div className="relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/5 shadow-2xl mb-8 p-1">
        <div className="absolute inset-0 bg-noise opacity-5 pointer-events-none mix-blend-overlay" />
        <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-[1.85rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 backdrop-blur-3xl">
          <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
            <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-bl from-primary to-purple-500 shadow-xl shrink-0">
              <LogoImage
                src={agency.agencyLogo}
                alt={agency.name}
                width={96}
                height={96}
                className="rounded-full object-cover w-full h-full border-[3px] border-[#0a0a0f] bg-[#0a0a0f]"
              />
            </div>
            <div>
              <h4 className="text-zinc-400 font-semibold tracking-wide text-sm mb-1 uppercase">Welcome to HQ</h4>
              <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 mb-2">
                {agency.name}
              </h1>
              <div className="flex items-center gap-3">
                <Badge className={`rounded-full px-4 py-1.5 border-0 ${isSubscribed ? 'bg-primary/20 text-primary' : 'bg-white/10 text-white/60'}`}>
                  {isSubscribed ? currentPlan?.title ?? "Active" : "Free Tier"}
                </Badge>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
                <span className="text-sm font-medium text-white/50">{agency.city}, {agency.state}</span>
              </div>
            </div>
          </div>

          <div className="hidden md:block w-px h-24 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Quick Subscription Overview in Hero */}
          <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto mt-4 md:mt-0 bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/5 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Rocket className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-400 font-medium">Plan Type</p>
                <p className="font-bold text-white text-lg">{isSubscribed ? currentPlan?.title ?? "Active" : "No Plan"}</p>
              </div>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-zinc-400 font-medium">Auto-renew</p>
                <p className="font-semibold text-white/90 text-sm">
                  {agency.Subscription?.currentPeriodEndDate
                    ? new Date(agency.Subscription.currentPeriodEndDate).toLocaleDateString()
                    : "Not active"}
                </p>
              </div>
              <div>
                <Badge variant="outline" className={`${isSubscribed ? 'text-green-400 border-green-400/20' : 'text-zinc-500 border-zinc-800'} bg-transparent`}>
                  {isSubscribed ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Column: Analytics / Stats */}
        <div className="flex flex-col gap-6 xl:w-1/3">
          <h2 className="text-xl font-bold flex items-center gap-2 px-1">
            <Database className="w-5 h-5 text-zinc-500" />
            Agency Overview
          </h2>
          
          <Card className="bg-gradient-to-br from-[#13131a] to-black border-white/5 shadow-xl relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-bl-full blur-2xl" />
            <CardContent className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-sm font-medium text-zinc-400 mb-1">Managed Entities</p>
                  <p className="text-xl font-semibold text-white">Sub Accounts</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-end gap-3">
                <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-200">
                  {subAccountCount}
                </span>
                <span className="text-sm font-medium text-zinc-500 mb-2">Total accounts</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#13131a] to-black border-white/5 shadow-xl p-8">
            <h3 className="text-sm font-medium text-zinc-400 mb-6">Administrator</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center border border-zinc-700">
                <span className="text-lg font-bold text-zinc-300">
                  {agency.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="font-medium text-white truncate">{agency.name} Owner</p>
                <p className="text-sm text-zinc-500 truncate">{agency.companyEmail}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Navigational Bento Grid */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-zinc-500" />
              Quick Actions
            </h2>
            <Link href={`/agency/${agencyId}/settings`} className="text-sm font-medium text-primary hover:underline">
              All Settings &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 h-full">
            {quickLinks.map(({ label, href, icon: Icon, description }, index) => {
              // Create an interesting pattern for the bento layout
              const isLarge = index === 0;
              const colorTheme = isLarge ? "from-primary/20 via-primary/5 to-transparent border-primary/20" : "from-white/5 to-transparent border-white/5";
              const iconColor = isLarge ? "text-primary" : "text-zinc-400 group-hover:text-white";

              return (
                <Link key={href} href={href} className={isLarge ? "sm:col-span-2" : ""}>
                  <Card className={`group relative h-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 bg-gradient-to-br ${colorTheme} hover:border-primary/40 backdrop-blur-md`}>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300" />
                    
                    <CardHeader className={`relative z-10 ${isLarge ? "p-8 md:p-10" : "p-6"}`}>
                      <div className={`flex ${isLarge ? "flex-col md:flex-row items-start md:items-center justify-between" : "flex-col"}`}>
                        <div className="flex flex-col gap-4">
                          <div className={`rounded-xl bg-black/40 border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 ${isLarge ? "w-16 h-16" : "w-12 h-12"}`}>
                            <Icon className={`${isLarge ? "w-8 h-8" : "w-6 h-6"} ${iconColor}`} />
                          </div>
                          <div>
                            <CardTitle className={`${isLarge ? "text-2xl md:text-3xl" : "text-lg"} font-bold text-white mb-2`}>
                              {label}
                            </CardTitle>
                            <p className={`${isLarge ? "text-sm md:text-base text-zinc-400" : "text-xs text-zinc-500"} font-medium`}>
                              {description}
                            </p>
                          </div>
                        </div>
                        
                        {isLarge && (
                          <div className="mt-6 md:mt-0 p-4 rounded-full bg-primary text-black font-bold opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                            &rarr;
                          </div>
                        )}
                      </div>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
