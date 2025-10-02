'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// ---------------- Types ----------------
interface SubmissionStat {
  difficulty: string;
  count: number;
  submissions: number;
}

interface RecentSubmission {
  title: string;
  titleSlug: string;
  timestamp: number;
  statusDisplay: string;
  lang: string;
}

interface LeetCodeData {
  totalSolved: number;
  totalSubmissions: SubmissionStat[];
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number;
  contributionPoint: number;
  reputation: number;
  recentSubmissions: RecentSubmission[];
}

// Colors for Pie chart
const COLORS = ["#4ade80", "#facc15", "#f87171"];

export const LeetCodeActivity = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);

  const username = "arbazkhanark23";

  useEffect(() => {
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => console.error("Error fetching LeetCode data:", err));
  }, []);

  if (!data) return <p className="text-center py-20">Loading LeetCode stats...</p>;

  const chartData = [
    { name: "Easy", value: data.easySolved },
    { name: "Medium", value: data.mediumSolved },
    { name: "Hard", value: data.hardSolved },
  ];

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const recentItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <section id="leetcode" className="py-20 px-4 bg-gray-50">
      <div className="container mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4">LeetCode Activity</h2>
          <p className="text-muted-foreground text-lg">
            Real-time problem solving stats from my LeetCode profile
          </p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { title: "Total Solved", value: data.totalSolved },
            { title: "Total Submissions", value: data.totalSubmissions[0]?.submissions || 0 },
            { title: "Ranking", value: data.ranking },
            { title: "Contribution Points", value: data.contributionPoint },
          ].map((card, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{card.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts and Recent Submissions */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Pie Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Problems Solved by Difficulty</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Submissions */}
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.recentSubmissions.slice(0, 10).map((sub, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={recentItemVariants}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://leetcode.com/problems/${sub.titleSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-sm truncate text-primary hover:underline"
                      >
                        {sub.title}
                      </a>
                      <div className="flex items-center gap-2 mt-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            sub.statusDisplay === "Accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {sub.statusDisplay}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(Number(sub.timestamp) * 1000).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-muted-foreground">{sub.lang}</span>
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
