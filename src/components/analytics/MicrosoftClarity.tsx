'use client';

import { useEffect } from 'react';
import * as clarity from '@microsoft/clarity';

export default function MicrosoftClarity() {
    const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

    useEffect(() => {
        if (clarityId) {
            clarity.clarity.init(clarityId);
        }
    }, [clarityId]);

    return null;
}
