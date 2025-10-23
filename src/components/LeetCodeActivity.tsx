'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Trophy, Target, Clock, Zap, TrendingUp, CheckCircle, XCircle, Code, Star, Award, Calendar } from "lucide-react";
import { useInView } from 'framer-motion';
import { useRef } from 'react';

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

// Colors for charts
const COLORS = ["#4ade80", "#facc15", "#f87171"];
const DIFFICULTY_COLORS = {
  Easy: "#4ade80",
  Medium: "#facc15", 
  Hard: "#f87171"
};

// Progress Bar Component
const ProgressBar = ({ solved, total, color, difficulty }: { solved: number; total: number; color: string; difficulty: string }) => {
  const percentage = (solved / total) * 100;
  
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div 
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium text-xs">{difficulty}</span>
        </div>
        <span className="text-xs text-muted-foreground">
          {solved} / {total}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden relative">
        <div className="absolute inset-0 bg-muted rounded-full" />
        
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="h-full rounded-full relative"
          style={{ 
            backgroundColor: color,
            width: `${percentage}%`,
            transformOrigin: 'left'
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
      </div>
      
      <div className="text-right">
        <span className="text-xs text-muted-foreground">
          {Math.round(percentage)}% completed
        </span>
      </div>
    </div>
  );
};

export const LeetCodeActivity = () => {
  const [data, setData] = useState<LeetCodeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const username = "arbazkhanark23";

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching LeetCode data:", err);
        setIsLoading(false);
      });
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <section id="leetcode" className="py-12 px-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"
          />
          <p className="text-lg text-muted-foreground">Loading LeetCode stats...</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="leetcode" className="py-12 px-4 bg-blue-50 dark:bg-blue-950/20">
        <div className="container mx-auto text-center">
          <p className="text-lg text-muted-foreground">Failed to load LeetCode data. Please try again later.</p>
        </div>
      </section>
    );
  }

  const chartData = [
    { name: "Easy", value: data.easySolved, total: data.totalEasy, color: DIFFICULTY_COLORS.Easy },
    { name: "Medium", value: data.mediumSolved, total: data.totalMedium, color: DIFFICULTY_COLORS.Medium },
    { name: "Hard", value: data.hardSolved, total: data.totalHard, color: DIFFICULTY_COLORS.Hard },
  ];

  const statsCards = [
    { 
      title: "Problems Solved", 
      value: data.totalSolved, 
      icon: Trophy,
      color: "text-yellow-500",
      description: "Total questions solved"
    },
    { 
      title: "Global Rank", 
      value: `#${data.ranking.toLocaleString()}`, 
      icon: Target,
      color: "text-blue-500",
      description: "Among all LeetCode users"
    },
    { 
      title: "Acceptance Rate", 
      value: `${Math.round((data.totalSolved / (data.totalSubmissions[0]?.submissions || 1)) * 100)}%`, 
      icon: TrendingUp,
      color: "text-green-500",
      description: "Success ratio"
    },
    { 
      title: "Community Points", 
      value: data.contributionPoint, 
      icon: Star,
      color: "text-purple-500",
      description: "Contribution score"
    },
  ];

  const additionalStats = [
    {
      title: "Easy Solved",
      value: data.easySolved,
      icon: CheckCircle,
      color: "text-green-500",
      description: "Easy problems"
    },
    {
      title: "Medium Solved",
      value: data.mediumSolved,
      icon: TrendingUp,
      color: "text-yellow-500",
      description: "Medium problems"
    },
    {
      title: "Hard Solved",
      value: data.hardSolved,
      icon: Award,
      color: "text-red-500",
      description: "Hard problems"
    },
    {
      title: "Total Problems",
      value: data.totalEasy + data.totalMedium + data.totalHard,
      icon: Code,
      color: "text-blue-500",
      description: "Available problems"
    }
  ];

  // Mock data for weekly activity
  const weeklyActivity = [
    { day: 'Mon', problems: 4 },
    { day: 'Tue', problems: 6 },
    { day: 'Wed', problems: 3 },
    { day: 'Thu', problems: 7 },
    { day: 'Fri', problems: 5 },
    { day: 'Sat', problems: 8 },
    { day: 'Sun', problems: 2 },
  ];

  return (
    <section id="leetcode" className="py-8 px-4 bg-blue-50 dark:bg-blue-950/20 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-green-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto relative z-10">
        {/* Header - Minimal gap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-4"
        >
          <h2 className="text-2xl font-bold mb-2">LeetCode Activity</h2>
          <p className="text-muted-foreground text-sm mb-3">
            Real-time problem solving stats from my LeetCode profile
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
              <Code className="w-4 h-4 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-sm">Arbaz Khan</p>
              <p className="text-xs text-muted-foreground">@{username}</p>
            </div>
          </div>
        </motion.div>

        {/* Key Statistics - Minimal gap */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              whileHover={{ 
                y: -2,
                scale: 1.01,
              }}
            >
              <Card className="text-center hover:shadow-md transition-all duration-200 border border-green-500/10">
                <CardContent className="p-3">
                  <motion.div
                    className={`inline-flex p-1.5 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/5 mb-2 ${card.color}`}
                  >
                    <card.icon className="w-4 h-4" />
                  </motion.div>
                  <motion.p 
                    className="text-xl font-bold mb-0.5"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05, type: "spring" }}
                  >
                    {card.value}
                  </motion.p>
                  <p className="text-xs text-muted-foreground font-medium">{card.title}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Stats - Minimal gap */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 mb-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {additionalStats.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="hover:shadow-sm transition-all duration-200">
                <CardContent className="p-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-md ${card.color} bg-opacity-10`}>
                      <card.icon className="w-3 h-3" />
                    </div>
                    <div className="text-left">
                      <p className="text-lg font-bold">{card.value}</p>
                      <p className="text-xs text-muted-foreground">{card.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress by Difficulty - Minimal gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-base">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                Progress by Difficulty Level
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-3">
                {chartData.map((difficulty, index) => (
                  <motion.div
                    key={difficulty.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <ProgressBar 
                      solved={difficulty.value}
                      total={difficulty.total}
                      color={difficulty.color}
                      difficulty={difficulty.name}
                    />
                  </motion.div>
                ))}
                
                {/* Overall Progress */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="pt-3 border-t border-border"
                >
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="font-semibold text-sm">Overall Progress</span>
                    <span className="font-bold text-green-600 text-sm">
                      {data.totalSolved} / {data.totalEasy + data.totalMedium + data.totalHard} 
                      <span className="text-xs text-muted-foreground ml-1">
                        ({Math.round((data.totalSolved / (data.totalEasy + data.totalMedium + data.totalHard)) * 100)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.6 }}
                      className="h-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"
                      style={{ 
                        width: `${(data.totalSolved / (data.totalEasy + data.totalMedium + data.totalHard)) * 100}%`,
                        transformOrigin: 'left'
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Section - Minimal gap */}
        <div className="grid lg:grid-cols-2 gap-4 mb-4">
          {/* Problems Solved by Difficulty - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-1.5 text-base">
                  <PieChart className="w-3.5 h-3.5 text-green-600" />
                  Problems Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={40}
                      label={({ name, value }) => `${name}: ${value}`}
                      labelLine={false}
                    >
                      {chartData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="hsl(var(--background))"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Weekly Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-1.5 text-base">
                  <Calendar className="w-3.5 h-3.5 text-green-600" />
                  Weekly Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={weeklyActivity}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="problems" 
                      fill="#16a34a"
                      radius={[2, 2, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity - Minimal gap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-1.5 text-base">
                <Clock className="w-3.5 h-3.5 text-green-600" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="space-y-1.5">
                {data.recentSubmissions.slice(0, 4).map((sub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted/50 transition-all group"
                  >
                    <div className={`p-1 rounded-full ${
                      sub.statusDisplay === "Accepted" 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                        : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                    }`}>
                      {sub.statusDisplay === "Accepted" ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://leetcode.com/problems/${sub.titleSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-xs truncate hover:text-green-600 transition-colors"
                      >
                        {sub.title}
                      </a>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
                        <span className="px-1 py-0.5 bg-green-500/10 text-green-600 rounded text-xs">
                          {sub.lang}
                        </span>
                        <span>{new Date(Number(sub.timestamp) * 1000).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivation Section - Minimal gap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-green-500/5 to-blue-500/5 border-green-500/20">
            <CardContent className="p-3">
              <h3 className="text-base font-bold mb-1">Continuous Growth</h3>
              <p className="text-muted-foreground text-xs mb-2">
                Every problem solved is a step forward in mastering DSA.
              </p>
              <div className="flex justify-center gap-3 text-xs">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-500">{data.easySolved}</div>
                  <div className="text-muted-foreground text-xs">Easy</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-yellow-500">{data.mediumSolved}</div>
                  <div className="text-muted-foreground text-xs">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-red-500">{data.hardSolved}</div>
                  <div className="text-muted-foreground text-xs">Hard</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};