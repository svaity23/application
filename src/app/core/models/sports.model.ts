import { F1 } from "./f1.model";
import { Nba } from "./nba.model";
import { Tennis } from "./tennis.model";

export interface Sports {
  f1?: F1[] | [];
  nba?: Nba[] | [];
  tennis?: Tennis[] | [];
}