import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { motion } from 'framer-motion';

export default function App() {
  const [goal, setGoal] = useState(3000); // in mg
  const [input, setInput] = useState('');
  const [intake, setIntake] = useState(0);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }
  }, []);

  const handleAddIntake = () => {
    const amount = parseInt(input);
    if (!isNaN(amount) && amount > 0) {
      setIntake(prev => prev + amount);
      setInput('');
    }
  };

  const handleSetGoal = () => {
    const newGoal = parseInt(input);
    if (!isNaN(newGoal) && newGoal > 0) {
      setGoal(newGoal);
      setInput('');
    }
  };

  const percentage = Math.min((intake / goal) * 100, 100);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Salty</h1>

      <div className="w-full max-w-md mb-4 p-4 bg-white rounded shadow">
        <label className="font-semibold">Salt Intake Goal (mg)</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter amount in mg"
          />
          <Button onClick={handleSetGoal}>Set Goal</Button>
        </div>
      </div>

      <div className="w-full max-w-md mb-4 p-4 bg-white rounded shadow">
        <label className="font-semibold">Add Salt Intake (mg)</label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Enter amount in mg"
          />
          <Button onClick={handleAddIntake}>Add</Button>
        </div>
      </div>

      <div className="w-full max-w-md mb-4 text-center p-4 bg-white rounded shadow">
        <div className="mb-4">
          <p className="text-lg font-semibold text-blue-800">Today's Intake: {intake}mg</p>
          <p className="text-sm text-gray-600">Goal: {goal}mg</p>
        </div>
        <Progress value={percentage} className="mb-4" />
        <div className="relative w-24 h-48 mx-auto border-4 border-blue-700 rounded-t-full bg-white overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 w-full bg-blue-500"
            style={{ height: `${percentage}%` }}
            initial={{ height: 0 }}
            animate={{ height: `${percentage}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">Salt Shaker Fill: {Math.round(percentage)}%</p>
      </div>
    </div>
  );
}
