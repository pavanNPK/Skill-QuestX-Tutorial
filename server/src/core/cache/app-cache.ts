/** Small server cache abstraction used by hot read APIs. Replace internals with Redis without changing controllers. */

interface CacheEntry<T> {
  value: T;
  expiresAt: number;
}

export class AppCache {
  private readonly memory = new Map<string, CacheEntry<unknown>>();
  private readonly inFlight = new Map<string, Promise<unknown>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.memory.get(key) as CacheEntry<T> | undefined;
    if (!entry) return null;
    if (entry.expiresAt <= Date.now()) {
      this.memory.delete(key);
      return null;
    }
    return entry.value;
  }

  async set<T>(key: string, value: T, ttlMs: number): Promise<T> {
    this.memory.set(key, { value, expiresAt: Date.now() + ttlMs });
    return value;
  }

  async getOrSet<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
    const cached = await this.get<T>(key);
    if (cached !== null) return cached;
    const active = this.inFlight.get(key) as Promise<T> | undefined;
    if (active) return active;

    const promise = loader()
      .then(async (value) => this.set(key, value, ttlMs))
      .finally(() => {
        this.inFlight.delete(key);
      });
    this.inFlight.set(key, promise);
    return promise;
  }

  async delete(key: string): Promise<void> {
    this.memory.delete(key);
    this.inFlight.delete(key);
  }

  async deleteByPrefix(prefix: string): Promise<void> {
    for (const key of this.memory.keys()) {
      if (key.startsWith(prefix)) this.memory.delete(key);
    }
    for (const key of this.inFlight.keys()) {
      if (key.startsWith(prefix)) this.inFlight.delete(key);
    }
  }
}

export const appCache = new AppCache();
