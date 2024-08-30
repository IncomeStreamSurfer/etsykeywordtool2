import axios from 'axios';

const dataForSeoClient = axios.create({
  baseURL: 'https://api.dataforseo.com/v3',
  auth: {
    username: process.env.DATAFORSEO_LOGIN!,
    password: process.env.DATAFORSEO_PASSWORD!
  }
});

export async function searchDataForSEO(query: string) {
  try {
    const response = await dataForSeoClient.post('/serp/google/organic/live/advanced', [{
      keyword: query,
      language_code: "en",
      location_code: 2826, // USA
      device: "desktop",
      os: "windows"
    }]);

    const items = response.data?.tasks?.[0]?.result?.[0]?.items || [];
    return items
      .filter((item: any) => item.type === 'organic')
      .map((item: any) => ({
        title: item.title,
        url: item.url
      }));
  } catch (error) {
    console.error('Error in searchDataForSEO:', error);
    throw error;
  }
}

export async function getKeywordData(keyword: string) {
  try {
    const response = await dataForSeoClient.post('/keywords_data/google_ads/search_volume/live', [{
      keywords: [keyword],
      language_code: "en",
      location_code: 2826 // USA
    }]);

    const result = response.data?.tasks?.[0]?.result?.[0];
    if (!result) {
      console.warn(`No data found for keyword: ${keyword}`);
      return {
        keyword,
        search_volume: 0,
        monthly_searches: []
      };
    }

    return {
      keyword: result.keyword,
      search_volume: result.search_volume || 0,
      monthly_searches: result.monthly_searches || []
    };
  } catch (error) {
    console.error('Error in getKeywordData:', error);
    throw error;
  }
}