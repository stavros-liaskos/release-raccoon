import React from 'react';

import Loading from '@/components/Loading/Loading';
import { recommendationsI18n } from '@/i18n';

export default function RecommendationsSkeleton() {
  return (
    <div className="flex flex-col lg:justify-center items-center mb-2 w-full">
      <h3 className="h3">{recommendationsI18n.title}</h3>

      <Loading />
    </div>
  );
}
