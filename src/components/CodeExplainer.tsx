
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Terminal, Loader2, Sparkles } from "lucide-react";
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
      const response = await fetch('YOUR_BACKEND_URL', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ problem: problemDescription }),
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 animate-fade-in hover:scale-105 transition-transform duration-300">
            Program Generator & Explainer
          </h1>
          <p className="text-gray-400 text-lg animate-fade-in opacity-0 animation-delay-200">
            Describe your programming problem, and I'll generate the solution with a detailed explanation
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
                <Code className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Problem Description</h2>
            </div>
            <Textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Enter your programming problem (e.g., 'Write a program for Fibonacci series')"
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
                  <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
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
                <Terminal className="h-5 w-5 text-green-400" />
              </div>
              <h2 className="text-xl font-semibold text-white">Solution & Explanation</h2>
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
                    <p>Your solution and explanation will appear here...</p>
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
