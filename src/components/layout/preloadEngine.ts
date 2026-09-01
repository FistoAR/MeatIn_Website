/**
 * High-Performance DSA Asset Preloader Engine
 * 
 * Features:
 * 1. Priority Bucket Sorting (O(N) priority queue for Hero & Home assets)
 * 2. Bounded Concurrency Worker Pool (Prevents socket congestion and main thread thrashing)
 * 3. Set-based O(1) URL Deduplication
 * 4. Pipelined Worker Task Dispatching
 */

export interface PreloadOptions {
  concurrency?: number;
  onProgress?: (progress: number, loaded: number, total: number) => void;
  onComplete?: () => void;
}

export class AssetPreloadEngine {
  private queue: string[] = [];
  private totalCount: number = 0;
  private loadedCount: number = 0;
  private activeWorkers: number = 0;
  private maxConcurrency: number;
  private onProgress?: (progress: number, loaded: number, total: number) => void;
  private onComplete?: () => void;
  private visited: Set<string> = new Set();
  private isFinished: boolean = false;

  constructor(assets: string[], options: PreloadOptions = {}) {
    this.maxConcurrency = options.concurrency || 24;
    this.onProgress = options.onProgress;
    this.onComplete = options.onComplete;

    // 1. O(1) Set Deduplication
    const uniqueAssets = Array.from(new Set(assets));

    // 2. Priority Bucket Sort (O(N))
    this.queue = this.prioritySort(uniqueAssets);
    this.totalCount = this.queue.length;
  }

  /**
   * Priority Bucket Sort Algorithm (O(N)):
   * Bucket 1 (P1): Hero, Logo, Home, Brand Story, Background textures
   * Bucket 2 (P2): Product cuts, chicken parts, meat cards
   * Bucket 3 (P3): Secondary page images, galleries
   */
  private prioritySort(assets: string[]): string[] {
    const p1: string[] = [];
    const p2: string[] = [];
    const p3: string[] = [];

    for (let i = 0; i < assets.length; i++) {
      const path = assets[i];
      const lower = path.toLowerCase();

      if (
        lower.includes('video-frames') ||
        lower.includes('/logo') ||
        lower.includes('/home') ||
        lower.includes('/brand-story') ||
        lower.includes('bg-image') ||
        lower.includes('truck') ||
        lower.includes('certif')
      ) {
        p1.push(path);
      } else if (
        lower.includes('/product') ||
        lower.includes('/chickenparts') ||
        lower.includes('/fullchicken') ||
        lower.includes('/recipies')
      ) {
        p2.push(path);
      } else {
        p3.push(path);
      }
    }

    return [...p1, ...p2, ...p3];
  }

  /**
   * Start Worker Pool Execution (Producer-Consumer Queue Pipeline)
   */
  public start(): void {
    if (this.totalCount === 0) {
      this.triggerComplete();
      return;
    }

    const workersToLaunch = Math.min(this.maxConcurrency, this.queue.length);
    for (let i = 0; i < workersToLaunch; i++) {
      this.dispatchWorker();
    }
  }

  private triggerComplete(): void {
    if (this.isFinished) return;
    this.isFinished = true;
    if (this.onProgress) {
      this.onProgress(100, this.totalCount, this.totalCount);
    }
    if (this.onComplete) {
      this.onComplete();
    }
  }

  private dispatchWorker(): void {
    if (this.queue.length === 0) return;

    const assetPath = this.queue.shift()!;
    this.preloadAsset(assetPath).finally(() => {
      this.loadedCount++;
      const currentPercent = Math.min(99, Math.floor((this.loadedCount / this.totalCount) * 100));
      if (this.onProgress) {
        this.onProgress(currentPercent, this.loadedCount, this.totalCount);
      }

      if (this.loadedCount >= this.totalCount) {
        this.triggerComplete();
      } else {
        // Pipelined immediate dispatch for next task
        this.dispatchWorker();
      }
    });
  }

  private preloadAsset(assetPath: string): Promise<void> {
    return new Promise((resolve) => {
      const ext = assetPath.split('.').pop()?.toLowerCase();

      if (ext === 'glb' || ext === 'gltf') {
        fetch(assetPath, { mode: 'cors', cache: 'force-cache' })
          .then(() => resolve())
          .catch(() => resolve());
      } else {
        const img = new window.Image();
        img.src = assetPath;

        if (typeof window !== 'undefined') {
          (window as any).__HERO_FRAMES__ = (window as any).__HERO_FRAMES__ || {};
          (window as any).__HERO_FRAMES__[assetPath] = img;
        }

        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });
  }
}
