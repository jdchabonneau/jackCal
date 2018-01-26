
export class WhsePosition {
}

export class WhseShelf {
  shelfID: number;
}

export class WhseSection {
  sectionID: number;
  x: number[] = [];
  shelves: WhseShelf[] = [];
}

export class WhseAisle {
  aisleID: number;
  sections: WhseSection[] = [];
  northAccess: boolean;
  southAccess: boolean;
}

export class WhseLayout {
  whseID: number;
  whseName: string;
  aisles: WhseAisle[] = [];
}
