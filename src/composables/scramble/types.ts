export type FaceInitial = "U" | "L" | "F" | "R" | "B" | "D";
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
