'use client';
import { useState, useEffect } from 'react';
import { getBannerByPage } from '@/services/banner.service';

export default function useBanner(page) {
  const [banner, setBanner] = useState(null);
  useEffect(() => {
    getBannerByPage(page).then(data => { if (data) setBanner(data); }).catch(() => {});
  }, [page]);
  return banner; // null while loading (use fallback), or { image, video, title, subtitle }
}
