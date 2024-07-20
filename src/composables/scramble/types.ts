import type { PiecePosition } from "@/composables/training/types";

export type FaceInitial = "U" | "L" | "F" | "R" | "B" | "D";
export type StickerValue =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z"
  | "z";

export type Move =
  | "U"
  | "U'"
  | "U2"
  | "u"
  | "u'"
  | "u2"
  | "L"
  | "L'"
  | "L2"
  | "l"
  | "l'"
  | "l2"
  | "F"
  | "F'"
  | "F2"
  | "f"
  | "f'"
  | "f2"
  | "R"
  | "R'"
  | "R2"
  | "r"
  | "r'"
  | "r2"
  | "B"
  | "B'"
  | "B2"
  | "b"
  | "b'"
  | "b2"
  | "D"
  | "D'"
  | "D2"
  | "d"
  | "d'"
  | "d2"
  | "x"
  | "x'"
  | "x2"
  | "y"
  | "y'"
  | "y2"
  | "z"
  | "z'"
  | "z2"
  | "M"
  | "M'"
  | "M2"
  | "S"
  | "S'"
  | "S2"
  | "E"
  | "E'"
  | "E2";

export type SubMoveSet = Move[];

export type MoveSet = SubMoveSet[];

export type Scramble = Move[];

export type DisplayScramble = string;

export type CubeImage = CubeFace[];
export type CubeFace = PiecePosition[][];
