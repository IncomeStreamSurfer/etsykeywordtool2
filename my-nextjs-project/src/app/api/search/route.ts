import { NextResponse } from 'next/server';
import { searchDataForSEO, getKeywordData } from '../../../lib/dataForSeo';
import { extractKeywordWithClaude } from '../../../lib/claude';
import { calculateTotalSearchVolume } from '../../../lib/utils';

export async function POST(req: Request) {
  try {
    const { category } = await req.json();
    
    // Step 1: DataForSEO SERP API search
    const query = `site:etsy.com/listing intext:"Item reviews 500..10000" intitle:${category}`;
    const serpResults = await searchDataForSEO(query);
    
    // Step 2 & 3: Extract titles and process with Claude
    const processedResults = await Promise.all(serpResults.map(async (result: { title: string; url: string; }) => {
      try {
        const extractedKeyword = await extractKeywordWithClaude(result.title);
        return { ...result, extractedKeyword };
      } catch (error) {
        console.error('Error processing with Claude:', error);
        return { ...result, extractedKeyword: result.title }; // Fallback to original title
      }
    }));
    
    // Step 4: Get keyword data and search volume
    const keywordResults = await Promise.all(processedResults.map(async (result) => {
      try {
        const keywordData = await getKeywordData(result.extractedKeyword);
        const totalSearchVolume = calculateTotalSearchVolume(keywordData.monthly_searches);
        return {
          title: result.title,
          url: result.url,
          keyword: result.extractedKeyword,
          searchVolume: totalSearchVolume
        };
      } catch (error) {
        console.error('Error getting keyword data:', error);
        return {
          title: result.title,
          url: result.url,
          keyword: result.extractedKeyword,
          searchVolume: 0
        };
      }
    }));

    return NextResponse.json({ results: keywordResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'An error occurred during the search process' }, { status: 500 });
  }
}