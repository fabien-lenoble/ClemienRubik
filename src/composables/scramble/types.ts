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
  | "X";
export type Move =
  | "U"
  | "U'"
  | "U2"
  | "L"
  | "L'"
  | "L2"
  | "F"
  | "F'"
  | "F2"
  | "R"
  | "R'"
  | "R2"
  | "B"
  | "B'"
  | "B2"
  | "D"
  | "D'"
  | "D2";

export type SubMoveSet = Move[];

export type MoveSet = SubMoveSet[];

export type Scramble = Move[];

export type DisplayScramble = string;

export type CubeImage = CubeFace[];
export type CubeFace = StickerValue[][];
