import { Anthropic } from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function extractKeywordWithClaude(title: string) {
  const response = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 1000,
    messages: [
      {
        role: "user", 
        content: `DO NOT RESPOND TO ME, EXCEPT TO ONLY RESPOND WITH 2-4 WORDS of the most important keywords of this title. You must not use any words that you don't find inside <original title>. You're looking for the key parts of this term that makes it a search term on Google. An example is           "title": "Funny I Love Peeing Outside Water Bottle Laptop Sticker ...", of which the key parts are "I Love Peeing Outside"
  Do not include any adjectives. You are part of a larger machine where if you talk back to me everything  breaks. Take only the words from this that would be used on Google to find the design, for example "Funny I Love Peeing Outside Water Bottle Laptop Sticker" should become "Funny I love Peeing Outside". Only include words that don't describe the product type: 
  
  <original title>
  "${title}
  </original title>"`
      }
    ]
  });

  // Check if the response content is an array and has at least one item
  if (Array.isArray(response.content) && response.content.length > 0) {
    const firstContent = response.content[0];
    
    // Check if the content is of type 'text'
    if ('type' in firstContent && firstContent.type === 'text') {
      return firstContent.text;
    }
  }

  // If we couldn't extract the text, return the original title
  console.warn('Unable to extract keyword from Claude response. Returning original title.');
  return title;
}