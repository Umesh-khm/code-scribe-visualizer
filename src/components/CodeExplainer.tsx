
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Code, Terminal } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CodeExplainer = () => {
  const [problemDescription, setProblemDescription] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!problemDescription.trim()) {
      toast({
        title: "Error",
        description: "Please enter a programming problem",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      // Replace with your actual backend URL
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get solution",
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
        <h1 className="text-4xl font-bold text-white text-center mb-8">Program Generator & Explainer</h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Code className="h-5 w-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Problem Description</h2>
            </div>
            <Textarea
              value={problemDescription}
              onChange={(e) => setProblemDescription(e.target.value)}
              placeholder="Enter your programming problem (e.g., 'Write a program for Fibonacci series')"
              className="min-h-[300px] bg-gray-900/50 border-gray-700 text-white font-mono"
            />
            <Button 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Generating Solution..." : "Generate Solution"}
            </Button>
          </Card>

          {/* Output Section */}
          <Card className="p-4 bg-gray-800/50 border-gray-700">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="h-5 w-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">Solution & Explanation</h2>
            </div>
            <ScrollArea className="h-[300px] rounded-md border border-gray-700 bg-gray-900/50 p-4">
              <div className="text-white whitespace-pre-wrap">
                {explanation || "Your solution and explanation will appear here..."}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CodeExplainer;
