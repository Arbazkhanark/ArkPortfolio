'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GitCommit, GitPullRequest, GitMerge, Star, Calendar } from "lucide-react";
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
    { icon: GitPullRequest, label: "Followers", value: stats?.followers ?? "-", color: "text-green-500" },
    { icon: GitMerge, label: "Following", value: stats?.following ?? "-", color: "text-yellow-500" },
    { icon: Star, label: "Public Gists", value: stats?.public_gists ?? "-", color: "text-purple-500" },
  ];

  return (
    <section id="github" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">GitHub Activity</h2>
          <p className="text-sm text-muted-foreground">
            Real-time contributions from my GitHub profile
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-800 to-gray-600 flex items-center justify-center">
              <GitCommit className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Arbaz Khan</p>
              <p className="text-xs text-muted-foreground">@{username}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {statCards.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-md transition-all duration-200 border border-green-500/10">
                <CardContent className="p-3">
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/5 mb-2 ${stat.color}`}
                  >
                    <stat.icon className="w-4 h-4" />
                  </motion.div>
                  <p className="text-xl font-bold mb-0.5">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Commits + Chart */}
        <div className="grid lg:grid-cols-2 gap-4">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-1.5 text-base">
                  <Calendar className="w-3.5 h-3.5 text-green-600" />
                  Commit Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={commitData}>
                    <XAxis 
                      dataKey="month" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))',
                        fontSize: '12px'
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="commits"
                      stroke="#16a34a"
                      strokeWidth={2}
                      dot={{ 
                        fill: "#16a34a", 
                        r: 4,
                        stroke: "hsl(var(--background))",
                        strokeWidth: 1
                      }}
                      activeDot={{ 
                        r: 5,
                        fill: "#16a34a",
                        stroke: "hsl(var(--background))",
                        strokeWidth: 1
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Commits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-1.5 text-base">
                  <GitCommit className="w-3.5 h-3.5 text-green-600" />
                  Recent Commits
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  {commits.slice(0, 4).map((commit, index) => (
                    <motion.div
                      key={commit.sha}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-2 p-2 rounded-md hover:bg-muted/50 transition-all group"
                    >
                      <div className="p-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                        <GitCommit className="w-3 h-3" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs truncate group-hover:text-green-600 transition-colors">
                          {commit.commit.message}
                        </p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs px-1.5 py-0.5 bg-green-500/10 text-green-600 rounded-full">
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
          </motion.div>
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-6"
        >
          <Card className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20">
            <CardContent className="p-4">
              <h3 className="text-base font-bold mb-1">Open Source Contributions</h3>
              <p className="text-muted-foreground text-xs mb-2">
                Building and contributing to open source projects
              </p>
              <div className="flex justify-center gap-4 text-xs">
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-500">{stats?.public_repos || 0}</div>
                  <div className="text-muted-foreground">Repos</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">{stats?.followers || 0}</div>
                  <div className="text-muted-foreground">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-500">{stats?.public_gists || 0}</div>
                  <div className="text-muted-foreground">Gists</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};