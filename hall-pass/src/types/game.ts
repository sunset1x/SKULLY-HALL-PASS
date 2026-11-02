export type StatKey = 'health' | 'energy' | 'stress' | 'popularity' | 'intelligence' | 'athleticism' | 'creativity' | 'money' | 'attendance' | 'gpa'
export type Period = 'Period 1' | 'Period 2' | 'Lunch' | 'Period 3' | 'Period 4' | 'After School'
export type LocationId = 'Main Hallway' | 'Library' | 'Gym' | 'Cafeteria' | 'Classrooms' | 'Counselor Office' | 'Principal Office' | 'Computer Lab' | 'Courtyard'

export interface PlayerStats {
  health: number; energy: number; stress: number; popularity: number;
  intelligence: number; athleticism: number; creativity: number; money: number;
  attendance: number; gpa: number;
}
export interface Skills { academics: number; sports: number; creativity: number; charisma: number; technology: number }
export interface InventoryItem { id: string; name: string; quantity: number; icon: string }
export interface NPC { id: string; name: string; grade: number; personality: string; interests: string[]; friendship: number }
export interface Teacher { name: string; subject: string; strictness: number; personality: string }
export interface Quest { id: string; title: string; description: string; progress: number; goal: number; reward: number; completed: boolean }
export interface Achievement { id: string; title: string; description: string; icon: string }
export interface SaveData {
  stats: PlayerStats; skills: Skills; inventory: InventoryItem[]; year: number;
  day: number; periodIndex: number; location: LocationId; attendanceDays: number;
  detention: number; reputation: number; clubs: string[]; quests: Quest[];
  achievements: string[]; npcs: NPC[]; weather: string; announcement: string;
  moneyEarned: number; classesAttended: number; clubsJoined: number; friendshipsMade: number;
}
