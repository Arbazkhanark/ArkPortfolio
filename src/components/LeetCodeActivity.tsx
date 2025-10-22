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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div 
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <span className="font-medium text-sm">{difficulty}</span>
        </div>
        <span className="text-sm text-muted-foreground">
          {solved} / {total}
        </span>
      </div>
      
      <div className="w-full bg-muted rounded-full h-3 overflow-hidden relative">
        {/* Background */}
        <div className="absolute inset-0 bg-muted rounded-full" />
        
        {/* Animated Progress */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          className="h-full rounded-full relative"
          style={{ 
            backgroundColor: color,
            width: `${percentage}%`,
            transformOrigin: 'left'
          }}
        >
          {/* Shimmer Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />
        </motion.div>
        
        {/* Percentage Text on Bar for larger screens */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold text-white mix-blend-difference hidden sm:block"
        >
          {Math.round(percentage)}%
        </motion.span>
      </div>
      
      {/* Percentage for mobile */}
      <div className="sm:hidden text-right">
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
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        staggerChildren: 0.2
      }
    }
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      scale: 0.9
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  if (isLoading) {
    return (
      <section id="leetcode" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-xl text-muted-foreground">Loading LeetCode stats...</p>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section id="leetcode" className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto text-center">
          <p className="text-xl text-muted-foreground">Failed to load LeetCode data. Please try again later.</p>
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
    <section id="leetcode" className="py-6 px-4 bg-secondary/20 relative overflow-hidden" ref={ref}>

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

      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-2xl"
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
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 bg-green-500/10 rounded-full blur-2xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <div className="container mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 
            // variants={titleVariants}
            className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent"
          >
            Coding Journey Overview
          </motion.h2>
          <motion.p 
            // variants={titleVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Tracking my progress in algorithmic problem solving and competitive programming on LeetCode
          </motion.p>
        </motion.div>

        {/* Key Statistics */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {statsCards.map((card, index) => (
            <motion.div
              key={card.title}
              custom={index}
              // variants={cardVariants}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { duration: 0.3 }
              }}
            >
              <Card className="text-center hover:shadow-lg transition-all duration-300 group border-2 border-transparent hover:border-primary/20">
                <CardContent className="p-6">
                  <motion.div
                    className={`inline-flex p-3 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 mb-4 ${card.color}`}
                  >
                    <card.icon className="w-6 h-6" />
                  </motion.div>
                  <motion.p 
                    className="text-3xl font-bold mb-1"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                  >
                    {card.value}
                  </motion.p>
                  <p className="text-sm text-muted-foreground font-medium">{card.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress by Difficulty with Horizontal Bars */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Progress by Difficulty Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {chartData.map((difficulty, index) => (
                  <motion.div
                    key={difficulty.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
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
                  transition={{ delay: 0.8 }}
                  className="pt-6 border-t border-border"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-lg">Overall Progress</span>
                    <span className="text-lg font-bold text-primary">
                      {data.totalSolved} / {data.totalEasy + data.totalMedium + data.totalHard} 
                      <span className="text-sm text-muted-foreground ml-2">
                        ({Math.round((data.totalSolved / (data.totalEasy + data.totalMedium + data.totalHard)) * 100)}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, ease: "easeOut", delay: 1 }}
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

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Problems Solved by Difficulty - Pie Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-primary" />
                  Problems Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      innerRadius={60}
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Weekly Problem Solving Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyActivity}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="problems" 
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
                <div className="text-center mt-4">
                  <p className="text-sm text-muted-foreground">
                    Consistent practice is key to improvement
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentSubmissions.slice(0, 6).map((sub, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-lg hover:bg-muted/50 transition-all group"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`p-2 rounded-full ${
                        sub.statusDisplay === "Accepted" 
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {sub.statusDisplay === "Accepted" ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </motion.div>
                    
                    <div className="flex-1 min-w-0">
                      <a
                        href={`https://leetcode.com/problems/${sub.titleSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium text-sm truncate hover:text-primary transition-colors group-hover:underline"
                      >
                        {sub.title}
                      </a>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded-full">
                          {sub.lang}
                        </span>
                        <span>
                          {new Date(Number(sub.timestamp) * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="bg-gradient-to-r from-primary/5 to-purple-500/5 border-primary/20">
            <CardContent className="p-8">
              <motion.div
                animate={{ 
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl mb-4"
              >
                🚀
              </motion.div>
              <h3 className="text-xl font-bold mb-2">Continuous Growth Mindset</h3>
              <p className="text-muted-foreground mb-4">
                Every problem solved is a step forward in the journey of mastering algorithms and data structures.
              </p>
              <div className="flex justify-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">{data.easySolved}</div>
                  <div className="text-muted-foreground">Easy Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">{data.mediumSolved}</div>
                  <div className="text-muted-foreground">Medium Solved</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">{data.hardSolved}</div>
                  <div className="text-muted-foreground">Hard Solved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};