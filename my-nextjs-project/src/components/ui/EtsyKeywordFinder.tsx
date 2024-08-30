'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const intitleOptions = [
  "sticker", "t-shirt", "mug", "poster", "phone case",
  "tote bag", "pillow", "wall art", "jewelry", "notebook",
  "keychain", "face mask", "tumbler", "canvas print", "enamel pin",
  "laptop sleeve", "throw blanket", "greeting card", "wall clock", "mouse pad"
];

interface Result {
  title: string;
  url: string;
  keyword: string;
  searchVolume: number;
}

export default function EtsyKeywordFinder() {
  const [intitle, setIntitle] = useState<string>('sticker');
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedKeyword, setSelectedKeyword] = useState<Result | null>(null);

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: intitle })
      });
      const data = await response.json();
      const sortedResults = data.results.sort((a: Result, b: Result) => b.searchVolume - a.searchVolume);
      setResults(sortedResults);
      setSelectedKeyword(sortedResults[0] || null);
    } catch (error) {
      console.error('Search error:', error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsLoading(false);
    }
  };

  const topKeywords = results.slice(0, 5).map(result => ({
    keyword: result.keyword,
    searchVolume: result.searchVolume
  }));

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Etsy Keyword Finder</h1>
        
        <Card className="bg-gray-800 border-gray-700 mb-8">
          <CardHeader>
            <CardTitle>Keyword Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-6">
              <Select value={intitle} onValueChange={setIntitle}>
                <SelectTrigger className="w-full md:w-[200px] bg-gray-700 border-gray-600">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  {intitleOptions.map((option) => (
                    <SelectItem key={option} value={option} className="hover:bg-gray-600">
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                onClick={handleSearch} 
                disabled={isLoading}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {results.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Top Keywords by Search Volume</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={topKeywords}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="keyword" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                      <Bar dataKey="searchVolume" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Selected Keyword Details</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedKeyword && (
                    <div>
                      <p className="text-xl font-bold mb-2">{selectedKeyword.keyword}</p>
                      <p>Search Volume: {selectedKeyword.searchVolume.toLocaleString()}</p>
                      <p className="mt-4 text-sm">
                        <a href={selectedKeyword.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                          View on Etsy
                        </a>
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Keyword Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-3 px-4">Keyword</th>
                        <th className="text-left py-3 px-4">Search Volume</th>
                        <th className="text-left py-3 px-4">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-gray-700 hover:bg-gray-750 cursor-pointer"
                          onClick={() => setSelectedKeyword(result)}
                        >
                          <td className="py-3 px-4">{result.keyword}</td>
                          <td className="py-3 px-4">{result.searchVolume.toLocaleString()}</td>
                          <td className="py-3 px-4">
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300"
                              onClick={(e) => e.stopPropagation()}
                            >
                              View on Etsy
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}