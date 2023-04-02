import React, { ReactNode } from 'react';
export interface sidebarProps {
    window?: () => Window;
    children: ReactNode;
    city: string,
    setCity: any
}