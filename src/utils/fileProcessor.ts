import { DocumentMetadata, Entity, Topic, DocumentStructure, TechnicalMetadata } from '../types';

export class FileProcessor {
  private static instance: FileProcessor;
  
  static getInstance(): FileProcessor {
    if (!FileProcessor.instance) {
      FileProcessor.instance = new FileProcessor();
    }
    return FileProcessor.instance;
  }

  async processFile(file: File): Promise<DocumentMetadata> {
    const id = this.generateId();
    const extractedText = await this.extractText(file);
    
    return {
      id,
      filename: file.name,
      fileType: file.type || this.getFileTypeFromExtension(file.name),
      fileSize: file.size,
      uploadDate: new Date(),
      processingStatus: 'completed',
      extractedText,
      wordCount: this.countWords(extractedText),
      characterCount: extractedText.length,
      language: this.detectLanguage(extractedText),
      title: this.extractTitle(extractedText, file.name),
      author: this.extractAuthor(extractedText),
      subject: this.extractSubject(extractedText),
      keywords: this.extractKeywords(extractedText),
      summary: this.generateSummary(extractedText),
      entities: this.extractEntities(extractedText),
      topics: this.extractTopics(extractedText),
      sentiment: this.analyzeSentiment(extractedText),
      readabilityScore: this.calculateReadabilityScore(extractedText),
      structure: this.analyzeStructure(extractedText),
      technicalMetadata: this.extractTechnicalMetadata(file)
    };
  }

  private async extractText(file: File): Promise<string> {
    const fileType = file.type || this.getFileTypeFromExtension(file.name);
    
    switch (fileType) {
      case 'text/plain':
        return await this.extractTextFromTxt(file);
      case 'application/pdf':
        return await this.extractTextFromPdf(file);
      case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        return await this.extractTextFromDocx(file);
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return await this.extractTextFromImage(file);
      default:
        return await this.extractTextFromTxt(file);
    }
  }

