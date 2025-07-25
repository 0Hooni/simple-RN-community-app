import styled from 'styled-components/native';

// 타이포그래피 토큰 정의
export const typography = {
  title1: {
    fontSize: 28,
    fontWeight: 'normal' as const,
    lineHeight: 34,
  },
  title3: {
    fontSize: 20,
    fontWeight: 'normal' as const,
    lineHeight: 25,
  },
  body: {
    fontSize: 17,
    fontWeight: 'normal' as const,
    lineHeight: 22,
  },
  callout: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    lineHeight: 21,
  },
} as const;
