// /lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  GlobalSearchIcon,
  Database02Icon,
  AtomicPowerIcon,
  Bitcoin02Icon,
  MicroscopeIcon,
  NewTwitterIcon,
  RedditIcon,
  YoutubeIcon,
  ChattingIcon,
  AppleStocksIcon,
  ConnectIcon,
  CodeCircleIcon,
  Github01Icon,
  SpotifyIcon,
  Chart03Icon,
  CanvasIcon,
} from '@hugeicons/core-free-icons';
import { AgentNetworkIcon } from '@/components/icons/agent-network-icon';
import { AppsIcon } from '@/components/icons/apps-icon';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeError(err: unknown): string {
  const msg = err instanceof Error ? err.message : String(err ?? '');
  if (/websocket|ws connection|connection (closed|failed|lost)|1006|1011|1012/i.test(msg))
    return 'Connection lost. Please check your internet and try again.';
  if (/oauth|authoriz|token|forbidden|403/i.test(msg))
    return 'Authorization failed. The app may have rejected the request.';
  if (/timeout|timed? ?out/i.test(msg)) return 'This took too long. Please try again.';
  if (/network|fetch failed|ECONNREFUSED|ENOTFOUND/i.test(msg))
    return 'Could not connect. Please check your internet and try again.';
  return 'Something went wrong. Please try again.';
}

export type SearchGroupId =
  | 'web'
  | 'x'
  | 'academic'
  | 'youtube'
  | 'spotify'
  | 'reddit'
  | 'github'
  | 'stocks'
  | 'chat'
  | 'extreme'
  | 'memory'
  | 'crypto'
  | 'code'
  | 'connectors'
  | 'mcp'
  | 'multi-agent'
  | 'prediction'
  | 'canvas';

// Search provider information for dynamic descriptions
export const searchProviderInfo = {
  parallel: 'AI-only mode',
  exa: 'AI-only mode',
  firecrawl: 'AI-only mode',
} as const;

export type SearchProvider = keyof typeof searchProviderInfo;

// Function to get dynamic web search description based on selected provider
export function getWebSearchDescription(provider: SearchProvider = 'exa'): string {
  const providerName = searchProviderInfo[provider];
  return `AI-only assistant mode (${providerName})`;
}

// Function to get search groups with dynamic descriptions
export function getSearchGroups(searchProvider: SearchProvider = 'exa') {
  const showLegacyModes = process.env.NEXT_PUBLIC_ENABLE_LEGACY_MODES === 'true';
  return [
    {
      id: 'web' as const,
      name: 'Web',
      description: getWebSearchDescription(searchProvider),
      icon: GlobalSearchIcon,
      show: true,
    },
    {
      id: 'chat' as const,
      name: 'Chat',
      description: 'Talk to the model directly.',
      icon: ChattingIcon,
      show: true,
    },
    {
      id: 'x' as const,
      name: 'X',
      description: 'Search X posts',
      icon: NewTwitterIcon,
      show: true,
    },
    {
      id: 'stocks' as const,
      name: 'Stocks',
      description: 'Stock and currency information',
      icon: AppleStocksIcon,
      show: showLegacyModes,
    },
    {
      id: 'connectors' as const,
      name: 'Connectors',
      description: 'Search Google Drive, Notion and OneDrive documents',
      icon: ConnectIcon,
      show: showLegacyModes,
      requireAuth: true,
      requirePro: true,
    },
    {
      id: 'mcp' as const,
      name: 'Apps',
      description: 'Use tools from your connected apps',
      icon: AppsIcon,
      show: showLegacyModes && process.env.NEXT_PUBLIC_MCP_ENABLED === 'true',
      requireAuth: true,
      requirePro: true,
    },
    {
      id: 'multi-agent' as const,
      name: 'Multi-agent',
      description: 'High-agency research with xAI web and X search plus grouped sources',
      icon: AgentNetworkIcon,
      show: true,
      requireAuth: true,
      requirePro: true,
    },
    {
      id: 'code' as const,
      name: 'Code',
      description: 'AI coding assistance and document context',
      icon: CodeCircleIcon,
      show: true,
    },
    {
      id: 'academic' as const,
      name: 'Academic',
      description: 'AI academic assistant mode',
      icon: MicroscopeIcon,
      show: showLegacyModes,
    },
    {
      id: 'extreme' as const,
      name: 'Extreme',
      description: 'Deep research with multiple sources and analysis',
      icon: AtomicPowerIcon,
      show: showLegacyModes,
      requireAuth: true,
    },
    {
      id: 'memory' as const,
      name: 'Memory',
      description: 'Your personal memory companion',
      icon: Database02Icon,
      show: showLegacyModes,
      requireAuth: true,
    },
    {
      id: 'reddit' as const,
      name: 'Reddit',
      description: 'Search Reddit posts powered by Parallel',
      icon: RedditIcon,
      show: showLegacyModes,
    },
    {
      id: 'github' as const,
      name: 'GitHub',
      description: 'Search GitHub repositories, code, and discussions',
      icon: Github01Icon,
      show: showLegacyModes,
    },
    {
      id: 'crypto' as const,
      name: 'Crypto',
      description: 'Cryptocurrency research powered by CoinGecko',
      icon: Bitcoin02Icon,
      show: showLegacyModes,
    },
    {
      id: 'prediction' as const,
      name: 'Prediction',
      description: 'Search prediction markets from Polymarket and Kalshi',
      icon: Chart03Icon,
      show: showLegacyModes,
    },
    {
      id: 'youtube' as const,
      name: 'YouTube',
      description: 'Search content inside YouTube videos, channels and playlists',
      icon: YoutubeIcon,
      show: showLegacyModes,
    },
    {
      id: 'spotify' as const,
      name: 'Spotify',
      description: 'Search songs, artists, and albums on Spotify',
      icon: SpotifyIcon,
      show: showLegacyModes,
    },
    {
      id: 'canvas' as const,
      name: 'Canvas',
      description: 'Research and generate interactive dashboards and visual reports',
      icon: CanvasIcon,
      show: showLegacyModes,
      requireAuth: true,
      requirePro: true,
    },
  ] as const;
}

// Keep the static searchGroups for backward compatibility
export const searchGroups = getSearchGroups();

export type SearchGroup = (typeof searchGroups)[number];
