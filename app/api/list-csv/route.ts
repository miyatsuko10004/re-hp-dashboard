import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    
    // データディレクトリが存在するか確認
    if (!fs.existsSync(dataDir)) {
      return NextResponse.json({ 
        files: [],
        message: 'Data directory does not exist' 
      });
    }
    
    // ディレクトリが存在する場合はファイルを取得
    const files = fs.readdirSync(dataDir)
      .filter(file => file.endsWith('.csv'))
      .map(file => {
        try {
          const stats = fs.statSync(path.join(dataDir, file));
          return {
            name: file,
            path: `/data/${file}`,
            size: (stats.size / (1024 * 1024)).toFixed(2) + ' MB',
            date: new Date(stats.mtime).toISOString()
          };
        } catch (err) {
          console.error(`Error processing file ${file}:`, err);
          return null;
        }
      })
      .filter(Boolean); // nullを除外

    return NextResponse.json({ files });
  } catch (error) {
    console.error('Error listing CSV files:', error);
    return NextResponse.json({ 
      files: [],
      error: 'Failed to list CSV files' 
    }, { status: 500 });
  }
} 