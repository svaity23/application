/* index.ts file in store folder is our public API so we want to add our different feature states effect to */
import { ResultsEffects } from "./results.effects";

export const effects: any[] = [ResultsEffects];

export * from './results.effects';