  private async extractTextFromTxt(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string || '');
      reader.onerror = reject;
      reader.readAsText(file);
    });
  }

  private async extractTextFromPdf(file: File): Promise<string> {
    // Enhanced PDF simulation with more realistic content
    const sampleTexts = [
      `Executive Summary

This comprehensive report analyzes the current market trends and provides strategic recommendations for business growth. Our research indicates significant opportunities in emerging markets, particularly in the technology and healthcare sectors.

Key Findings:
• Market growth rate has increased by 15% year-over-year
• Customer satisfaction scores have improved across all segments
• Digital transformation initiatives show promising ROI
• Competitive landscape remains challenging but manageable

The analysis reveals that companies investing in digital infrastructure and customer experience are outperforming their peers. We recommend immediate action on the following strategic initiatives to capitalize on these market opportunities.

Methodology:
Our research methodology included comprehensive market analysis, customer surveys, competitor benchmarking, and financial modeling. Data was collected from multiple sources including industry reports, customer interviews, and internal performance metrics.

Recommendations:
1. Accelerate digital transformation initiatives
2. Invest in customer experience improvements
3. Expand into emerging markets
4. Strengthen competitive positioning through innovation

The implementation of these recommendations is expected to drive significant business value and position the organization for sustained growth in the evolving market landscape.`,

      `Research Paper: Artificial Intelligence in Healthcare

Abstract:
This study examines the implementation of artificial intelligence technologies in modern healthcare systems. Our research demonstrates significant improvements in diagnostic accuracy, treatment outcomes, and operational efficiency when AI systems are properly integrated into clinical workflows.

Introduction:
The healthcare industry is experiencing a technological revolution driven by artificial intelligence and machine learning. These technologies offer unprecedented opportunities to improve patient care, reduce costs, and enhance clinical decision-making processes.

Literature Review:
Previous studies have shown that AI applications in healthcare can reduce diagnostic errors by up to 30% and improve treatment efficiency by 25%. However, implementation challenges remain significant, including data privacy concerns, regulatory compliance, and integration with existing systems.

Methodology:
We conducted a comprehensive analysis of 50 healthcare institutions that have implemented AI technologies. Our study included quantitative analysis of performance metrics and qualitative interviews with healthcare professionals.

Results:
The results demonstrate clear benefits of AI implementation:
- Diagnostic accuracy improved by 28%
- Patient wait times reduced by 35%
- Administrative costs decreased by 20%
- Healthcare professional satisfaction increased significantly

Discussion:
These findings suggest that AI technologies can significantly enhance healthcare delivery when implemented thoughtfully. However, success requires careful attention to change management, staff training, and system integration.

Conclusion:
AI represents a transformative opportunity for healthcare organizations. The evidence supports strategic investment in AI technologies, coupled with comprehensive implementation planning and stakeholder engagement.`
    ];
    
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  }

  private async extractTextFromDocx(file: File): Promise<string> {
    const sampleTexts = [
      `Project Proposal: Digital Marketing Strategy

Executive Summary:
This proposal outlines a comprehensive digital marketing strategy designed to increase brand awareness, drive customer engagement, and boost sales revenue. The strategy leverages modern digital channels and data-driven approaches to maximize marketing ROI.

Project Objectives:
• Increase website traffic by 40% within 6 months
• Improve conversion rates by 25%
• Enhance social media engagement by 60%
• Generate 500 qualified leads monthly
• Achieve 15% increase in sales revenue

Target Audience Analysis:
Our primary target audience consists of professionals aged 25-45 who are active on digital platforms and value quality products and services. Secondary audiences include decision-makers in small to medium businesses.

Marketing Channels:
1. Search Engine Optimization (SEO)
2. Pay-Per-Click Advertising (PPC)
3. Social Media Marketing
4. Content Marketing
5. Email Marketing
6. Influencer Partnerships

Budget Allocation:
The total budget of $150,000 will be allocated across channels based on expected ROI and audience reach. SEO and content marketing will receive the largest allocation due to their long-term value.

Timeline:
Phase 1 (Months 1-2): Strategy development and setup
Phase 2 (Months 3-4): Campaign launch and optimization
Phase 3 (Months 5-6): Performance analysis and scaling

Expected Outcomes:
Based on industry benchmarks and our analysis, we expect to achieve all stated objectives within the 6-month timeframe. Regular monitoring and optimization will ensure maximum effectiveness.`,

      `Training Manual: Customer Service Excellence

Chapter 1: Introduction to Customer Service

Customer service is the foundation of business success. Excellent customer service creates loyal customers, generates positive word-of-mouth, and drives sustainable business growth. This manual provides comprehensive guidelines for delivering exceptional customer experiences.

Core Principles:
1. Customer-first mindset
2. Active listening and empathy
3. Problem-solving orientation
4. Professional communication
5. Continuous improvement

Communication Best Practices:
Effective communication is essential for customer satisfaction. Always use clear, professional language and maintain a positive tone. Listen actively to understand customer needs and concerns before responding.

Handling Difficult Situations:
When dealing with challenging customers, remain calm and professional. Acknowledge their concerns, apologize when appropriate, and focus on finding solutions. Escalate to supervisors when necessary.

Product Knowledge:
Comprehensive product knowledge enables confident customer interactions. Stay updated on product features, benefits, and common issues. Regular training sessions will enhance your expertise.

Quality Assurance:
All customer interactions are monitored for quality assurance. Feedback is provided regularly to support continuous improvement and professional development.

Performance Metrics:
Customer satisfaction scores, response times, and resolution rates are key performance indicators. Strive to exceed targets while maintaining service quality.`
    ];
    
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  }

  private async extractTextFromImage(file: File): Promise<string> {
    const sampleTexts = [
      `Invoice #INV-2024-001

ABC Company Ltd.
123 Business Street
New York, NY 10001
Phone: (555) 123-4567
Email: billing@abccompany.com

Bill To:
XYZ Corporation
456 Corporate Ave
Los Angeles, CA 90210

Date: January 15, 2024
Due Date: February 15, 2024

Description                    Qty    Rate      Amount
Professional Services          40     $150.00   $6,000.00
Consulting Hours              20     $200.00   $4,000.00
Software License              1      $500.00   $500.00

Subtotal:                                      $10,500.00
Tax (8.5%):                                    $892.50
Total:                                         $11,392.50

Payment Terms: Net 30 days
Thank you for your business!`,

      `Certificate of Achievement

This is to certify that

JOHN SMITH

has successfully completed the

Advanced Project Management Course

with distinction

Date: March 20, 2024
Course Duration: 40 hours
Grade: A+

Authorized by:
Professional Development Institute
Certificate ID: PDI-2024-0156

Skills Acquired:
• Project Planning and Execution
• Risk Management
• Team Leadership
• Budget Management
• Quality Assurance
• Stakeholder Communication

This certificate is valid for professional development credits and continuing education requirements.`
    ];
    
    return sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getFileTypeFromExtension(filename: string): string {
    const ext = filename.split('.').pop()?.toLowerCase();
    const types: Record<string, string> = {
      'txt': 'text/plain',
      'pdf': 'application/pdf',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif'
    };
    return types[ext || ''] || 'application/octet-stream';
  }

  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }

  private detectLanguage(text: string): string {
    const englishWords = ['the', 'and', 'is', 'in', 'to', 'of', 'a', 'for', 'as', 'with', 'this', 'that', 'by', 'from', 'they', 'we', 'you', 'or', 'an', 'are'];
    const spanishWords = ['el', 'la', 'de', 'que', 'y', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 'con', 'para', 'al'];
    const frenchWords = ['le', 'de', 'et', 'à', 'un', 'il', 'être', 'et', 'en', 'avoir', 'que', 'pour', 'dans', 'ce', 'son', 'une', 'sur', 'avec', 'ne', 'se'];
    
    const words = text.toLowerCase().split(/\s+/).slice(0, 100); // Check first 100 words
    
    const englishCount = words.filter(word => englishWords.includes(word)).length;
    const spanishCount = words.filter(word => spanishWords.includes(word)).length;
    const frenchCount = words.filter(word => frenchWords.includes(word)).length;
    
    const maxCount = Math.max(englishCount, spanishCount, frenchCount);
    
    if (maxCount < 3) return 'Unknown';
    if (englishCount === maxCount) return 'English';
    if (spanishCount === maxCount) return 'Spanish';
    if (frenchCount === maxCount) return 'French';
    
    return 'English'; // Default fallback
  }

  private extractTitle(text: string, filename: string): string {
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    // Look for common title patterns
    for (const line of lines.slice(0, 5)) {
      // Skip very short or very long lines
      if (line.length < 5 || line.length > 100) continue;
      
      // Check if line looks like a title (capitalized, not too many special chars)
      const specialCharCount = (line.match(/[^a-zA-Z0-9\s\-:]/g) || []).length;
      const wordCount = line.split(/\s+/).length;
      
      if (specialCharCount < 3 && wordCount >= 2 && wordCount <= 15) {
        // Check if it starts with capital letter or is mostly capitalized
        if (/^[A-Z]/.test(line) || line === line.toUpperCase()) {
          return line;
        }
      }
    }
    
    // Fallback to first substantial line
    const firstLine = lines.find(line => line.length >= 10 && line.length <= 80);
    if (firstLine) return firstLine;
    
    // Final fallback to filename
    return filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' ');
  }

  private extractAuthor(text: string): string {
    const authorPatterns = [
      /(?:by|author|written by|created by|prepared by)\s*:?\s*([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
      /([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)(?:\s+(?:wrote|authored|created|prepared))/i,
      /^([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)$/m
    ];
    
    for (const pattern of authorPatterns) {
      const match = text.match(pattern);
      if (match && match[1]) {
        const author = match[1].trim();
        // Validate it's not a common false positive
        const commonFalsePositives = ['New York', 'Los Angeles', 'United States', 'John Doe', 'Jane Doe'];
        if (!commonFalsePositives.includes(author)) {
          return author;
        }
      }
    }
    
    // Look for email signatures
    const emailPattern = /([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)\s*\n.*@.*\./i;
    const emailMatch = text.match(emailPattern);
    if (emailMatch && emailMatch[1]) {
      return emailMatch[1].trim();
    }
    
    return 'Unknown Author';
  }

  private extractSubject(text: string): string {
    const topics = this.extractTopics(text);
    if (topics.length > 0) {
      return topics[0].name;
    }
    
    // Try to infer subject from content
    const businessTerms = ['business', 'strategy', 'marketing', 'sales', 'revenue', 'profit', 'management'];
    const techTerms = ['technology', 'software', 'digital', 'system', 'development', 'programming', 'data'];
    const healthTerms = ['health', 'medical', 'patient', 'treatment', 'healthcare', 'clinical', 'diagnosis'];
    const educationTerms = ['education', 'training', 'learning', 'course', 'student', 'teaching', 'academic'];
    
    const lowerText = text.toLowerCase();
    
    const businessCount = businessTerms.filter(term => lowerText.includes(term)).length;
    const techCount = techTerms.filter(term => lowerText.includes(term)).length;
    const healthCount = healthTerms.filter(term => lowerText.includes(term)).length;
    const educationCount = educationTerms.filter(term => lowerText.includes(term)).length;
    
    const maxCount = Math.max(businessCount, techCount, healthCount, educationCount);
    
    if (maxCount === 0) return 'General';
    if (businessCount === maxCount) return 'Business';
    if (techCount === maxCount) return 'Technology';
    if (healthCount === maxCount) return 'Healthcare';
    if (educationCount === maxCount) return 'Education';
    
    return 'General';
  }

  private extractKeywords(text: string): string[] {
    // Clean and tokenize text
    const words = text.toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    // Count word frequency
    const wordFreq: Record<string, number> = {};
    words.forEach(word => {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    });
    
    // Common stop words to exclude
    const stopWords = new Set([
      'that', 'this', 'with', 'from', 'they', 'been', 'have', 'were', 'said', 'each', 
      'which', 'their', 'time', 'will', 'about', 'would', 'there', 'could', 'other', 
      'after', 'first', 'well', 'water', 'very', 'what', 'know', 'while', 'here',
      'when', 'where', 'more', 'some', 'like', 'into', 'only', 'over', 'also',
      'back', 'these', 'come', 'work', 'life', 'year', 'years', 'make', 'made',
      'good', 'much', 'take', 'than', 'many', 'most', 'such', 'long', 'way',
      'even', 'find', 'right', 'old', 'see', 'him', 'two', 'how', 'its', 'our',
      'out', 'day', 'get', 'use', 'man', 'new', 'now', 'way', 'may', 'say'
    ]);
    
    // Filter and sort keywords
    const keywords = Object.entries(wordFreq)
      .filter(([word, freq]) => !stopWords.has(word) && freq >= 2)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 15)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1));
    
    return keywords;
  }

  private generateSummary(text: string): string {
    // Split into sentences
    const sentences = text.split(/[.!?]+/)
      .map(s => s.trim())
      .filter(s => s.length > 20 && s.length < 200);
    
    if (sentences.length === 0) return 'No summary available.';
    
    // Score sentences based on various factors
    const scoredSentences = sentences.map(sentence => {
      let score = 0;
      
      // Prefer sentences with important keywords
      const importantWords = ['important', 'significant', 'key', 'main', 'primary', 'essential', 'critical', 'major', 'conclusion', 'result', 'finding'];
      importantWords.forEach(word => {
        if (sentence.toLowerCase().includes(word)) score += 2;
      });
      
      // Prefer sentences with numbers/statistics
      if (/\d+%|\d+\.\d+|\$\d+/.test(sentence)) score += 1;
      
      // Prefer sentences that aren't too short or too long
      if (sentence.length >= 50 && sentence.length <= 150) score += 1;
      
      // Prefer sentences from the beginning or end
      const position = sentences.indexOf(sentence);
      if (position < 3 || position >= sentences.length - 3) score += 1;
      
      return { sentence, score };
    });
    
    // Select top sentences
    const topSentences = scoredSentences
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .sort((a, b) => sentences.indexOf(a.sentence) - sentences.indexOf(b.sentence))
      .map(item => item.sentence);
    
    return topSentences.join('. ') + '.';
  }

  private extractEntities(text: string): Entity[] {
    const entities: Entity[] = [];
    
    // Email pattern
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    let match;
    while ((match = emailRegex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'email',
        confidence: 0.95,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    
    // Phone patterns
    const phonePatterns = [
      /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/g,
      /\(\d{3}\)\s*\d{3}[-.]?\d{4}/g,
      /\+1[-.\s]?\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/g
    ];
    
    phonePatterns.forEach(pattern => {
      pattern.lastIndex = 0;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          text: match[0],
          type: 'phone',
          confidence: 0.85,
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    });
    
    // URL pattern
    const urlRegex = /https?:\/\/[^\s]+/g;
    while ((match = urlRegex.exec(text)) !== null) {
      entities.push({
        text: match[0],
        type: 'url',
        confidence: 0.98,
        startIndex: match.index,
        endIndex: match.index + match[0].length
      });
    }
    
    // Date patterns
    const datePatterns = [
      /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g,
      /\b[A-Z][a-z]+ \d{1,2}, \d{4}\b/g,
      /\b\d{1,2}-\d{1,2}-\d{4}\b/g,
      /\b\d{4}-\d{2}-\d{2}\b/g
    ];
    
    datePatterns.forEach(pattern => {
      pattern.lastIndex = 0;
      while ((match = pattern.exec(text)) !== null) {
        entities.push({
          text: match[0],
          type: 'date',
          confidence: 0.90,
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    });
    
    // Person names (simple pattern)
    const nameRegex = /\b[A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?\b/g;
    while ((match = nameRegex.exec(text)) !== null) {
      const name = match[0];
      // Filter out common false positives
      const falsePositives = ['New York', 'Los Angeles', 'United States', 'North America', 'South America', 'Middle East'];
      if (!falsePositives.includes(name) && name.length <= 30) {
        entities.push({
          text: name,
          type: 'person',
          confidence: 0.70,
          startIndex: match.index,
          endIndex: match.index + match[0].length
        });
      }
    }
    
    // Remove duplicates and sort by confidence
    const uniqueEntities = entities.filter((entity, index, self) => 
      index === self.findIndex(e => e.text === entity.text && e.type === entity.type)
    );
    
    return uniqueEntities.sort((a, b) => b.confidence - a.confidence).slice(0, 20);
  }

  private extractTopics(text: string): Topic[] {
    const topicKeywords = {
      'Business Strategy': ['strategy', 'business', 'market', 'competitive', 'growth', 'revenue', 'profit', 'management', 'planning', 'objectives'],
      'Technology': ['technology', 'software', 'digital', 'system', 'development', 'programming', 'data', 'artificial intelligence', 'machine learning', 'automation'],
      'Healthcare': ['health', 'medical', 'patient', 'treatment', 'healthcare', 'clinical', 'diagnosis', 'therapy', 'medicine', 'hospital'],
      'Education': ['education', 'learning', 'student', 'teacher', 'training', 'course', 'academic', 'knowledge', 'skill', 'development'],
      'Finance': ['finance', 'financial', 'investment', 'budget', 'cost', 'expense', 'accounting', 'economic', 'money', 'capital'],
      'Marketing': ['marketing', 'advertising', 'brand', 'customer', 'campaign', 'promotion', 'social media', 'engagement', 'conversion', 'analytics'],
      'Research': ['research', 'study', 'analysis', 'data', 'methodology', 'findings', 'results', 'conclusion', 'hypothesis', 'experiment'],
      'Legal': ['legal', 'law', 'contract', 'agreement', 'compliance', 'regulation', 'policy', 'terms', 'conditions', 'liability'],
      'Human Resources': ['human resources', 'employee', 'staff', 'recruitment', 'training', 'performance', 'benefits', 'workplace', 'team', 'leadership']
    };
    
    const topics: Topic[] = [];
    const lowerText = text.toLowerCase();
    const textWords = lowerText.split(/\s+/);
    
    Object.entries(topicKeywords).forEach(([topic, keywords]) => {
      const matches = keywords.filter(keyword => {
        if (keyword.includes(' ')) {
          return lowerText.includes(keyword);
        } else {
          return textWords.includes(keyword);
        }
      });
      
      if (matches.length > 0) {
        const confidence = Math.min(0.95, (matches.length / keywords.length) * 2);
        if (confidence >= 0.1) {
          topics.push({
            name: topic,
            confidence,
            keywords: matches
          });
        }
      }
    });
    
    return topics.sort((a, b) => b.confidence - a.confidence).slice(0, 5);
  }

  private analyzeSentiment(text: string): { overall: 'positive' | 'negative' | 'neutral'; confidence: number } {
    const positiveWords = [
      'excellent', 'great', 'amazing', 'wonderful', 'fantastic', 'outstanding', 'superb', 'brilliant',
      'good', 'better', 'best', 'perfect', 'successful', 'effective', 'efficient', 'productive',
      'positive', 'optimistic', 'confident', 'satisfied', 'pleased', 'happy', 'delighted',
      'improved', 'enhanced', 'increased', 'growth', 'progress', 'achievement', 'success',
      'beneficial', 'valuable', 'useful', 'helpful', 'advantageous', 'profitable', 'rewarding'
    ];
    
    const negativeWords = [
      'terrible', 'awful', 'horrible', 'bad', 'worse', 'worst', 'poor', 'inadequate',
      'failed', 'failure', 'unsuccessful', 'ineffective', 'inefficient', 'unproductive',
      'negative', 'pessimistic', 'disappointed', 'unsatisfied', 'unhappy', 'frustrated',
      'declined', 'decreased', 'reduced', 'loss', 'problem', 'issue', 'challenge',
      'difficult', 'hard', 'tough', 'struggle', 'concern', 'risk', 'threat'
    ];
    
    const words = text.toLowerCase().split(/\s+/);
    let positiveCount = 0;
    let negativeCount = 0;
    
    words.forEach(word => {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    });
    
    const total = positiveCount + negativeCount;
    if (total === 0) return { overall: 'neutral', confidence: 0.5 };
    
    const positiveRatio = positiveCount / total;
    const confidence = Math.min(0.95, total / words.length * 10); // Scale confidence based on sentiment word density
    
    if (positiveRatio > 0.6) return { overall: 'positive', confidence };
    if (positiveRatio < 0.4) return { overall: 'negative', confidence };
    return { overall: 'neutral', confidence: Math.max(0.3, confidence) };
  }

  private calculateReadabilityScore(text: string): number {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const syllables = words.reduce((total, word) => total + this.countSyllables(word), 0);
    
    if (sentences.length === 0 || words.length === 0) return 0;
    
    // Flesch Reading Ease Score
    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;
    
    const score = 206.835 - (1.015 * avgSentenceLength) - (84.6 * avgSyllablesPerWord);
    return Math.max(0, Math.min(100, Math.round(score)));
  }

  private countSyllables(word: string): number {
    word = word.toLowerCase().replace(/[^a-z]/g, '');
    if (word.length <= 3) return 1;
    
    // Remove silent e
    word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
    word = word.replace(/^y/, '');
    
    // Count vowel groups
    const matches = word.match(/[aeiouy]{1,2}/g);
    const syllableCount = matches ? matches.length : 1;
    
    return Math.max(1, syllableCount);
  }

  private analyzeStructure(text: string): DocumentStructure {
    const lines = text.split('\n');
    
    // Count headers (lines that are short, capitalized, or start with #)
    const headers = lines.filter(line => {
      const trimmed = line.trim();
      return (
        /^#{1,6}\s/.test(trimmed) || // Markdown headers
        (trimmed.length > 0 && trimmed.length < 80 && 
         (/^[A-Z][A-Z\s]+$/.test(trimmed) || // All caps
          /^[A-Z][a-z\s]+:?$/.test(trimmed))) // Title case
      );
    });
    
    // Count paragraphs (blocks of text separated by empty lines)
    const paragraphs = text.split(/\n\s*\n/).filter(p => p.trim().length > 50);
    
    // Count lists (lines starting with bullets or numbers)
    const listItems = lines.filter(line => 
      /^\s*[-*+•]\s/.test(line) || /^\s*\d+\.\s/.test(line)
    );
    
    // Count tables (lines with multiple | characters)
    const tableLines = lines.filter(line => 
      (line.match(/\|/g) || []).length >= 2
    );
    
    // Count images (markdown image syntax or image references)
    const images = (text.match(/!\[.*?\]\(.*?\)|image|photo|figure|diagram/gi) || []).length;
    
    return {
      hasTitle: headers.length > 0,
      hasHeaders: headers.length > 1,
      headerCount: headers.length,
      paragraphCount: paragraphs.length,
      listCount: Math.ceil(listItems.length / 3), // Estimate number of lists
      tableCount: Math.ceil(tableLines.length / 3), // Estimate number of tables
      imageCount: images
    };
  }

  private extractTechnicalMetadata(file: File): TechnicalMetadata {
    return {
      mimeType: file.type || this.getFileTypeFromExtension(file.name),
      encoding: 'UTF-8',
      creationDate: new Date(file.lastModified),
      modificationDate: new Date(file.lastModified),
      pageCount: file.type === 'application/pdf' ? Math.ceil(file.size / 50000) : undefined,
      dimensions: file.type.startsWith('image/') ? { width: 1920, height: 1080 } : undefined
    };
  }
}