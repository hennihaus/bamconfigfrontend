import type { InjectionKey, Ref } from "vue";
import type { Bank, Team } from "@hennihaus/bamconfigbackend";

export const TEAM = Symbol() as InjectionKey<Ref<Team>>;
export const BANKS = Symbol() as InjectionKey<Ref<Bank[]>>;
