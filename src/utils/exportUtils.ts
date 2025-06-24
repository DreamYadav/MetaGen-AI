import { DocumentMetadata } from '../types';

export class ExportUtils {
  static exportAsJSON(metadata: DocumentMetadata[]): void {
    const dataStr = JSON.stringify(metadata, null, 2);
    this.downloadFile(dataStr, 'metadata.json', 'application/json');
  }

  static exportAsXML(metadata: DocumentMetadata[]): void {
    let xmlStr = '<?xml version="1.0" encoding="UTF-8"?>\n<documents>\n';
    
    metadata.forEach(doc => {
      xmlStr += '  <document>\n';
      xmlStr += `    <id>${this.escapeXml(doc.id)}</id>\n`;
      xmlStr += `    <filename>${this.escapeXml(doc.filename)}</filename>\n`;
      xmlStr += `    <fileType>${this.escapeXml(doc.fileType)}</fileType>\n`;
      xmlStr += `    <title>${this.escapeXml(doc.title)}</title>\n`;
      xmlStr += `    <author>${this.escapeXml(doc.author)}</author>\n`;
      xmlStr += `    <subject>${this.escapeXml(doc.subject)}</subject>\n`;
      xmlStr += `    <summary>${this.escapeXml(doc.summary)}</summary>\n`;
      xmlStr += `    <language>${this.escapeXml(doc.language)}</language>\n`;
      xmlStr += `    <wordCount>${doc.wordCount}</wordCount>\n`;
      xmlStr += `    <readabilityScore>${doc.readabilityScore}</readabilityScore>\n`;
      xmlStr += '    <keywords>\n';
      doc.keywords.forEach(keyword => {
        xmlStr += `      <keyword>${this.escapeXml(keyword)}</keyword>\n`;
      });
      xmlStr += '    </keywords>\n';
      xmlStr += '    <entities>\n';
      doc.entities.forEach(entity => {
        xmlStr += `      <entity type="${entity.type}" confidence="${entity.confidence}">${this.escapeXml(entity.text)}</entity>\n`;
      });
      xmlStr += '    </entities>\n';
      xmlStr += '  </document>\n';
    });
    
    xmlStr += '</documents>';
    this.downloadFile(xmlStr, 'metadata.xml', 'application/xml');
  }

  static exportAsCSV(metadata: DocumentMetadata[]): void {
    const headers = [
      'ID', 'Filename', 'File Type', 'Title', 'Author', 'Subject', 
      'Language', 'Word Count', 'Character Count', 'Readability Score',
      'Keywords', 'Summary', 'Sentiment', 'Upload Date'
    ];
    
    let csvStr = headers.join(',') + '\n';
    
    metadata.forEach(doc => {
      const row = [
        this.escapeCsv(doc.id),
        this.escapeCsv(doc.filename),
        this.escapeCsv(doc.fileType),
        this.escapeCsv(doc.title),
        this.escapeCsv(doc.author),
        this.escapeCsv(doc.subject),
        this.escapeCsv(doc.language),
        doc.wordCount.toString(),
        doc.characterCount.toString(),
        doc.readabilityScore.toString(),
        this.escapeCsv(doc.keywords.join('; ')),
        this.escapeCsv(doc.summary),
        this.escapeCsv(doc.sentiment.overall),
        doc.uploadDate.toISOString()
      ];
      csvStr += row.join(',') + '\n';
    });
    
    this.downloadFile(csvStr, 'metadata.csv', 'text/csv');
  }

  private static downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  private static escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  private static escapeCsv(str: string): string {
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }
}