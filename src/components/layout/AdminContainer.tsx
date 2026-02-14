import React from 'react';

export const AdminContainer = ({ children }: { children?: React.ReactNode }) => (
    <div className="h-full bg-gray-50 overflow-y-auto pb-32 md:pb-0 p-6 md:pl-72 pt-20">
        {children}
    </div>
);
