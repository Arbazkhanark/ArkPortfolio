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
    { icon: Star, label: "Stars", value: stats?.public_gists ?? "-", color: "text-yellow-500" },
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
    <section id="github" className="py-20 px-4 bg-gray-50">
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
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="commits"
                      stroke="#4f46e5"
                      strokeWidth={3}
                      dot={{ fill: "#4f46e5", r: 6 }}
                      activeDot={{ r: 8 }}
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
