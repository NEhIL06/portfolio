import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'public', 'Nehil_SDE.pdf');

    try {
        const fileBuffer = fs.readFileSync(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="Nehil_Chandrakar.pdf"',
            },
        });
    } catch {
        return new NextResponse('PDF not found', { status: 404 });
    }
}
