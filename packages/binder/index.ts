import * as R from "ramda";
import { IRepository, IAdapter } from "@polemic/types";

export class Repository implements IRepository {
  projectDir: string;
  adapters: IRepository["adapters"] = {
    config: null,
    documents: null,
    bibliography: null,
    assets: null,
  };

  constructor({ projectDir, adapters }: RepositoryOptions) {
    this.projectDir = projectDir;

    adapters.forEach((adapter) => {
      (this.adapters[adapter.type] as any) = adapter;
    });
  }

  async initialize() {
    await this.loadAdapters();
  }

  async loadAdapters() {
    return Promise.all(
      Object.values(this.adapters)
        .filter((a) => !R.isNil(a))
        .map((adapter) => this.loadAdapter(adapter!))
    );
  }

  async loadAdapter(adapter: IAdapter) {
    await adapter.load(this);
    await adapter.parse(this);
  }
}

interface RepositoryOptions {
  projectDir: string;
  adapters: IAdapter[];
}
