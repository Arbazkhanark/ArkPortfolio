'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, GitPullRequest, GitMerge, Star } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

// ---------------- Types ----------------
interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
}

interface CommitChart {
  month: string;
  commits: number;
}

export const GitHubActivity = () => {
  const [commits, setCommits] = useState<GitHubCommit[]>([]);
  const [stats, setStats] = useState<GitHubUser | null>(null);

  const username = "Arbazkhanark";
  const repo = "Namaste-DSA";

  useEffect(() => {
    // fetch commits
    fetch(`https://api.github.com/repos/${username}/${repo}/commits?per_page=5`)
      .then((res) => res.json())
      .then((data: GitHubCommit[]) => setCommits(data))
      .catch((err) => console.error("Error fetching commits:", err));

    // fetch user stats
    fetch(`https://api.github.com/users/${username}`)
      .then((res) => res.json())
      .then((data: GitHubUser) => setStats(data))
      .catch((err) => console.error("Error fetching stats:", err));
  }, []);

  const commitData: CommitChart[] = [
    { month: "Jan", commits: 20 },
    { month: "Feb", commits: 45 },
    { month: "Mar", commits: 33 },
    { month: "Apr", commits: 60 },
  ];

  const statCards = [
    { icon: GitCommit, label: "Public Repos", value: stats?.public_repos ?? "-", color: "text-blue-500" },
    { icon: GitPullRequest, label: "Followers", value: stats?.followers ?? "-", color: "text-purple-500" },
    { icon: GitMerge, label: "Following", value: stats?.following ?? "-", color: "text-green-500" },
    { icon: Star, label: "Public Gists", value: stats?.public_gists ?? "-", color: "text-yellow-500" },
  ];

  // Variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.2, duration: 0.6 } }),
  };

  const recentCommitVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({ opacity: 1, x: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
  };

  return (
    <section id="github" className="py-20 px-4 bg-secondary/20">
      <div className="container mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">GitHub Activity</h2>
          <p className="text-muted-foreground text-lg">
            Real-time contributions from my GitHub profile
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                  </motion.div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Commits + Chart */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Commit Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={commitData}>
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="commits"
                      stroke="hsl(var(--primary))"
                      strokeWidth={3}
                      dot={{ 
                        fill: "hsl(var(--primary))", 
                        r: 6,
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2
                      }}
                      activeDot={{ 
                        r: 8,
                        fill: "hsl(var(--primary))",
                        stroke: "hsl(var(--background))",
                        strokeWidth: 2
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Commits */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Commits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {commits.slice(0, 5).map((commit, index) => (
                  <motion.div
                    key={commit.sha}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={recentCommitVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <GitCommit className="w-5 h-5 text-primary mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{commit.commit.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                          {commit.commit.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(commit.commit.author.date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};















// 'use client';

// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { 
//   GitCommit, 
//   GitPullRequest, 
//   GitMerge, 
//   Star, 
//   Users, 
//   Code2, 
//   Calendar,
//   TrendingUp,
//   Clock,
//   FileText,
//   Repository,
//   GitBranch,
//   Eye
// } from "lucide-react";
// import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

// // ---------------- Types ----------------
// interface GitHubUser {
//   public_repos: number;
//   followers: number;
//   following: number;
//   public_gists: number;
//   created_at: string;
//   updated_at: string;
// }

// interface GitHubCommit {
//   sha: string;
//   commit: {
//     message: string;
//     author: {
//       name: string;
//       date: string;
//       email: string;
//     };
//   };
//   html_url: string;
//   author: {
//     login: string;
//     avatar_url: string;
//   } | null;
// }

// interface GitHubRepo {
//   name: string;
//   description: string;
//   stargazers_count: number;
//   forks_count: number;
//   language: string;
//   updated_at: string;
//   html_url: string;
// }

// interface GitHubEvent {
//   type: string;
//   created_at: string;
//   repo: {
//     name: string;
//   };
//   payload?: {
//     action?: string;
//     size?: number;
//   };
// }

// interface CommitChart {
//   month: string;
//   commits: number;
//   pullRequests: number;
//   issues: number;
// }

// interface LanguageData {
//   name: string;
//   value: number;
//   color: string;
// }

// // Icon components for activity data
// const CommitIcon = GitCommit;
// const PRIcon = GitPullRequest;
// const IssueIcon = GitMerge;
// const ReviewIcon = Eye;

// export const GitHubActivity = () => {
//   const [commits, setCommits] = useState<GitHubCommit[]>([]);
//   const [stats, setStats] = useState<GitHubUser | null>(null);
//   const [repos, setRepos] = useState<GitHubRepo[]>([]);
//   const [events, setEvents] = useState<GitHubEvent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [mounted, setMounted] = useState(false);

//   const username = "Arbazkhanark";

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (!mounted) return;

//     const fetchGitHubData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch user stats
//         const userResponse = await fetch(`https://api.github.com/users/${username}`);
//         const userData: GitHubUser = await userResponse.json();
//         setStats(userData);

//         // Fetch user repositories
//         const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
//         const reposData: GitHubRepo[] = await reposResponse.json();
//         setRepos(reposData);

//         // Fetch recent events
//         const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=10`);
//         const eventsData: GitHubEvent[] = await eventsResponse.json();
//         setEvents(eventsData);

//         // Fetch commits from the most recent repo
//         if (reposData.length > 0) {
//           const commitsResponse = await fetch(`https://api.github.com/repos/${username}/${reposData[0].name}/commits?per_page=5`);
//           const commitsData: GitHubCommit[] = await commitsResponse.json();
//           setCommits(commitsData);
//         }

//       } catch (error) {
//         console.error("Error fetching GitHub data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchGitHubData();
//   }, [mounted]);

//   // Mock data for charts
//   const commitData: CommitChart[] = [
//     { month: "Jan", commits: 32, pullRequests: 4, issues: 2 },
//     { month: "Feb", commits: 45, pullRequests: 6, issues: 3 },
//     { month: "Mar", commits: 28, pullRequests: 3, issues: 1 },
//     { month: "Apr", commits: 67, pullRequests: 8, issues: 5 },
//     { month: "May", commits: 52, pullRequests: 5, issues: 2 },
//     { month: "Jun", commits: 48, pullRequests: 7, issues: 4 },
//   ];

//   const languageData: LanguageData[] = [
//     { name: "JavaScript", value: 35, color: "#f7df1e" },
//     { name: "TypeScript", value: 25, color: "#3178c6" },
//     { name: "Python", value: 20, color: "#3776ab" },
//     { name: "Java", value: 15, color: "#ed8b00" },
//     { name: "Other", value: 5, color: "#6c757d" },
//   ];

//   const activityData = [
//     { name: "Commits", value: 272, icon: CommitIcon },
//     { name: "PRs", value: 33, icon: PRIcon },
//     { name: "Issues", value: 17, icon: IssueIcon },
//     { name: "Reviews", value: 45, icon: ReviewIcon },
//   ];

//   const statCards = [
//     { 
//       icon: Repository, 
//       label: "Public Repos", 
//       value: stats?.public_repos ?? "-", 
//       color: "text-blue-500",
//       description: "Total repositories"
//     },
//     { 
//       icon: Users, 
//       label: "Followers", 
//       value: stats?.followers ?? "-", 
//       color: "text-purple-500",
//       description: "GitHub followers"
//     },
//     { 
//       icon: Users, 
//       label: "Following", 
//       value: stats?.following ?? "-", 
//       color: "text-green-500",
//       description: "Following users"
//     },
//     { 
//       icon: FileText, 
//       label: "Public Gists", 
//       value: stats?.public_gists ?? "-", 
//       color: "text-yellow-500",
//       description: "Code snippets"
//     },
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 20, scale: 0.95 },
//     visible: { 
//       opacity: 1, 
//       y: 0, 
//       scale: 1,
//       transition: { 
//         type: "spring", 
//         stiffness: 100,
//         damping: 15
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, x: -20 },
//     visible: (i: number) => ({ 
//       opacity: 1, 
//       x: 0, 
//       transition: { 
//         delay: i * 0.1, 
//         duration: 0.6,
//         type: "spring",
//         stiffness: 100
//       }
//     })
//   };

//   const chartVariants = {
//     hidden: { opacity: 0, scale: 0.8 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { 
//         duration: 0.8,
//         type: "spring",
//         stiffness: 80
//       }
//     }
//   };

//   const getActivityIcon = (type: string) => {
//     switch (type) {
//       case 'PushEvent': return GitCommit;
//       case 'PullRequestEvent': return GitPullRequest;
//       case 'IssuesEvent': return GitMerge;
//       case 'WatchEvent': return Star;
//       default: return Code2;
//     }
//   };

//   const getActivityColor = (type: string) => {
//     switch (type) {
//       case 'PushEvent': return 'text-green-500';
//       case 'PullRequestEvent': return 'text-purple-500';
//       case 'IssuesEvent': return 'text-red-500';
//       case 'WatchEvent': return 'text-yellow-500';
//       default: return 'text-blue-500';
//     }
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       month: 'short',
//       day: 'numeric',
//       year: 'numeric'
//     });
//   };

//   if (!mounted) {
//     return (
//       <section id="github" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
//         <div className="container mx-auto text-center">
//           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
//           <p className="text-muted-foreground">Loading GitHub data...</p>
//         </div>
//       </section>
//     );
//   }

//   if (loading) {
//     return (
//       <section id="github" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
//         <div className="container mx-auto text-center">
//           <motion.div
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
//             className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
//           />
//           <p className="text-muted-foreground">Loading GitHub data...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section id="github" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50/30">
//       <div className="container mx-auto">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="text-center mb-16"
//         >
//           <motion.div
//             initial={{ scale: 0 }}
//             whileInView={{ scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
//             className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center"
//           >
//             <Code2 className="w-10 h-10 text-white" />
//           </motion.div>
//           <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             GitHub Activity
//           </h2>
//           <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//             Real-time insights into my coding journey, contributions, and open-source activity
//           </p>
//         </motion.div>

//         {/* Main Stats Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true }}
//           className="grid lg:grid-cols-4 gap-6 mb-12"
//         >
//           {statCards.map((stat, index) => {
//             const IconComponent = stat.icon;
//             return (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 whileHover={{ 
//                   y: -5, 
//                   scale: 1.02,
//                   transition: { type: "spring", stiffness: 300 }
//                 }}
//               >
//                 <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm">
//                   <CardContent className="p-6">
//                     <motion.div
//                       animate={{ 
//                         y: [0, -8, 0],
//                         rotate: [0, 5, 0]
//                       }}
//                       transition={{ 
//                         duration: 3, 
//                         repeat: Infinity, 
//                         delay: index * 0.3,
//                         ease: "easeInOut"
//                       }}
//                     >
//                       <IconComponent className={`w-12 h-12 mx-auto mb-3 ${stat.color} drop-shadow-sm`} />
//                     </motion.div>
//                     <motion.p 
//                       className="text-4xl font-bold mb-2 text-gray-900"
//                       initial={{ scale: 0.5 }}
//                       whileInView={{ scale: 1 }}
//                       transition={{ delay: index * 0.1 + 0.5, type: "spring" }}
//                     >
//                       {stat.value}
//                     </motion.p>
//                     <p className="text-lg font-semibold text-gray-700 mb-1">{stat.label}</p>
//                     <p className="text-sm text-muted-foreground">{stat.description}</p>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         {/* Activity Overview */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//           className="mb-12"
//         >
//           <Card className="border-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm">
//             <CardContent className="p-8">
//               <div className="grid md:grid-cols-4 gap-6">
//                 {activityData.map((activity, index) => {
//                   const ActivityIcon = activity.icon;
//                   return (
//                     <motion.div
//                       key={activity.name}
//                       initial={{ opacity: 0, scale: 0.8 }}
//                       whileInView={{ opacity: 1, scale: 1 }}
//                       viewport={{ once: true }}
//                       transition={{ delay: index * 0.1 }}
//                       className="text-center group"
//                     >
//                       <motion.div
//                         whileHover={{ scale: 1.1 }}
//                         className="w-16 h-16 bg-white rounded-2xl shadow-lg mx-auto mb-3 flex items-center justify-center group-hover:shadow-xl transition-all"
//                       >
//                         <ActivityIcon className="w-8 h-8 text-blue-600" />
//                       </motion.div>
//                       <p className="text-2xl font-bold text-gray-900">{activity.value}</p>
//                       <p className="text-sm text-muted-foreground font-medium">{activity.name}</p>
//                     </motion.div>
//                   );
//                 })}
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Charts and Recent Activity Grid */}
//         <div className="grid lg:grid-cols-3 gap-8 mb-12">
//           {/* Commit Trend Chart */}
//           <motion.div
//             variants={chartVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="lg:col-span-2"
//           >
//             <Card className="border-0 bg-white/70 backdrop-blur-sm h-full">
//               <CardHeader className="pb-4">
//                 <CardTitle className="flex items-center gap-2 text-xl">
//                   <TrendingUp className="w-5 h-5 text-blue-600" />
//                   Activity Trends
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <BarChart data={commitData}>
//                     <XAxis 
//                       dataKey="month" 
//                       stroke="hsl(var(--muted-foreground))"
//                       fontSize={12}
//                     />
//                     <YAxis 
//                       stroke="hsl(var(--muted-foreground))"
//                       fontSize={12}
//                     />
//                     <Tooltip 
//                       contentStyle={{ 
//                         backgroundColor: 'hsl(var(--background))',
//                         borderColor: 'hsl(var(--border))',
//                         borderRadius: '8px',
//                         boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
//                       }}
//                     />
//                     <Bar 
//                       dataKey="commits" 
//                       fill="hsl(var(--primary))" 
//                       radius={[4, 4, 0, 0]}
//                       name="Commits"
//                     />
//                     <Bar 
//                       dataKey="pullRequests" 
//                       fill="#8b5cf6" 
//                       radius={[4, 4, 0, 0]}
//                       name="Pull Requests"
//                     />
//                     <Bar 
//                       dataKey="issues" 
//                       fill="#ef4444" 
//                       radius={[4, 4, 0, 0]}
//                       name="Issues"
//                     />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Language Distribution */}
//           <motion.div
//             variants={chartVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//           >
//             <Card className="border-0 bg-white/70 backdrop-blur-sm h-full">
//               <CardHeader className="pb-4">
//                 <CardTitle className="flex items-center gap-2 text-xl">
//                   <Code2 className="w-5 h-5 text-green-600" />
//                   Language Distribution
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <ResponsiveContainer width="100%" height={300}>
//                   <PieChart>
//                     <Pie
//                       data={languageData}
//                       cx="50%"
//                       cy="50%"
//                       innerRadius={60}
//                       outerRadius={100}
//                       paddingAngle={2}
//                       dataKey="value"
//                     >
//                       {languageData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={entry.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 <div className="grid grid-cols-2 gap-2 mt-4">
//                   {languageData.map((lang, index) => (
//                     <div key={lang.name} className="flex items-center gap-2 text-sm">
//                       <div 
//                         className="w-3 h-3 rounded-full"
//                         style={{ backgroundColor: lang.color }}
//                       />
//                       <span className="text-gray-700">{lang.name}</span>
//                       <span className="text-muted-foreground ml-auto">{lang.value}%</span>
//                     </div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         {/* Recent Activity and Repos Grid */}
//         <div className="grid lg:grid-cols-2 gap-8">
//           {/* Recent Activity */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <Card className="border-0 bg-white/70 backdrop-blur-sm h-full">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-xl">
//                   <Clock className="w-5 h-5 text-purple-600" />
//                   Recent Activity
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {events.slice(0, 6).map((event, index) => {
//                     const EventIcon = getActivityIcon(event.type);
//                     return (
//                       <motion.div
//                         key={`${event.type}-${event.created_at}-${index}`}
//                         custom={index}
//                         initial="hidden"
//                         whileInView="visible"
//                         viewport={{ once: true }}
//                         variants={itemVariants}
//                         whileHover={{ x: 5 }}
//                         className="flex items-center gap-4 p-3 rounded-lg hover:bg-blue-50/50 transition-colors group"
//                       >
//                         <div className={`p-2 rounded-lg ${getActivityColor(event.type)} bg-opacity-10 group-hover:scale-110 transition-transform`}>
//                           <EventIcon className="w-4 h-4" />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <p className="font-medium text-sm text-gray-900 capitalize">
//                             {event.type.replace('Event', '')} in {event.repo.name.split('/')[1]}
//                           </p>
//                           <p className="text-xs text-muted-foreground mt-1">
//                             {formatDate(event.created_at)}
//                           </p>
//                         </div>
//                       </motion.div>
//                     );
//                   })}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Top Repositories */}
//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//           >
//             <Card className="border-0 bg-white/70 backdrop-blur-sm h-full">
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2 text-xl">
//                   <Repository className="w-5 h-5 text-orange-600" />
//                   Top Repositories
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {repos.slice(0, 5).map((repo, index) => (
//                     <motion.div
//                       key={repo.name}
//                       custom={index}
//                       initial="hidden"
//                       whileInView="visible"
//                       viewport={{ once: true }}
//                       variants={itemVariants}
//                       whileHover={{ x: 5 }}
//                       className="p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
//                     >
//                       <div className="flex items-start justify-between mb-2">
//                         <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
//                           {repo.name}
//                         </h3>
//                         <div className="flex items-center gap-3 text-sm text-muted-foreground">
//                           <div className="flex items-center gap-1">
//                             <Star className="w-4 h-4" />
//                             <span>{repo.stargazers_count}</span>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <GitBranch className="w-4 h-4" />
//                             <span>{repo.forks_count}</span>
//                           </div>
//                         </div>
//                       </div>
//                       <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
//                         {repo.description || "No description provided"}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         {repo.language && (
//                           <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
//                             {repo.language}
//                           </span>
//                         )}
//                         <span className="text-xs text-muted-foreground">
//                           Updated {formatDate(repo.updated_at)}
//                         </span>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </div>

//         {/* GitHub Profile Link */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ delay: 0.5 }}
//           className="text-center mt-12"
//         >
//           <motion.a
//             href={`https://github.com/${username}`}
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
//           >
//             <Code2 className="w-5 h-5" />
//             View Full GitHub Profile
//             <motion.div
//               animate={{ x: [0, 5, 0] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//             >
//               ↗
//             </motion.div>
//           </motion.a>
//         </motion.div>
//       </div>
//     </section>
//   );
// };