import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'public', 'Nehil_SDE (1).pdf');

    try {
        const fileBuffer = fs.readFileSync(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="Nehil_Chandrakar_Resume.pdf"',
            },
        });
    } catch (error) {
        return new NextResponse('PDF not found', { status: 404 });
    }
}
