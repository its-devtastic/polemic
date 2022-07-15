import * as R from "ramda";
import {
  IRepository,
  IAdapter,
  IAssetsAdapter,
  IConfigAdapter,
  IDocumentsAdapter,
  IBibliographyAdapter,
} from "@polemic/types";

export class Repository implements IRepository {
  name: string;
  projectDir: string;
  config: IConfigAdapter | null = null;
  documents: IDocumentsAdapter | null = null;
  bibliography: IBibliographyAdapter | null = null;
  assets: IAssetsAdapter | null = null;

  readonly adapterTypes: AdapterType[] = [
    "config",
    "documents",
    "bibliography",
    "assets",
  ];

  constructor({ projectDir, adapters }: RepositoryOptions) {
    this.projectDir = projectDir;
    this.name = projectDir.split("/").slice(-1)[0];

    adapters.forEach((adapter) => {
      (this[adapter.type] as any) = adapter;
    });
  }

  async initialize() {
    await this.loadAdapters();
  }

  async loadAdapters() {
    const adapters = this.adapterTypes
      .map((type) => this[type])
      .filter((adapter) => !R.isNil(adapter));

    for (let adapter of adapters) {
      await this.loadAdapter(adapter!);
    }
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

type AdapterType = "config" | "documents" | "bibliography" | "assets";
