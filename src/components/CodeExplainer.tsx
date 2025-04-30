
import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Terminal, Loader2, Sparkles, Zap, Brain, Puzzle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const CodeExplainer = () => {
  const [problemDescription, setProblemDescription] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!problemDescription.trim()) {
      toast({
        title: "Missing Input",
        description: "Please enter a programming problem to solve",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://code-generator-x3de.onrender.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: problemDescription }),
      });

      if (!response.ok) throw new Error('Failed to get solution');
      
      const data = await response.json();
      setExplanation(data.explanation || 'No solution provided');
      toast({
        title: "Success!",
        description: "Your solution has been generated",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get solution. Please try again.",
        variant: "destructive",
      });
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8 relative overflow-hidden">
      {/* Background Symbolic Logos */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <Zap className="absolute top-10 left-10 text-blue-500 size-24 animate-pulse" />
        <Brain className="absolute top-1/3 right-20 text-purple-500 size-32 animate-bounce" />
        <Puzzle className="absolute bottom-10 left-1/4 text-green-500 size-40 animate-spin-slow" />
      </div>

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        <div className="text-center space-y-2 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Code className="text-blue-400 size-12 animate-pulse" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in hover:scale-105 transition-transform duration-300">
              Code Genius
            </h1>
            <Code className="text-purple-400 size-12 animate-pulse" />
          </div>
          <p className="text-gray-400 text-lg animate-fade-in opacity-0 animation-delay-200">
            Describe your programming challenge, and watch magic unfold!
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 animate-fade-in opacity-0 animation-delay-300">
          {/* Input Section */}
          <Card className={cn(
            "p-6 bg-gray-800/50 border-gray-700 transition-all duration-300",
            "hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1",
            "transform perspective-1000 hover:rotate-1"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20 animate-pulse">
                <Zap className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Problem Description</h2>
            </div>
            <Textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Enter your programming challenge (e.g., 'Implement a recursive Fibonacci sequence generator in Python')"
              className="min-h-[300px] bg-gray-900/50 border-gray-700 text-white font-mono text-base resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg py-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="animate-pulse">Generating Solution...</span>
                </>
              ) : (
                <>
                  <Brain className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Generate Solution
                </>
              )}
            </Button>
          </Card>

          {/* Output Section */}
          <Card className={cn(
            "p-6 bg-gray-800/50 border-gray-700 transition-all duration-300",
            "hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-1",
            "transform perspective-1000 hover:rotate-1"
          )}>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-green-500/20 animate-pulse">
                <Puzzle className="h-5 w-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Solution Unveiled</h2>
            </div>
            <ScrollArea className="h-[300px] rounded-lg border border-gray-700 bg-gray-900/50 p-6 transition-all duration-300">
              <div className="text-white whitespace-pre-wrap font-mono">
                {explanation ? (
                  <div className="animate-fade-in">
                    {explanation}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center space-y-4 py-12 animate-pulse">
                    <Terminal className="h-12 w-12 mx-auto opacity-50 animate-bounce" />
                    <p>Your intelligent solution awaits...</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeExplainer;
